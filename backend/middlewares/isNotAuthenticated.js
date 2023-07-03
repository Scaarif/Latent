function isNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.status(400).json({ msg: "You are already logged in" });
  }
  next();
}

module.exports = isNotAuthenticated;
