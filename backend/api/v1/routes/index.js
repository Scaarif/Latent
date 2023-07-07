const express = require('express');
const HouseController = require('../controllers/HouseController');
const upload = require('../middelwares/upload');

const router = express.Router();

router.post(
  '/api/v1/houses',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'images', maxCount: 3 }]),
  HouseController.postHouse,
);

router.get('/houses', HouseController.getHouse);
router.delete('/houses', HouseController.deleteHouse);
router.put(
  '/houses',
  upload.array('images', 5),
  HouseController.updateHouse,
);
router.post('/appointment/:houseId', HouseController.bookHouse);

module.exports = router;
