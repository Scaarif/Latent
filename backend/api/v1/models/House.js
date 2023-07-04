const mongoose = require("mongoose");
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

const HouseSchema = new mongoose.Schema({
  //   agentId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Agent",
  //   },
  //   description: {
  //     type: String,
  //     required: true,
  //   },
  location: [
    {
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
    },
  ],
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  //   coverImage: {
  //     type: String,
  //     required: true,
  //   },
  //   images: [String],
  //   numRooms: {
  //     type: Number,
  //     required: true,
  //   },
  //   numBathrooms: {
  //     type: Number,
  //     required: true,
  //   },
  //   numToilets: {
  //     type: Number,
  //     required: true,
  //   },
  //   numFloors: {
  //     type: Number,
  //     required: true,
  //   },
  //   numRooms: {
  //     type: Number,
  //     required: true,
  //   },
  //   shared: {
  //     type: Boolean,
  //     required: true,
  //   },
  //   water: {
  //     type: Boolean,
  //     required: true,
  //   },
  electricity: {
    type: Boolean,
    required: true,
  },
});

HouseSchema.pre("save", async function (next) {
  const location = this.location[0];
  try {
    const response = await fetch(`https://geocode.xyz/${location.city}?json=1`);
    const { longt, latt } = await response.json();
    if (longt && latt) {
      this.latitude = latt;
      this.longitude = longt;
      next();
    } else {
      this.latitude = null;
      this.longitude = null;
      next();
    }
  } catch (error) {
    this.latitude = null;
    this.longitude = null;
    next();
  }
});

const House = mongoose.model("house", HouseSchema);
module.exports = House;
