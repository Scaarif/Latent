require("dotenv").config();
const express = require("express");
const allRoutes = require("./routes/index");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const initializePassport = require("./controllers/AuthController").initialize;

const app = express();
initializePassport(passport);
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch((err) => console.log(err.message));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(allRoutes);
