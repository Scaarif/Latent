const User = require("../models/User");

class UserController {
  static handleErrors(err) {
    let error = {};
    // Validation errors
    if (err.message.includes("user validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        error[properties.path] = properties.message;
      });
    }
    return error;
  }

  static async signUp(req, res) {
    const { firstName, lastName, phoneNumber, password, email } = req.body;
    try {
      const user = await User.create({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      });
      return res.status(201).json({ user });
    } catch (err) {
      const errors = UserController.handleErrors(err);
      return res.status(400).json(errors);
    }
  }
}

module.exports = UserController;
