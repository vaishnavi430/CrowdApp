const Project = require("../models/Project");
const Donation = require("../models/Donation");
const asyncHandler = require("../utils/asyncHandler");

// ==========================================
// Sync Single Project Status
// ==========================================

const syncProjectStatus = async (project) => {
  if (!project) {
    return project;
  }

  const pledgedAmount =
    Number(project.pledgedAmount) || 0;

  const goalAmount =
    Number(project.goalAmount) || 0;

  const now = new Date();

  let newStatus = "Active";

  if (pledgedAmount >= goalAmount) {
    newStatus = "Funded";
  } else if (
    project.deadline &&
    new Date(project.deadline) < now
  ) {
    newStatus = "Expired";
  }

  if (project.status !== newStatus) {
    project.status = newStatus;
    await project.save();
  }

  return project;
};

// ==========================================
// Get All Projects
// Search + Filter + Sort + Pagination
// ==========================================

const getProjects = asyncHandler(async (req, res) => {
  const {
    search,
    category,
    status,
    sort = "newest",
    page = 1,
    limit = 9,
  } = req.query;

  const query = {};

  // ==========================================
  // Search
  // ==========================================

  if (search && search.trim()) {
    const escapedSearch = search
      .trim()
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    query.title = {
      $regex: escapedSearch,
      $options: "i",
    };
  }

  // ==========================================
  // Category Filter
  // ==========================================

  if (category && category !== "All") {
    query.category = category;
  }

  // ==========================================
  // Sorting
  // ==========================================

  let sortOption = {};

  switch (sort) {
    case "oldest":
      sortOption = {
        createdAt: 1,
      };
      break;

    case "highest":
      sortOption = {
        pledgedAmount: -1,
      };
      break;

    case "lowest":
      sortOption = {
        pledgedAmount: 1,
      };
      break;

    case "ending":
      sortOption = {
        deadline: 1,
      };
      break;

    case "goal":
      sortOption = {
        goalAmount: -1,
      };
      break;

    default:
      sortOption = {
        createdAt: -1,
      };
  }

  // ==========================================
  // Pagination
  // ==========================================

  const pageNumber = Math.max(
    Number(page) || 1,
    1
  );

  const limitNumber = Math.min(
    Math.max(Number(limit) || 9, 1),
    50
  );

  const skip =
    (pageNumber - 1) * limitNumber;

  // ==========================================
  // Get Projects First
  // ==========================================

  let projects = await Project.find(query)
    .populate("creator", "name email")
    .sort(sortOption)
    .lean();

  // ==========================================
  // Synchronize Statuses
  // ==========================================

  const now = new Date();

  for (const project of projects) {
    const pledgedAmount =
      Number(project.pledgedAmount) || 0;

    const goalAmount =
      Number(project.goalAmount) || 0;

    let newStatus = "Active";

    if (pledgedAmount >= goalAmount) {
      newStatus = "Funded";
    } else if (
      project.deadline &&
      new Date(project.deadline) < now
    ) {
      newStatus = "Expired";
    }

    // Update database only if necessary.
    if (project.status !== newStatus) {
      await Project.updateOne(
        {
          _id: project._id,
        },
        {
          $set: {
            status: newStatus,
          },
        }
      );

      project.status = newStatus;
    }
  }

  // ==========================================
  // Apply Status Filter AFTER synchronization
  // ==========================================

  if (status && status !== "All") {
    projects = projects.filter(
      (project) =>
        project.status === status
    );
  }

  // ==========================================
  // Pagination AFTER Status Filter
  // ==========================================

  const totalProjects =
    projects.length;

  const paginatedProjects =
    projects.slice(
      skip,
      skip + limitNumber
    );

  // ==========================================
  // Response
  // ==========================================

  res.status(200).json({
    success: true,
    page: pageNumber,
    limit: limitNumber,
    totalPages: Math.ceil(
      totalProjects / limitNumber
    ),
    totalProjects,
    count: paginatedProjects.length,
    projects: paginatedProjects,
  });
});

// ==========================================
// Create Project
// ==========================================

