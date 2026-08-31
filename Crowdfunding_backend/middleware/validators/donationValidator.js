const { body } = require("express-validator");
const validateRequest = require("../validateRequest");

const validateDonation = [
  body("projectId")
    .notEmpty()
    .withMessage("Project ID is required")
    .isMongoId()
    .withMessage("Invalid Project ID"),

  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Donation amount must be greater than 0"),

  validateRequest,
];

module.exports = {
  validateDonation,
};