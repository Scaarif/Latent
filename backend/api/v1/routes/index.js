const express = require('express');
const HouseController = require('../controllers/HouseController');
const upload = require('../middlewares/upload');
const { Tenant, Agent } = require('../models/User');

const router = express.Router();

router.post(
  '/api/v1/houses',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'images', maxCount: 3 }]),
  HouseController.postHouse,
);

router.get('/api/v1/houses', HouseController.getHouse);
router.delete('/api/v1/houses', HouseController.deleteHouse);
router.put(
  '/api/v1/houses',
  upload.array('images', 5),
  HouseController.updateHouse,
);
router.post('/api/v1/appointment/:houseId', HouseController.bookHouse);

router.post('/api/v1/tenant', async (req, res) => {
  const { firstName, phoneNumber, email } = req.body;
  const tenant = new Tenant({ firstName, phoneNumber, email });
  const result = await tenant.save();
  res.status(201).json(result);
});

router.post('/api/v1/agent', async (req, res) => {
  const { firstName, phoneNumber, email } = req.body;
  const agent = new Agent({ firstName, phoneNumber, email });
  const result = await agent.save();
  res.status(201).json(result);
});

module.exports = router;
