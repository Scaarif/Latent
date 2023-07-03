const express = require("express");
const passport = require("passport");
const AuthController = require("../controllers/AuthController");
const checkAuthenticated = require("../middlewares/checkAuthenticated");
const UserController = require("../controllers/UserController");

const router = express.Router();

router.post("/login", passport.authenticate("local"), AuthController.login);
router.post("/user", UserController.signUp);
router.get("/admin", checkAuthenticated, (req, res) => {
  res.json({
    message: "Only authenticated users can view.Route is for testing",
  });
});

module.exports = router;
