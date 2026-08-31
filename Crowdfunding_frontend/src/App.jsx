import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

import MainLayout from "./layouts/MainLayout";
import Campaigns from "./features/campaign/pages/Campaigns";
import CampaignDetails from "./features/campaign/pages/CampaignDetails";
import AuthLayout from "./layouts/AuthLayout";

import Dashboard from "./features/dashboard/pages/Dashboard";
import ChangePassword from "./features/dashboard/pages/ChangePassword";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* ========================================== */}
      {/* Public Routes */}
      {/* ========================================== */}

      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />

      <Route
        path="/contact"
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />

      {/* ========================================== */}
      {/* Authentication */}
      {/* ========================================== */}

      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />

      <Route
        path="/signup"
        element={
          <AuthLayout>
            <SignUp />
          </AuthLayout>
        }
      />

      {/* ========================================== */}
      {/* Campaign Routes */}
      {/* ========================================== */}

      <Route
        path="/campaigns"
        element={
          <MainLayout>
            <Campaigns />
          </MainLayout>
        }
      />

      <Route
        path="/campaigns/:id"
        element={
          <MainLayout>
            <CampaignDetails />
          </MainLayout>
        }
      />

      {/* ========================================== */}
      {/* Protected Routes */}
      {/* ========================================== */}

      <Route element={<ProtectedRoute />}>

        {/* Dashboard */}
        <Route
          path="/dashboard/*"
          element={<Dashboard />}
        />

        {/* Change Password */}
        <Route
          path="/dashboard/change-password"
          element={<ChangePassword />}
        />

      </Route>
    </Routes>
  );
}

export default App;