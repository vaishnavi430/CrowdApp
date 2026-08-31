const Reward = require("../models/Reward");
const asyncHandler = require("../utils/asyncHandler");

const createReward = asyncHandler(async (req, res) => {
  const {
    projectId,
    title,
    description,
    amountRequired,
    estimatedDelivery,
    quantityAvailable,
  } = req.body;

  const reward = await Reward.create({
    projectId,
    title,
    description,
    amountRequired,
    estimatedDelivery,
    quantityAvailable,
  });

  res.status(201).json({
    success: true,
    message: "Reward created successfully",
    reward,
  });
});

module.exports = {
  createReward,
};