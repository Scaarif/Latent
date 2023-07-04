const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
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
});

const HouseSchema = new mongoose.Schema({
  // agentId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  // },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: LocationSchema,
    required: true,
  },
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
  coverImage: {
    type: String,
    required: true,
  },
  images: [String],
  numRooms: {
    type: Number,
    required: true,
  },
  numBathrooms: {
    type: Number,
    required: true,
  },
  numToilets: {
    type: Number,
    required: true,
  },
  numFloors: {
    type: Number,
    required: true,
  },
  shared: {
    type: Boolean,
    required: true,
  },
  water: {
    type: Boolean,
    required: true,
  },
  electricity: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  houseType: {
    type: String,
    required: true,
  },
});

HouseSchema.pre("save", async function (next) {
  try {
    const response = await fetch(
      `https://geocode.xyz/${this.location.city}?json=1`
    );
    const { longt, latt } = await response.json();
    if (longt && latt) {
      this.latitude = latt;
      this.longitude = longt;
    } else {
      this.latitude = null;
      this.longitude = null;
    }
  } catch (error) {
    this.latitude = null;
    this.longitude = null;
  }
  next();
});

const House = mongoose.model("house", HouseSchema);
module.exports = House;
