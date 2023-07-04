require("dotenv").config();
const express = require("express");
const allRoutes = require("./routes/index");
const mongoose = require("mongoose");

const app = express();
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(allRoutes);
