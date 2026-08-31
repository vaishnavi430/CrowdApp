const { body } = require("express-validator");
const validateRequest = require("../validateRequest");

// ==========================================
// Register Validation
// ==========================================
const validateRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("role")
    .isIn(["creator", "backer"])
    .withMessage("Role must be creator or backer"),

  validateRequest,
];

// ==========================================
// Login Validation
// ==========================================
const validateLogin = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  validateRequest,
];

module.exports = {
  validateRegister,
  validateLogin,
};