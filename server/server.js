const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connection
const connectDB = require("./config/db");
connectDB();

// routes
const carRoutes = require("./routers/carRoutes");
const authRoutes = require("./routers/authRoutes");
const bookings = require("./routers/bookingRoutes");


app.use("/api/carscard", carRoutes);
app.use("/api", authRoutes);
app.use("/api/bookings", bookings);

// server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});