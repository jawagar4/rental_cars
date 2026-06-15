const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      bookingId: `BK${Date.now()}`,
      ...req.body,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Booking deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
  deleteBooking,
};