const express = require("express");
const router = express.Router();

const { registerCreator, loginCreator, getProfile } = require("../controllers/creatorController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerCreator);
router.post("/login", loginCreator);
router.get("/profile", protect, getProfile);

module.exports = router;