const express = require("express");

const router = express.Router();

const {
  getProfile,
  updateProfile,
  changePassword,
  getSettings,
  updateSettings,
  exportUserData,
  deleteAccount,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

// ==========================================
// Profile
// ==========================================

router.get(
  "/profile",
  protect,
  getProfile
);

router.put(
  "/profile",
  protect,
  updateProfile
);

// ==========================================
// Password
// ==========================================

router.put(
  "/change-password",
  protect,
  changePassword
);

// ==========================================
// Settings
// ==========================================

router.get(
  "/settings",
  protect,
  getSettings
);

router.put(
  "/settings",
  protect,
  updateSettings
);

// ==========================================
// Export Data
// ==========================================

router.get(
  "/export-data",
  protect,
  exportUserData
);

// ==========================================
// Delete Account
// ==========================================

router.delete(
  "/account",
  protect,
  deleteAccount
);

module.exports = router;