const createProject = asyncHandler(
  async (req, res) => {
    const {
      title,
      description,
      category,
      goalAmount,
      deadline,
    } = req.body;

    // ==========================================
    // Role Check
    // ==========================================

    if (req.user.role !== "creator") {
      return res.status(403).json({
        success: false,
        message:
          "Only creators can create campaigns",
      });
    }

    // ==========================================
    // Image Check
    // ==========================================

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Campaign image is required",
      });
    }

    // ==========================================
    // Create Project
    // ==========================================

    const project = await Project.create({
      title,
      description,
      creator: req.user._id,
      category,
      image: req.file.path,
      goalAmount,
      deadline,
      pledgedAmount: 0,
      status: "Active",
    });

    res.status(201).json({
      success: true,
      message:
        "Campaign created successfully",
      project,
    });
  }
);

// ==========================================
// Get Single Project
// ==========================================

const getProjectById = asyncHandler(
  async (req, res) => {
    let project =
      await Project.findById(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    // ==========================================
    // Synchronize Status
    // ==========================================

    project =
      await syncProjectStatus(project);

    // ==========================================
    // Populate Creator
    // ==========================================

    project =
      await Project.findById(
        req.params.id
      ).populate(
        "creator",
        "name email"
      );

    res.status(200).json({
      success: true,
      project,
    });
  }
);

// ==========================================
// Update Project
// ==========================================

const updateProject = asyncHandler(
  async (req, res) => {
    const project =
      await Project.findById(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    // ==========================================
    // Ownership Check
    // ==========================================

    if (
      project.creator.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to update this campaign",
      });
    }

    // ==========================================
    // Allowed Fields
    // ==========================================

    const {
      title,
      description,
      category,
      goalAmount,
      deadline,
    } = req.body;

    const updateData = {
      title,
      description,
      category,
      goalAmount,
      deadline,
    };

    // ==========================================
    // New Image
    // ==========================================

    if (req.file) {
      updateData.image = req.file.path;
    }

    // ==========================================
    // Update
    // ==========================================

    let updatedProject =
      await Project.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    // ==========================================
    // Synchronize Status
    // ==========================================

    updatedProject =
      await syncProjectStatus(
        updatedProject
      );

    // ==========================================
    // Populate Creator
    // ==========================================

    updatedProject =
      await Project.findById(
        req.params.id
      ).populate(
        "creator",
        "name email"
      );

    res.status(200).json({
      success: true,
      message:
        "Campaign updated successfully",
      project: updatedProject,
    });
  }
);

// ==========================================
// Delete Project
// ==========================================

const deleteProject = asyncHandler(
  async (req, res) => {
    const project =
      await Project.findById(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    // ==========================================
    // Ownership Check
    // ==========================================

    if (
      project.creator.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to delete this campaign",
      });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Campaign deleted successfully",
    });
  }
);

// ==========================================
// Get My Projects
// ==========================================

const getMyProjects = asyncHandler(
  async (req, res) => {
    let projects =
      await Project.find({
        creator: req.user._id,
      })
        .populate(
          "creator",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

    // ==========================================
    // Synchronize Statuses
    // ==========================================

    for (const project of projects) {
      await syncProjectStatus(project);
    }

    // Fetch again so returned data has
    // the latest status.
    projects =
      await Project.find({
        creator: req.user._id,
      })
        .populate(
          "creator",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  }
);

// ==========================================
// Get Project Backers
// ==========================================

const getProjectBackers = asyncHandler(
  async (req, res) => {
    const project =
      await Project.findById(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    const donations =
      await Donation.find({
        project: req.params.id,
      })
        .populate(
          "backer",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

    // ==========================================
    // Unique Backers
    // ==========================================

    const uniqueBackerIds =
      new Set(
        donations
          .filter(
            (donation) =>
              donation.backer
          )
          .map(
            (donation) =>
              donation.backer._id.toString()
          )
      );

    res.status(200).json({
      success: true,
      count: uniqueBackerIds.size,
      donationsCount:
        donations.length,
      backers: donations,
    });
  }
);

// ==========================================
// Exports
// ==========================================

module.exports = {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  getMyProjects,
  getProjectBackers,
};