const express = require("express");
const HouseController = require("../controllers/HouseController");

const router = express.Router();

router.post("/api/v1/houses", HouseController.postHouse);
module.exports = router;
