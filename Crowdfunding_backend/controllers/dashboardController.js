const asyncHandler = require("../utils/asyncHandler");

const Project = require("../models/Project");
const Donation = require("../models/Donation");

// ==========================================
// Creator Dashboard
// ==========================================

const getCreatorDashboard = asyncHandler(
  async (req, res) => {
    // Allow only creators

    if (req.user.role !== "creator") {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. Creator account required.",
      });
    }

    // Fetch creator campaigns

    const projects = await Project.find({
      creator: req.user._id,
    }).sort({
      createdAt: -1,
    });

    const projectIds = projects.map(
      (project) => project._id
    );

    // Fetch donations for those campaigns

    const donations =
      projectIds.length > 0
        ? await Donation.find({
            project: {
              $in: projectIds,
            },
          }).populate(
            "backer",
            "name email"
          )
        : [];

    // ==========================================
    // Campaign Statistics
    // ==========================================

    const totalCampaigns =
      projects.length;

    const activeCampaigns =
      projects.filter(
        (project) =>
          project.status === "Active"
      ).length;

    const fundedCampaigns =
      projects.filter(
        (project) =>
          project.status === "Funded"
      ).length;

    const expiredCampaigns =
      projects.filter(
        (project) =>
          project.status === "Expired"
      ).length;

    // ==========================================
    // Funding Statistics
    // ==========================================

    const totalRaised =
      projects.reduce(
        (sum, project) =>
          sum +
          Number(
            project.pledgedAmount || 0
          ),
        0
      );

    const totalGoal =
      projects.reduce(
        (sum, project) =>
          sum +
          Number(
            project.goalAmount || 0
          ),
        0
      );

    // ==========================================
    // Unique Backers
    // ==========================================

    const uniqueBackers = new Set();

    donations.forEach((donation) => {
      if (donation.backer?._id) {
        uniqueBackers.add(
          donation.backer._id.toString()
        );
      }
    });

    const totalBackers =
      uniqueBackers.size;

    // ==========================================
    // Recent Donations
    // ==========================================

    const recentDonations = [
      ...donations,
    ]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 5);

    // ==========================================
    // Response
    // ==========================================

    res.status(200).json({
      success: true,

      dashboard: {
        totalCampaigns,
        activeCampaigns,
        fundedCampaigns,
        expiredCampaigns,

        totalRaised,
        totalGoal,

        totalBackers,

        recentDonations,
      },
    });
  }
);

// ==========================================
// Backer Dashboard
// ==========================================

const getBackerDashboard = asyncHandler(
  async (req, res) => {
    // Allow only backers

    if (req.user.role !== "backer") {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. Backer account required.",
      });
    }

    // Fetch donations made by logged-in backer

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

    // ==========================================
    // Donation Statistics
    // ==========================================

    const totalDonations =
      donations.length;

    const totalAmountDonated =
      donations.reduce(
        (sum, donation) =>
          sum +
          Number(
            donation.amount || 0
          ),
        0
      );

    // Only count donations whose project
    // still exists.

    const supportedCampaignIds =
      new Set();

    donations.forEach((donation) => {
      if (donation.project?._id) {
        supportedCampaignIds.add(
          donation.project._id.toString()
        );
      }
    });

    const campaignsSupported =
      supportedCampaignIds.size;

    // ==========================================
    // Response
    // ==========================================

    res.status(200).json({
      success: true,

      dashboard: {
        totalDonations,
        totalAmountDonated,
        campaignsSupported,

        recentDonations:
          donations.slice(0, 5),
      },
    });
  }
);

module.exports = {
  getCreatorDashboard,
  getBackerDashboard,
};