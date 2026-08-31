const express = require("express");
const { createReward } = require("../controllers/rewardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const {
  validateReward,
} = require("../middleware/validators/rewardValidator");

router.post("/", protect, validateReward, createReward);

module.exports = router;
