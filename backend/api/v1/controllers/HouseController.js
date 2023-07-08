/* eslint-disable no-await-in-loop */
const House = require('../models/House');
const Agent = require('../models/Agent');
const bookHouseQueue = require('../jobs/queue');

class HouseController {
  /**
   * Create a new house entry with the provided details.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   */
  static async postHouse(req, res) {
    try {
      // Check if user is authenticated
      if (!req.user) return res.status(401).json({ error: 'You need to log in' });

      // Check if user is an agent
      const { listings } = req.user;
      if (!listings) return res.status(401).json({ error: 'Must be an agent to post a house' });

      const agentId = req.user._id;
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

      // Extract paths to coverImage and optional images array
      const coverImage = req.files.coverImage[0].path;
      if (!coverImage) {
        return res
          .status(400)
          .json({ success: false, message: 'coverImage required' });
      }
      const images = req.files.images.map((file) => file.path);

      // const agentId = req.user._id;

      // Create a new house object with the extracted data.
      const newHouse = {
        agentId,
        location: { country, state, city },
        coverImage,
        images,
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
      const house = new House(newHouse);
      const result = await house.save();
      return res.status(201).json(result);
    } catch (err) {
      // If an error occurs during house creation, return a JSON response with a 400 status code
      // and the error message.
      return res.status(400).json({ error: err.message });
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
        'numRooms',
        'numFloors',
        'numBathrooms',
        'numToilets',
        'minPrice',
        'maxPrice',
      ];
      const agentParameters = ['agentFirstname', 'agentLastname'];

      // Define an array of parameter names that represent attributes of
      // the location object in the database.
      const locationParamters = ['country', 'state', 'city'];

      for (const key of Object.keys(req.query)) {
        // Check if agent parameters are part of the filter parameters
        const { agentFirstname, agentLastname } = req.query;
        if (agentFirstname && agentLastname) {
          const agent = await Agent.findOne({
            firstName: agentFirstname,
            lastName: agentLastname,
          });
          const agentId = agent._id;
          params.agentId = agentId;
        }

        // If it's a location parameter, add it to the 'location' property of the 'params' object.
        if (locationParamters.includes(key)) {
          params[`location.${key}`] = req.query[key];
        }

        // If it's a numerical parameter, parse the value to an integer
        // and add it to the 'params' object.
        if (numericalParamters.includes(key)) {
          // If both minPrice and maxPrice are provided
          if ('minPrice' in req.query && 'maxPrice' in req.query) {
            // If both are equal, houses with exact price match is return
            if (req.query.minPrice === req.query.maxPrice) {
              params.price = parseInt(req.query.minPrice, 10);
            } else {
              // Houses with price range from minPrice - maxPrice are returned
              params.price = {
                $gte: req.query.minPrice,
                $lte: req.query.minPrice,
              };
            }
          } else if (key === 'minPrice') {
            params.price = { $gte: req.query[key] };
          } else if (key === 'maxPrice') {
            params.price = { $lte: req.query[key] };
          } else {
            params[key] = parseInt(req.query[key], 10);
          }
        }
        if (![...agentParameters, ...locationParamters, ...numericalParamters].includes(key)) {
          params[key] = req.query[key];
        }
      }
      console.log(params);
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
   */
  static async deleteHouse(req, res) {
    try {
      if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

      // Check if authenicated user is an agent
      const { listings } = req.user;
      if (!listings) return res.status(401).json({ error: 'Must be an agent to delete a house' });
      const { _id } = req.user;

      // Find and delete the house entry in the database with the provided ID.
      const result = await House.findByIdAndDelete(_id);
      return res.status(200).json(result);
    } catch (err) {
      // If an error occurs during house deletion, return a JSON response with
      // a 400 status code and the error message.
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
      if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
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

      // Extract image paths.
      const coverImage = req.files.coverImage[0].path;
      if (!coverImage) {
        return res
          .status(400)
          .json({ success: false, message: 'coverImage required' });
      }
      const images = req.files.images.map((file) => file.path);

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
        coverImage,
        images,
      };

      // Find the existing house by ID and update it with the new data.
      const existingHouse = await House.findByIdAndUpdate(
        _id,
        updateObject,
        { new: true }, // Return the updated house after the update is applied.
      );

      // If the house doesn't exist, return a 404 response.
      if (!existingHouse) {
        return res
          .status(404)
          .json({ success: false, message: 'House not found' });
      }

      return res.status(200).json({ success: true, message: 'House updated' });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  static async bookHouse(req, res) {
    try {
      // Extract house id from request params
      const { houseId } = req.params;
      if (!houseId) return res.status(400).json({ success: false, message: 'HouseId required' });

      // Get house with the id
      const house = await House.findById(houseId);
      if (!house) return res.status(404).json({ success: false, message: 'No house found' });

      // Get the agent who owns the house and find his email
      const { agentId, description, address } = house;
      // Create a job data to send mail
      const bookingJobData = {
        agentId,
        tenantId: '64a83bf52a67fd3c1679d96c',
        houseAddress: address,
        houseDescription: description,
      };

      // create a Queue and queue in the job data
      const job = await bookHouseQueue.add(bookingJobData);
      await job.finished();
      return res.status(200).json({ success: true, message: 'Appointment booked' });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }
}

module.exports = HouseController;
