const express = require("express");
const HouseController = require("../controllers/HouseController");
const upload = require("../middelwares/upload");

const router = express.Router();

router.post(
  "/api/v1/houses",
  upload.single("image"),
  HouseController.postHouse
);
module.exports = router;
