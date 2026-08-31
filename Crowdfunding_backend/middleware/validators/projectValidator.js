const { body } = require("express-validator");
const validateRequest = require("../validateRequest");

const validateProject = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("goalAmount")
    .isFloat({ gt: 0 })
    .withMessage("Goal amount must be greater than 0"),

  body("deadline")
    .notEmpty()
    .withMessage("Deadline is required")
    .isISO8601()
    .withMessage("Invalid deadline"),

  validateRequest,
];

module.exports = {
  validateProject,
};