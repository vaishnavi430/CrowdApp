const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  amountRequired: { type: Number, required: true },
  estimatedDelivery: { type: Date, required: true },
  quantityAvailable: { type: Number },
});

module.exports = mongoose.model("Reward", rewardSchema);
