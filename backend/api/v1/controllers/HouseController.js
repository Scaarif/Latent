const House = require("../models/House");

class HouseController {
  /**
   * Create a new house entry with the provided details.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise} - A Promise that resolves to the created house entry or rejects with an error.
   */
  static async postHouse(req, res) {
    try {
      // Extract the required properties from the request body.
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

      // Check if any images were uploaded.
      if (req.files.length === 0) {
        return res.status(400).send("No images uploaded");
      }

      // Extract the file paths of the uploaded images.
      const uploadedImages = req.files.map((file) => file.path);
      // const agentId = req.user._id;

      // Create a new house object with the extracted data.
      const newHouse = {
        // agentId,
        location: { country: country, state: state, city: city },
        coverImage: uploadedImages[0],
        images: uploadedImages.slice(1), // Remove the cover image from the images array.
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

      // Create the new house entry in the database.
      const result = await House.create(newHouse);
      res.status(201).json(result);
    } catch (err) {
      // If an error occurs during house creation, return a JSON response with a 400 status code and the error message.
      res.status(400).json({ error: err.message });
    }
  }

  /**
   * Get a list of houses based on the specified parameters.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise} - A Promise that resolves to the JSON result or rejects with an error.
   */
  static async getHouse(req, res) {
    // Initialize an empty object to store query parameters for filtering houses.
    const params = {};

    // Define an array of parameter names that represent numerical values.
    const numericalParamters = [
      "numRooms",
      "numFloors",
      "numBathrooms",
      "numToilets",
      "price",
    ];

    // Define an array of parameter names that represent attributes of the location object in the database.
    const locationParamters = ["country", "state", "city"];

    for (const key of Object.keys(req.query)) {
      // If it's a location parameter, add it to the 'location' property of the 'params' object.
      if (locationParamters.includes(key)) {
        params[`location.${key}`] = req.query[key];
        continue;
      }

      // If it's a numerical parameter, parse the value to an integer and add it to the 'params' object.
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

  static async deleteHouse(req, res) {
    try {
      // if (!req.user) return res.status(401).json({ error: "Unauthorized" });
      // const { _id } = req.user;
      const { _id } = req.query;
      const result = await House.findByIdAndDelete(_id);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = HouseController;
