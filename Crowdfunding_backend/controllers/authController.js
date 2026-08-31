const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../utils/asyncHandler");

// @desc Register User
// @route POST /api/auth/register
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    console.log("========== REGISTER API ==========");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    const { name, email, password, role } = req.body || {};

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required fields",
            receivedBody: req.body,
        });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "Email already registered",
        });
    }

    const user = await User.create({
        name,
        email,
        password,
        role: role || "backer",
    });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        token: generateToken(user._id),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
});

// @desc Login User
// @route POST /api/auth/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.status(200).json({
    success: true,
    message: "Login successful",
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// @desc Get Current User
// @route GET /api/auth/me
// @access Private

const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

// @desc Logout User
// @route POST /api/auth/logout
// @access Public

const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
};