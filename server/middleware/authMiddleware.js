const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// You should export these from db.js or pass via dependency injection
const usersCollection = require('../config/db').usersCollection;
const secretKey = process.env.JWT_SECRET || "your_secret_key";

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, email,  password } = req.body;

    const existingUser = await usersCollection.findOne({ username, email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({ username, email, password: hashedPassword });

    console.log("User registered:", username, email);
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const {  email, password } = req.body;

    const user = await usersCollection.findOne({  email });
    if (!user) {
      return res.status(401).json({ message: "User not found. Please register." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ username },{ email }, secretKey, { expiresIn: '1h' });

    console.log("User logged in:", email);
    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// VERIFY TOKEN
exports.verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ valid: false, message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
    }

    res.json({ valid: true, username: decoded.username, email: decode.email });
  });
};