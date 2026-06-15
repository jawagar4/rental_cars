const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    carName: {
      type: String,
      required: true,
    },
    carImage: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: "Cash",
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);