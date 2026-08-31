// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// ===============================
// Middleware
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// Routes
// ===============================

// Authentication
// Uses the unified User model.
app.use("/api/auth", require("./routes/authRoutes"));

// Projects / Campaigns
// Project.creator references User.
app.use("/api/projects", require("./routes/projectRoutes"));

// Donations
// Donation.backer references User.
app.use("/api/donations", require("./routes/donationRoutes"));

// Rewards
app.use("/api/rewards", require("./routes/rewardRoutes"));

// User profile and account
app.use("/api/users", require("./routes/userRoutes"));

// Dashboard
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// ===============================
// Error Handling
// ===============================

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorMiddleware");

app.use(notFound);
app.use(errorHandler);

// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  if (!process.env.JWT_SECRET) {
    console.warn(
      "Warning: JWT_SECRET is not set in environment variables"
    );
  } else {
    console.log(
      "JWT_SECRET is set and loaded successfully"
    );
  }
});