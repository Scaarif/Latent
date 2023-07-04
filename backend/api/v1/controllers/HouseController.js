const House = require("../models/House");
const multer = require("multer");

// Set up local storage for images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

class HouseController {
  static async postHouse(req, res) {
    const { country, state, city, price, electricity } = req.body;
    // const agentId = req.user._id;
    const newHouse = {
      // agentId,
      location: { country: country, state: state, city: city },
      price,
      electricity,
    };
    try {
    } catch (err) {}
    const result = await House.create(newHouse);
    res.status(201).json(result);
  }
}

module.exports = HouseController;
