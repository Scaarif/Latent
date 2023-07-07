const mongoose = require('mongoose');

// Define the Ratings schema
const ratingsSchema = new mongoose.Schema({
  tenantID: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  tenantRating: { type: Number, required: true },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
});

const Ratings = mongoose.model('Ratings', ratingsSchema);
module.exports = Ratings;
