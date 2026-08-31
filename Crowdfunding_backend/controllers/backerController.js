const Backer = require("../models/Backer");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const registerBacker = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await Backer.findOne({ email });

  if (existingUser) return res.status(400).json({ message: "Backer already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const backer = await Backer.create({ name, email, password: hashedPassword });

  res.status(201).json({ _id: backer.id, name: backer.name, email: backer.email, token: generateToken(backer.id) });
};

const loginBacker = async (req, res) => {
  const { email, password } = req.body;
  const backer = await Backer.findOne({ email });

  if (backer && (await bcrypt.compare(password, backer.password))) {
    res.json({ _id: backer.id, name: backer.name, email: backer.email, token: generateToken(backer.id) });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

const getProfile = async (req, res) => {
  res.json(req.user);
};

module.exports = { registerBacker, loginBacker, getProfile };
