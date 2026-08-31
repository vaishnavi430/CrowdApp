import { Routes, Route, Navigate } from "react-router-dom";

import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";

import DashboardHome from "./DashboardHome";
import MyCampaigns from "../../campaign/pages/MyCampaigns";
import Donations from "./Donations";
import Profile from "./Profile";
import Settings from "./Settings";

import { useSidebar } from "../../../contexts/SidebarContext";
import CreateCampaign from "../../campaign/pages/CreateCampaign";
import EditCampaign from "../../campaign/pages/EditCampaign";
import EditProfile from "../pages/EditProfile";
import ChangePassword from "../pages/ChangePassword";

const Dashboard = () => {
  const { sidebarOpen, closeSidebar } = useSidebar();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-100">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-indigo-300/20 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-40 h-[420px] w-[420px] rounded-full bg-violet-300/20 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-300/20 blur-[140px]" />

      {/* Sidebar */}
      <DashboardSidebar />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main Content */}
      <div className="relative min-h-screen lg:ml-72">
        {/* Header */}
        <div className="sticky top-0 z-30">
          <DashboardHeader />
        </div>

        {/* Page Content */}
        <main className="relative p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Routes>
              {/* Dashboard Home */}
              <Route index element={<DashboardHome />} />

              {/* Campaigns */}
              <Route
                path="campaigns"
                element={<MyCampaigns />}
              />

              <Route
                path="create-campaign"
                element={<CreateCampaign />}
              />

              <Route
                path="edit-campaign/:id"
                element={<EditCampaign />}
              />

              {/* Donations */}
              <Route
                path="donations"
                element={<Donations />}
              />

              <Route
                path="profile"
                element={<Profile />}
              />

              <Route
                path="edit-profile"
                element={<EditProfile />}
              />

              <Route
                path="change-password"
                element={<ChangePassword />}
              />

              <Route
                path="settings"
                element={<Settings />}
              />

              {/* Redirect Unknown Routes */}
              <Route
                path="*"
                element={<Navigate to="/dashboard" replace />}
              />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;