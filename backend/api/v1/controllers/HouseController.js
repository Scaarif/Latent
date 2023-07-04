const House = require("../models/House");

class HouseController {
  static async postHouse(req, res) {
    const {
      country,
      state,
      city,
      description,
      price,
      numRooms,
      numBathrooms,
      numToilets,
      shared,
      water,
      electricity,
      name,
      address,
      houseType,
    } = req.body;

    if (req.files.length === 0) {
      return res.status(400).send("No images uploaded");
    }
    const uploadedImages = req.files.map((file) => file.path);
    // const agentId = req.user._id;
    const newHouse = {
      // agentId,
      location: { country: country, state: state, city: city },
      coverImage: uploadedImages[0],
      images: [...uploadedImages.splice(0, 1)],
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
