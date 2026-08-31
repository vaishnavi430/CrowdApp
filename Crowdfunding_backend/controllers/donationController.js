const Donation = require("../models/Donation");
const Project = require("../models/Project");
const asyncHandler = require("../utils/asyncHandler");

// ==========================================
// Donate to Project
// ==========================================

const createDonation = asyncHandler(async (req, res) => {
  const { projectId, amount } = req.body;

  // ==========================================
  // Validate Amount
  // ==========================================

  const donationAmount = Number(amount);

  if (
    !Number.isFinite(donationAmount) ||
    donationAmount <= 0
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Donation amount must be greater than 0",
    });
  }

  // ==========================================
  // Find Project
  // ==========================================

  const project = await Project.findById(
    projectId
  );

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Campaign not found",
    });
  }

  // ==========================================
  // Check Campaign Status
  // ==========================================

  const now = new Date();

  // Goal already reached
  if (
    Number(project.pledgedAmount) >=
    Number(project.goalAmount)
  ) {
    if (project.status !== "Funded") {
      project.status = "Funded";
      await project.save();
    }

    return res.status(400).json({
      success: false,
      message:
        "This campaign has already reached its funding goal",
    });
  }

  // Deadline passed
  if (
    project.deadline &&
    new Date(project.deadline) < now
  ) {
    if (project.status !== "Expired") {
      project.status = "Expired";
      await project.save();
    }

    return res.status(400).json({
      success: false,
      message:
        "This campaign has expired and is no longer accepting donations",
    });
  }

  // ==========================================
  // Status Check
  // ==========================================

  if (project.status !== "Active") {
    return res.status(400).json({
      success: false,
      message:
        "This campaign is not currently accepting donations",
    });
  }

  // ==========================================
  // Prevent Donation From Exceeding Goal
  // ==========================================

  const remainingAmount =
    Number(project.goalAmount) -
    Number(project.pledgedAmount);

  const acceptedAmount = Math.min(
    donationAmount,
    remainingAmount
  );

  if (acceptedAmount <= 0) {
    return res.status(400).json({
      success: false,
      message:
        "This campaign has no remaining funding requirement",
    });
  }

  // ==========================================
  // Create Donation
  // ==========================================

  const donation = await Donation.create({
    backer: req.user._id,
    project: projectId,
    amount: acceptedAmount,
    paymentStatus: "Success",
  });

  // ==========================================
  // Update Pledged Amount
  // ==========================================

  project.pledgedAmount =
    Number(project.pledgedAmount) +
    acceptedAmount;

  // ==========================================
  // Update Campaign Status
  // ==========================================

  if (
    project.pledgedAmount >=
    project.goalAmount
  ) {
    project.status = "Funded";
  } else {
    project.status = "Active";
  }

  await project.save();

  // ==========================================
  // Response
  // ==========================================

  res.status(201).json({
    success: true,
    message:
      "Donation successful",
    donation,
    pledgedAmount:
      project.pledgedAmount,
    status: project.status,
  });
});

// ==========================================
// Get My Donations
// ==========================================

const getMyDonations = asyncHandler(
  async (req, res) => {
    const donations =
      await Donation.find({
        backer: req.user._id,
      })
        .populate(
          "project",
          "title category image goalAmount pledgedAmount status"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: donations.length,
      donations,
    });
  }
);

// ==========================================
// Exports
// ==========================================

module.exports = {
  createDonation,
  getMyDonations,
};