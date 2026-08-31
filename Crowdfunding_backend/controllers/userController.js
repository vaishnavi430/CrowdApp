const User = require("../models/User");
const Project = require("../models/Project");
const Donation = require("../models/Donation");

const asyncHandler = require("../utils/asyncHandler");

// ==========================================
// Get My Profile
// ==========================================

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password"
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// ==========================================
// Update My Profile
// ==========================================

const updateProfile = asyncHandler(async (req, res) => {
  const {
    name,
    phone,
    bio,
    address,
    avatar,
  } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (name !== undefined) {
    user.name = name;
  }

  if (phone !== undefined) {
    user.phone = phone;
  }

  if (bio !== undefined) {
    user.bio = bio;
  }

  if (address !== undefined) {
    user.address = address;
  }

  if (avatar !== undefined) {
    user.avatar = avatar;
  }

  await user.save();

  const updatedUser = await User.findById(
    req.user._id
  ).select("-password");

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser,
  });
});

// ==========================================
// Change Password
// ==========================================

const changePassword = asyncHandler(async (req, res) => {
  const {
    currentPassword,
    newPassword,
  } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message:
        "Current password and new password are required",
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message:
        "New password must be at least 6 characters",
    });
  }

  const user = await User.findById(
    req.user._id
  ).select("+password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const isMatch = await user.matchPassword(
    currentPassword
  );

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Current password is incorrect",
    });
  }

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

// ==========================================
// Get Settings
// ==========================================

const getSettings = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "settings"
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    settings: user.settings,
  });
});

// ==========================================
// Update Settings
// ==========================================

const updateSettings = asyncHandler(async (req, res) => {
  const {
    notifications,
    security,
    appearance,
    privacy,
  } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // ==========================================
  // Notifications
  // ==========================================

  if (notifications) {
    if (notifications.email !== undefined) {
      user.settings.notifications.email =
        notifications.email;
    }

    if (notifications.push !== undefined) {
      user.settings.notifications.push =
        notifications.push;
    }

    if (
      notifications.campaignUpdates !== undefined
    ) {
      user.settings.notifications.campaignUpdates =
        notifications.campaignUpdates;
    }

    if (notifications.donations !== undefined) {
      user.settings.notifications.donations =
        notifications.donations;
    }

    if (notifications.marketing !== undefined) {
      user.settings.notifications.marketing =
        notifications.marketing;
    }
  }

  // ==========================================
  // Security
  // ==========================================

  if (security) {
    if (security.twoFactor !== undefined) {
      user.settings.security.twoFactor =
        security.twoFactor;
    }

    if (security.loginAlerts !== undefined) {
      user.settings.security.loginAlerts =
        security.loginAlerts;
    }

    if (security.sessionTimeout !== undefined) {
      const allowedTimeouts = [
        "15 Minutes",
        "30 Minutes",
        "1 Hour",
        "2 Hours",
      ];

      if (
        allowedTimeouts.includes(
          security.sessionTimeout
        )
      ) {
        user.settings.security.sessionTimeout =
          security.sessionTimeout;
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid session timeout value",
        });
      }
    }
  }

  // ==========================================
  // Appearance
  // ==========================================

  if (appearance) {
    if (appearance.theme !== undefined) {
      const allowedThemes = [
        "Light",
        "Dark",
        "System",
      ];

      if (
        allowedThemes.includes(
          appearance.theme
        )
      ) {
        user.settings.appearance.theme =
          appearance.theme;
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid theme value",
        });
      }
    }

    if (appearance.language !== undefined) {
      const allowedLanguages = [
        "English",
        "Hindi",
        "French",
        "German",
      ];

      if (
        allowedLanguages.includes(
          appearance.language
        )
      ) {
        user.settings.appearance.language =
          appearance.language;
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid language value",
        });
      }
    }

    if (appearance.density !== undefined) {
      const allowedDensity = [
        "Comfortable",
        "Compact",
      ];

      if (
        allowedDensity.includes(
          appearance.density
        )
      ) {
        user.settings.appearance.density =
          appearance.density;
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid density value",
        });
      }
    }

    if (appearance.accent !== undefined) {
      const allowedAccents = [
        "Indigo",
        "Emerald",
        "Rose",
        "Amber",
        "Sky",
      ];

      if (
        allowedAccents.includes(
          appearance.accent
        )
      ) {
        user.settings.appearance.accent =
          appearance.accent;
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid accent color",
        });
      }
    }
  }

  // ==========================================
  // Privacy
  // ==========================================

  if (privacy) {
    if (privacy.publicProfile !== undefined) {
      user.settings.privacy.publicProfile =
        privacy.publicProfile;
    }

    if (privacy.showEmail !== undefined) {
      user.settings.privacy.showEmail =
        privacy.showEmail;
    }

    if (privacy.showPhone !== undefined) {
      user.settings.privacy.showPhone =
        privacy.showPhone;
    }

    if (privacy.dataSharing !== undefined) {
      user.settings.privacy.dataSharing =
        privacy.dataSharing;
    }

    if (
      privacy.profileVisibility !== undefined
    ) {
      const allowedVisibility = [
        "Public",
        "Supporters Only",
        "Private",
      ];

      if (
        allowedVisibility.includes(
          privacy.profileVisibility
        )
      ) {
        user.settings.privacy.profileVisibility =
          privacy.profileVisibility;
      } else {
        return res.status(400).json({
          success: false,
          message:
            "Invalid profile visibility value",
        });
      }
    }
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Settings updated successfully",
    settings: user.settings,
  });
});

// ==========================================
// Export User Data
// ==========================================

const exportUserData = asyncHandler(
  async (req, res) => {
    const user = await User.findById(
      req.user._id
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ==========================================
    // Get user's campaigns
    // ==========================================

    const projects = await Project.find({
      creator: req.user._id,
    }).select("-__v");

    // ==========================================
    // Get user's donations
    // ==========================================

    const donations = await Donation.find({
      backer: req.user._id,
    })
      .populate(
        "project",
        "title category goalAmount pledgedAmount status"
      )
      .select("-__v");

    // ==========================================
    // Prepare Export Data
    // ==========================================

    const exportData = {
      exportedAt: new Date(),

      profile: user,

      campaigns: projects,

      donations: donations,
    };

    res.status(200).json({
      success: true,
      message: "User data exported successfully",
      data: exportData,
    });
  }
);

// ==========================================
// Delete Account
// ==========================================

const deleteAccount = asyncHandler(
  async (req, res) => {
    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ==========================================
    // Delete user's donations
    // ==========================================

    await Donation.deleteMany({
      backer: req.user._id,
    });

    // ==========================================
    // Find user's campaigns
    // ==========================================

    const projects = await Project.find({
      creator: req.user._id,
    }).select("_id");

    const projectIds = projects.map(
      (project) => project._id
    );

    // ==========================================
    // Delete donations made to user's campaigns
    // ==========================================

    if (projectIds.length > 0) {
      await Donation.deleteMany({
        project: {
          $in: projectIds,
        },
      });

      await Project.deleteMany({
        creator: req.user._id,
      });
    }

    // ==========================================
    // Delete User
    // ==========================================

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  }
);

// ==========================================
// Export
// ==========================================

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  getSettings,
  updateSettings,
  exportUserData,
  deleteAccount,
};