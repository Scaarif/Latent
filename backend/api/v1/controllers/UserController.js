const passport = require('passport');
const mongoose = require('mongoose');
const Bull = require('bull');
const speakEasy = require('speakeasy');
const Tenant = require('../models/Tenant');
const Agent = require('../models/Agent');
const House = require('../models/House');
const Rating = require('../models/Rating');

// a Bull queue using default 127.0.0.1:6379 connection
const pwdQueue = new Bull('resetPassword');

// generate a secret key of length 20 for OTPs
const secret = speakEasy.generateSecret({ length: 20 });

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
   * Changes/resets a user's password.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise} - A Promise that resolves to a password change, or failure
   *
   * Algorithm:
   *
   * oldPassword and newPassword are always expected in the request body (form).
   * If both are set, they'll be processed. If any of them is missing, check for email is done.
   *
   * If email is set, then then it is done in one of two steps:
   * Step1 --> password is forgotten, the user is logged out,
   * and their email is provided in a form for OTP delivery. Email will be in body.
   * Step2 --> OTP has been delivered, and is being
   * provided with the email (again) for reset. Email will be in query string.
   *
   * If no otp and/or isAgent, and email is set, it is assumed this is the first step, and
   * the OTP needs to be sent. If both are present (step2), then
   * we proceed to verifying the OTP, and resetting the password.
   *
   * Otherwise (if no oldPassword and newPassword, or email), error is sent.
   */
  static async putPassword(req, res) {
    // TODO: confirm implementation variables; e.g. isAgent
    // TODO: logout user on successful password change; case1
    const {
      oldPassword,
      newPassword,
      otp,
      isAgent,
    } = req.body;

    let { email } = req.body;
    if (!email) {
      // not in body; check query string
      email = req.query.email;
    }

    // case1: user is logged in and wants to reset password
    if (oldPassword && newPassword && req.isAuthenticated()) {
      req.user.changePassword(oldPassword, newPassword, (err) => {
        if (err) {
          // likely wrong old password
          return res.status(401).json({ success: false, message: err.toString() });
        }

        return res.json({ success: true, message: 'password successfully changed' });
      });

      return undefined;
    }

    // case2: user has forgotten password; must be logged out
    if (email && !req.isAuthenticated()) {
      // email provided
      if (!otp || !isAgent) {
        // generate and send OTP
        // TODO: confirm expected interface from team
        /* =====generate OTP manually=====
        let otp = (Math.round(Math.random() * 999999)).toString();
        const padding = '0'.repeat(6 - otp.length);
        otp = `${otp}${padding}`;
        const jobData = {
          email,
          otp,
        };
        pwdQueue.add(job);
        ================================== */
        // generate OTP with speakeasy module
        // generate a time-based OTP token based on the secret;
        // to be verified later with:
        // `speakEasy.totp.verify({secret: secret.base32, encoding: 'base32', token, window: 20})`
        // which uses a 10-minute window (1 window is 30 secs step by default),
        // meaning the token is valid for only about 10 minutes
        const token = speakEasy.totp({ secret: secret.base32, encoding: 'base32' }); // hex and ascii key/encoding can be used

        // add a job to the queue for sending emails with OTP
        // TODO: might need to add data on interface confirm
        const jobData = { token, email };
        pwdQueue.add(jobData);

        // TODO: confirm the response status code from team
        return res.status(102).json({ success: true, message: 'sending OTP' });
      }

      // email, otp, and isAgent provided; attempt pwd reset
      // verify token
      const verified = speakEasy.totp.verify({
        secret: secret.base32,
        encoding: 'base32',
        token: otp,
        window: 20,
      });
      if (!verified) {
        // invalid OTP
        return res.status(401).json({ success: false, message: 'invalid OTP' });
      }

      // +++++OTP verified+++++

      // retrieve the user doc
      if (isAgent === 'yes') {
        // `possibly` an agent
        const agentDoc = await Agent.findOne({ email }).exec();
        if (agentDoc) {
          // document found
          agentDoc.setPassword(newPassword, async (err, user, passwordErr) => {
            if (err) {
              // likely hashing algorithm error
              return res.status(500).json({ success: false, message: 'possible issues with hashing algorithm' });
            }
            if (passwordErr) {
              return res.status(401).json({ success: false, message: passwordErr.toString() });
            }
            // no errors
            await user.save();
            return res.json({ success: true, message: 'password reset complete' });
          });
        } else {
          // no agent found
          res.status(401).json({ success: false, message: 'no such agent found' });
        }
      } else {
        // `possibly` a tenant
        const tenantDoc = await Tenant.findOne({ email }).exec();
        if (tenantDoc) {
          // document found
          tenantDoc.setPassword(newPassword, async (err, user, passwordErr) => {
            if (err) {
              // likely hashing algorithm error
              return res.status(500).json({ success: false, message: 'possible issues with hashing algorithm' });
            }
            if (passwordErr) {
              return res.status(401).json({ success: false, message: passwordErr.toString() });
            }
            // no errors
            await user.save();
            return res.json({ success: true, message: 'password reset complete' });
          });
        } else {
          // no tenant found
          res.status(401).json({ success: false, message: 'no such tenant found' });
        }

        return undefined;
      }
    }

    if (req.isAuthenticated()) {
      return res.status(401).json({ success: false, message: 'no oldPassword and newPassword fields' });
    }

    // not authenticated, and no email
    return res.status(401).json({ success: false, message: 'no email field' });
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
            await houseDoc.deleteOne();
          }

          const ratingDocs = await Rating.find({ agentId: userDoc._id }).exec();
          for await (const ratingDoc of ratingDocs) {
            // remove all linked ratings
            await ratingDoc.deleteOne();
          }
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
          await houseDoc.deleteOne();
        }

        const ratingDocs = await Rating.find({ agentId: userDoc._id }).exec();
        for await (const ratingDoc of ratingDocs) {
          // remove all linked ratings
          await ratingDoc.deleteOne();
        }
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
