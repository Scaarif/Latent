const House = require("../models/House");

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
    const result = await House.create(newHouse);
    res.status(201).json(result);
  }
}

module.exports = HouseController;
