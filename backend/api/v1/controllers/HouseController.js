const House = require("../models/House");
// const Agent = require("../models/Agent");

class HouseController {
  /**
   * Create a new house entry with the provided details.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise} - A Promise that resolves to the created house entry or rejects with an error.
   */
  static async postHouse(req, res) {
    try {
      // if (!req.user) return res.status(401).json({ error: "Unauthorized" });
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
    try {
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
        // If agentName is one of the search parameters
        if (key === "agentName") {
          const [firstName, lastName] = req.query[key].split("_");
          const agent = await Agent.findOne({ firstName, lastName });
          const agentId = agent._id;
          params.agentId = agentId;
        }

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
      const result = await House.find(params);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  /**
   * Delete a house entry based on the provided ID.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise} - A Promise that resolves to the deleted house entry or rejects with an error.
   */
  static async deleteHouse(req, res) {
    try {
      // if (!req.user) return res.status(401).json({ error: "Unauthorized" });
      // const { _id } = req.user;
      const { _id } = req.query;

      // Find and delete the house entry in the database with the provided ID.
      const result = await House.findByIdAndDelete(_id);
      return res.status(200).json(result);
    } catch (err) {
      // If an error occurs during house deletion, return a JSON response with a 400 status code and the error message.
      return res.status(400).json({ error: err.message });
    }
  }

  /**
   * Updates an existing house entry in the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async updateHouse(req, res) {
    try {
      if (!req.user) return res.status(401).json({ error: "Unauthorized" });
      const { _id } = req.user;
      // const { _id } = req.params;
      // Add a check to confirm whether the authenticated user is the owner of the house
      // ...
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
        return res.status(400).json({ error: "No images uploaded" });
      }

      const uploadedImages = req.files.map((file) => file.path);

      // Create an object with the properties to be updated in the database.
      const updateObject = {
        location: { country, state, city },
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
        coverImage: uploadedImages[0],
        images: uploadedImages.slice(1),
      };

      // Find the existing house by ID and update it with the new data.
      const existingHouse = await House.findByIdAndUpdate(
        _id,
        updateObject,
        { new: true } // Return the updated house after the update is applied.
      );

      // If the house doesn't exist, return a 404 response.
      if (!existingHouse) {
        return res.status(404).json({ error: "House not found" });
      }

      res.status(200).json(existingHouse);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = HouseController;
