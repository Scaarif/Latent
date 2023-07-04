const express = require("express");
const HouseController = require("../controllers/HouseController");
const upload = require("../middelwares/upload");

const router = express.Router();

router.post(
  "/api/v1/houses",
  upload.array("images", 5),
  HouseController.postHouse
);

router.get("/api/v1/houses", HouseController.getHouse);
module.exports = router;
