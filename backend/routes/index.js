const express = require("express");
const passport = require("passport");
const AuthController = require("../controllers/AuthController");
const checkAuthenticated = require("../middlewares/checkAuthenticated");
const isNotAuthenticated = require("../middlewares/isNotAuthenticated");
const UserController = require("../controllers/UserController");

const router = express.Router();

// isNotAuthenticated shields authenticated users from accessing /login again
router.post(
  "/login",
  isNotAuthenticated,
  passport.authenticate("local"),
  AuthController.login
);

// CheckAuthenticated protects routes from unauthenitcated users
router.get("/logout", checkAuthenticated, AuthController.logout);
router.post("/user", UserController.signUp);
router.get("/admin", checkAuthenticated, (req, res) => {
  res.json({
    message: "Only authenticated users can view.Route is for testing",
  });
});

module.exports = router;
