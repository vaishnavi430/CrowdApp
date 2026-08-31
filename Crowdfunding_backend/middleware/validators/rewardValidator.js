const { body } = require("express-validator");
const validateRequest = require("../validateRequest");

const validateReward = [
  body("projectId")
    .notEmpty()
    .withMessage("Project ID is required")
    .isMongoId()
    .withMessage("Invalid Project ID"),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Reward title is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Reward description is required"),

  body("amountRequired")
    .isFloat({ gt: 0 })
    .withMessage("Amount required must be greater than 0"),

  body("estimatedDelivery")
    .notEmpty()
    .withMessage("Estimated delivery date is required")
    .isISO8601()
    .withMessage("Invalid delivery date"),

  validateRequest,
];

module.exports = {
  validateReward,
};