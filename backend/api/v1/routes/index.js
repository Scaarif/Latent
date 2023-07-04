const express = require("express");
const HouseController = require("../controllers/HouseController");

const router = express.Router();

router.post("/houses", HouseController.postHouse);
module.exports = router;
