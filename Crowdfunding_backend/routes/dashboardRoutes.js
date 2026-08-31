const express = require("express");
const router = express.Router();

const {
  getCreatorDashboard,
  getBackerDashboard,
} = require("../controllers/dashboardController");

const { protect } = require("../middleware/authMiddleware");

// ==========================================
// Dashboard Routes
// ==========================================

// Creator Dashboard
router.get("/creator", protect, getCreatorDashboard);

// Backer Dashboard
router.get("/backer", protect, getBackerDashboard);

module.exports = router;