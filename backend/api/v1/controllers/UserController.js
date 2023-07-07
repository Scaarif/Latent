// const House = require("../models/House");
const passport = require('passport');
const Tenant = require('../models/Tenant');
const Agent = require('../models/Agent');

class UserController {
  /**
   * Create a new user entry with the provided details.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise} - A Promise that resolves to the
   * ...creation and log-in of a new user, or failure.
   */
  static async postUser(req, res) {
    // console.log('login controller called'); // SCAFF
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      isAgent,
    } = req.body; // TODO: app.use(express.json())

    // ensure password is present
    if (!password) {
      return res.status(400).json({ success: false, message: 'password missing' });
    }

    // register
    if (isAgent && isAgent.toLowerCase() === 'true') {
      // create an Agent doc
      Agent.register(new Agent({
        // array attr, like reviews, will be init to []
        firstName,
        lastName,
        email,
        phone,
      }), password, (err, agent) => {
        // console.log(agent); // SCAFF
        if (err && !agent) {
          res.status(400).json({ success: false, message: 'failed registration from likely duplicate email' });
        } else if (agent) {
          // agent created; log in the user
          // NOTE1: one way of authenticating; call login()
          req.login(agent, (err) => {
            if (err) {
              return res.status(401).json({ success: false, message: err.toString() });
            }
            // successfull log in
            return res.status(201).json({ success: true, message: 'created and logged-in successfully' });
          });
        }
      });
      // res.end();
    } else if (isAgent && isAgent.toLowerCase() === 'false') {
      // create a Tenant doc
      Tenant.register(new Tenant({
        firstName,
        lastName,
        email,
        phone,
      }), password, (err, tenant) => {
        // console.log(tenant); // SCAFF
        if (err && !tenant) {
          res.status(400).json({ success: false, message: 'failed registration from likely duplicate email' });
        } else if (tenant) {
          // tenant created; log the tenant in
          req.login(tenant, (err) => {
            if (err) {
              return res.status(401).json({ success: false, message: err.toString() });
            }
            // successfull log in
            return res.status(201).json({ success: true, message: 'created and logged-in successfully' });
          });
        }
      });
      // res.end();
    } else if (!isAgent) {
      // isAgent not set
      return res.status(400).json({ success: false, message: 'isAgent missing' });
    }

    return undefined;
  }

  /**
   * Authenticate a user with the provided details.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise} - A Promise that resolves to the authentication of a user, or failure.
   */
  static async postLogin(req, res, next) {
    // authenticate with the registered local strategy
    // NOTE1: another way of authenticating; call authenticate() which
    // ...returns a middleware to which you have to pass req and res objects.
    // If (err, user, info) callback,
    // ...or options, not set, authenticate will automatically respond with 401.
    // Passport tries each specified strategy, until one successfully authenticates, or all fail.
    passport.authenticate(['tenantStrategy', 'agentStrategy'], (err, user/* , info */) => {
      if (err) {
        // some server error
        res.status(500).json({ success: false, message: err.toString() });
      } else if (!user) {
        // authentication failed
        res.status(401).json({ success: false, message: 'authentication failed' });
      } else {
        // console.log(Object.entries(user)); // SCAFF
        // auth successfull
        req.login(user, (err) => {
          if (err) {
            return res.status(401).json({ success: false, message: err.toString() });
          }
          // successfull log in
          return res.status(200).json({ success: true, message: 'authenticated' });
        });
        // req.login(user, next);
        // res.status(200).json({ success: true, message: 'authenticated' });
      }
    })(req, res, next);
  }

  /**
   * Logs out an authenticated user.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise} - A Promise that resolves to the log-out of a user, or failure.
   */
  static async postLogout(req, res) {
    if (req.isAuthenticated()) {
      req.logout((err) => {
        if (err) {
          // probably some server error
          res.status(500).json({ success: false, message: err.toString() });
        }
        // logout successfull
        res.status(200).json({ success: true, message: 'logout successfull' });
      });
      return undefined;
    }

    return res.status(401).json({ success: false, message: 'user not logged in' });
  }

  /**
   * ...
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise} - A Promise that resolves to ...
   */
  static async putPassword(req, res) {
  }

  /**
   * Edits an authenticated user's data.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise} - A Promise that resolves to the update of an authenticated user's profile.
   */
  static async putUser(req, res) {
    if (req.isAuthenticated()) {
      // retrieve allowed update parameters
      const {
        firstName,
        lastName,
        phone,
      } = req.body;
      const updateList = [firstName, lastName, phone];
      const attrNames = ['firstName', 'lastName', 'phone'];
      const updateObj = {};
      // popultae `updateObj` with non-undefined attributes
      for (let i = 0; i < updateList.length; i += 1) {
        if (updateList[i]) {
          // value is supplied for the attribute
          updateObj[attrNames[i]] = updateList[i];
        }
      }
      // get the user's doc
      // const doc = await Tenant.findById(req.user._id);
      const doc = req.user;
      // update doc with non-undefined attributes
      Object.assign(doc, updateObj);
      try {
        await doc.save();
        res.status(201).json({ success: true, message: 'updated successfully' });
      } catch (err) {
        res.status(401).json({ success: false, message: err.toString() });
      }
    }
  }

  /**
   * Returns an authenticated user's data.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise} - A Promise that resolves to the data of the logged-in user.
   */
  static async getUser(req, res) {
    // console.log('USER INSTANCE:', req.user.constructor, req.user instanceof Tenant); // SCAFF
    // console.log(Object.entries(req.session)); // SCAFF
    if (req.isAuthenticated()) {
      const user = req.user.toObject();
      delete user._id;
      delete user.salt;
      delete user.hash;
      return res.json(user);
    }

    // not logged in
    return res.status(401).json({ success: false, message: 'session not authenticated' });
  }

  /**
   * ...
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise} - A Promise that resolves to ...
   */
  static async deleteUser(req, res) {
  }
}

module.exports = UserController;
