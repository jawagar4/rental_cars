const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  fuel: {
    type: String,
    required: true,
  },
  kms: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availability: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "high",
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Carscards", carSchema);