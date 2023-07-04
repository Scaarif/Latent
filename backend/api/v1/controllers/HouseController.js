const House = require("../models/House");

class HouseController {
  static async postHouse(req, res) {
    const { country, state, city, price, electricity } = req.body;
    const coverImage = req.file.path;
    // const agentId = req.user._id;
    const newHouse = {
      // agentId,
      location: { country: country, state: state, city: city },
      coverImage,
      // price,
      // electricity,
    };
    try {
      const result = await House.create(newHouse);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = HouseController;
