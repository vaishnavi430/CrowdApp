const express = require("express");
const { registerBacker, loginBacker, getProfile } = require("../controllers/backerController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerBacker);
router.post("/login", loginBacker);
router.get("/profile", protect, getProfile);

module.exports = router;
