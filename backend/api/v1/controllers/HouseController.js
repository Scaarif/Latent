const House = require("../models/House");

class HouseController {
  static async postHouse(req, res) {
    const {
      country,
      state,
      city,
      description,
      price,
      numFloors,
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
      description,
      price,
      numFloors,
      numRooms,
      numBathrooms,
      numToilets,
      shared,
      water,
      electricity,
      name,
      address,
      houseType,
    };
    try {
      const result = await House.create(newHouse);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getHouse(req, res) {
    const params = {};
    const numericalParamters = [
      "numRooms",
      "numFloors",
      "numBathrooms",
      "numToilets",
      "price",
    ];

    // These paramters are attributes of location object in the db
    const locationParamters = ["country", "state", "city"];

    for (const key of Object.keys(req.query)) {
      if (locationParamters.includes(key)) {
        params[`location.${key}`] = req.query[key];
        continue;
      }
      if (numericalParamters.includes(key)) {
        params[key] = parseInt(req.query[key]);
      } else {
        params[key] = req.query[key];
      }
    }
    try {
      const result = await House.find(params);
      console.log(params);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = HouseController;
