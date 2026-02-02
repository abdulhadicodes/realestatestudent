const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, default: "" },
  website: { type: String, default: null },
  hasWebsite: { type: Boolean, required: true },
  lat: { type: String, required: true },
  lon: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Lead", leadSchema);
