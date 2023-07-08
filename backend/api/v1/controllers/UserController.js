const passport = require('passport');
const mongoose = require('mongoose');
const Tenant = require('../models/Tenant');
const Agent = require('../models/Agent');
const House = require('../models/House');
// const Rating = require('../models/Rating');

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
      const attrValues = [firstName, lastName, phone];
      const attrNames = ['firstName', 'lastName', 'phone'];
      const updateObj = {};
      // popultae `updateObj` with non-undefined attributes
      for (let i = 0; i < attrValues.length; i += 1) {
        if (attrValues[i]) {
          // value is supplied for the attribute
          updateObj[attrNames[i]] = attrValues[i];
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
   * Deletes a specific user's account.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise} - A Promise that resolves to the removal
   * ...of all documents and records relating to a user.
   */
  static async deleteUser(req, res) {
    // retrieve userId query param, if present
    let { userId } = req.query;
    if (userId) {
      // retrieve doc using the userId if provided; otherwise use req.user
      try {
        userId = new mongoose.Types.ObjectId(userId);
      } catch (err) {
        return res.status(400).json({ success: false, message: 'invalid ObjectId string' });
      }
      let userDoc;
      userDoc = await Agent.findById(userId).exec();
      if (!userDoc) {
        // try fetching a Tenant
        userDoc = await Tenant.findById(userId).exec();
      }

      if (userDoc) {
        // TODO: refactor to remove duplicate code; START1
        // a user with that ID found
        // if an agent, remove all Ratings doc linked to it
        // if an agent, also remove all houses linked to it
        if (userDoc.listings instanceof Array) {
          // agent account
          const { listings } = userDoc;
          for await (const houseId of listings) {
            // remove all linked houses
            const houseDoc = await House.findById(houseId).exec();
            // await houseDoc.remove();
            await houseDoc.deleteOne();
          }

          /* TODO: uncomment when Rating model is available
          const ratingDocs = await Rating.find({ agentId: userDoc._id }).exec();
          for await (const ratingDoc of ratingDocs) {
            // remove all linked ratings
            // await ratingDoc.remove();
            await ratingDoc.deleteOne();
          }
          */
        }

        // remove doc from mongodb
        await userDoc.deleteOne();

        return res.json({ success: true, message: 'account unlinking complete' });
        // TODO: END1
      }
    }

    if (req.isAuthenticated()) {
      // delete the currently logged-in user
      const userDoc = req.user;

      // TODO: refactor to remove duplicate code; START1
      // if an agent, remove all Ratings doc linked to it
      // if an agent, remove all houses linked to it
      if (userDoc.listings instanceof Array) {
        // agent account
        const { listings } = userDoc;
        for await (const houseId of listings) {
          // remove all linked houses
          const houseDoc = await House.findById(houseId).exec();
          // await houseDoc.remove();
          await houseDoc.deleteOne();
        }

        /* TODO: uncomment when Rating model is available
        const ratingDocs = await Rating.find({ agentId: userDoc._id }).exec();
        for await (const ratingDoc of ratingDocs) {
          // remove all linked ratings
          // await ratingDoc.remove();
          await ratingDoc.deleteOne();
        }
        */
      }

      // remove doc from mongodb
      await userDoc.deleteOne();

      return res.json({ success: true, message: 'account unlinking complete' });
      // TODO: END1
    }

    // not logged in
    return res.status(401).json({ success: false, message: 'not allowed' });
  }
}

module.exports = UserController;
