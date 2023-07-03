const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

class AuthController {
  static initialize(passport) {
    async function authenticateUser(email, password, done) {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, {
          message: "There is no user with that email",
        });
      }
      try {
        const isMatch = await user.matchPassword(password, user.password);
        if (!isMatch)
          return done(null, false, { message: "Password incorrect" });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }

    passport.use(
      new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        authenticateUser
      )
    );

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
      const user = await User.findById(id);
      done(null, user);
    });
  }

  static login(req, res) {
    return res.status(200).json({ messasge: "Logged in succesfully" });
  }

  static logout(req, res) {
    req.logOut(() =>
      res.status(200).json({ message: "Logged out succesfully" })
    );
  }
}

module.exports = AuthController;
