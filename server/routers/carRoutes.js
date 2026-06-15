const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

// POST Car
router.post("/uploadcard", async (req, res) => {
  try {
    const car = new Car(req.body);
    const savedCar = await car.save();

    res.status(201).json({
      success: true,
      data: savedCar,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET All Cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;