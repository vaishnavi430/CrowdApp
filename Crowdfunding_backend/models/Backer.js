const mongoose = require("mongoose");

const backerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  backedProjects: [
    {
      projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
      amountPledged: { type: Number, required: true },
      rewardSelected: { type: mongoose.Schema.Types.ObjectId, ref: "Reward" },
      backedAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Backer", backerSchema);
