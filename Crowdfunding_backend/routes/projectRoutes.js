const express = require("express");

const router = express.Router();

const {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  getMyProjects,
  getProjectBackers,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");

const {
  validateProject,
} = require("../middleware/validators/projectValidator");

const upload = require("../middleware/uploadMiddleware");

// ==========================================
// Public Routes
// ==========================================

// Get all campaigns
// Supports:
// ?search=
// ?category=
// ?status=
// ?sort=
// ?page=
// ?limit=

router.get("/", getProjects);

// ==========================================
// Protected Routes
// ==========================================

// Get campaigns created by logged-in user
router.get(
  "/my-projects",
  protect,
  getMyProjects
);

// ==========================================
// Create Campaign
// ==========================================

router.post(
  "/",
  protect,
  upload.single("image"),
  validateProject,
  createProject
);

// ==========================================
// Get Campaign Backers
// ==========================================

router.get(
  "/:id/backers",
  getProjectBackers
);

// ==========================================
// Update Campaign
// ==========================================

router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateProject
);

// ==========================================
// Delete Campaign
// ==========================================

router.delete(
  "/:id",
  protect,
  deleteProject
);

// ==========================================
// Get Single Campaign
// Keep this LAST
// ==========================================

router.get(
  "/:id",
  getProjectById
);

module.exports = router;