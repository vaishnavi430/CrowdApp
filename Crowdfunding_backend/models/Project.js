const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    goalAmount: {
      type: Number,
      required: true,
    },

    pledgedAmount: {
      type: Number,
      default: 0,
    },

    deadline: {
      type: Date,
      required: true,
    },


    rewards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reward",
      },
    ],

    status: {
      type: String,
      enum: ["Active", "Funded", "Expired"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);