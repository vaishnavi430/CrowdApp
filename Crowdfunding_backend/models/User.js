const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["creator", "backer"],
      default: "backer",
    },

    avatar: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    // ==========================================
    // User Settings
    // ==========================================

    settings: {
      // Notifications
      notifications: {
        email: {
          type: Boolean,
          default: true,
        },

        push: {
          type: Boolean,
          default: true,
        },

        campaignUpdates: {
          type: Boolean,
          default: true,
        },

        donations: {
          type: Boolean,
          default: true,
        },

        marketing: {
          type: Boolean,
          default: false,
        },
      },

      // Security
      security: {
        twoFactor: {
          type: Boolean,
          default: false,
        },

        loginAlerts: {
          type: Boolean,
          default: true,
        },

        sessionTimeout: {
          type: String,
          enum: [
            "15 Minutes",
            "30 Minutes",
            "1 Hour",
            "2 Hours",
          ],
          default: "30 Minutes",
        },
      },

      // Appearance
      appearance: {
        theme: {
          type: String,
          enum: ["Light", "Dark", "System"],
          default: "Light",
        },

        language: {
          type: String,
          enum: ["English", "Hindi", "French", "German"],
          default: "English",
        },

        density: {
          type: String,
          enum: ["Comfortable", "Compact"],
          default: "Comfortable",
        },

        accent: {
          type: String,
          enum: [
            "Indigo",
            "Emerald",
            "Rose",
            "Amber",
            "Sky",
          ],
          default: "Indigo",
        },
      },

      // Privacy
      privacy: {
        publicProfile: {
          type: Boolean,
          default: true,
        },

        showEmail: {
          type: Boolean,
          default: false,
        },

        showPhone: {
          type: Boolean,
          default: false,
        },

        dataSharing: {
          type: Boolean,
          default: false,
        },

        profileVisibility: {
          type: String,
          enum: [
            "Public",
            "Supporters Only",
            "Private",
          ],
          default: "Public",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// Automatically hash password before saving
// ==========================================

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );

  next();
});

// ==========================================
// Compare entered password with stored password
// ==========================================

userSchema.methods.matchPassword = async function (
  enteredPassword
) {
  return await bcrypt.compare(
    enteredPassword,
    this.password
  );
};

module.exports = mongoose.model(
  "User",
  userSchema
);