// controllers/creatorController.js
const Creator = require("../models/Creator");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const registerCreator = async (req, res) => {
  const { name, email, password, bio } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  // Check if creator already exists
  const existingUser = await Creator.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Creator already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new creator
  const creator = await Creator.create({ name, email, password: hashedPassword, bio });

  if (creator) {
    res.status(201).json({
      _id: creator._id,
      name: creator.name,
      email: creator.email,
      token: generateToken(creator._id),
    });
  } else {
    res.status(400).json({ message: "Invalid creator data" });
  }
};

const loginCreator = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const creator = await Creator.findOne({ email });

  if (creator && (await bcrypt.compare(password, creator.password))) {
    res.json({
      _id: creator._id,
      name: creator.name,
      email: creator.email,
      token: generateToken(creator._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

const getProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    bio: req.user.bio,
    profileImage: req.user.profileImage,
    projects: req.user.projects,
    createdAt: req.user.createdAt,
  });
};

module.exports = { registerCreator, loginCreator, getProfile };