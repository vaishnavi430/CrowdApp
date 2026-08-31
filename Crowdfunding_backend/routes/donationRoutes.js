const express = require("express");
const router = express.Router();

const {
  createDonation,
  getMyDonations,
} = require("../controllers/donationController");

const { protect } = require("../middleware/authMiddleware");

const {
  validateDonation,
} = require("../middleware/validators/donationValidator");

// Create Donation
router.post("/", protect, validateDonation, createDonation);

// Get My Donations
router.get("/my-donations", protect, getMyDonations);

module.exports = router;