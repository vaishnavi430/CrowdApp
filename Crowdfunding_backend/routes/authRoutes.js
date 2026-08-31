const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const {
  validateRegister,
  validateLogin,
} = require("../middleware/validators/authValidator");

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/me", protect, getCurrentUser);
router.post("/logout", logoutUser);

module.exports = router;