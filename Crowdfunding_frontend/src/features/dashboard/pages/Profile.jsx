import { useEffect, useState } from "react";
import axios from "axios";

import ProfileHero from "../components/ProfileHero";
import ProfileOverviewCard from "../components/ProfileOverviewCard";
import PersonalInfoCard from "../components/PersonalInfoCard";
import AccountStats from "../components/AccountStats";
import RecentActivity from "../components/RecentActivity";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      // Get Profile
      const profileResponse = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = profileResponse.data.user;

      let stats = {
        campaigns: 0,
        donations: 0,
        amountRaised: 0,
        successRate: "N/A",
      };

      // Creator Dashboard
      if (user.role === "creator") {
        const dashboardResponse = await axios.get(
          "http://localhost:5000/api/dashboard/creator",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const dashboard = dashboardResponse.data.dashboard;

        stats = {
          campaigns: dashboard.totalCampaigns,
          donations: dashboard.totalBackers,
          amountRaised: dashboard.totalRaised,
          successRate:
            dashboard.totalCampaigns > 0
              ? `${Math.round(
                (dashboard.fundedCampaigns /
                  dashboard.totalCampaigns) *
                100
              )}%`
              : "0%",
        };
      }

      // Backer Dashboard
      else {
        const dashboardResponse = await axios.get(
          "http://localhost:5000/api/dashboard/backer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const dashboard = dashboardResponse.data.dashboard;

        stats = {
          campaigns: dashboard.campaignsSupported,
          donations: dashboard.totalDonations,
          amountRaised: dashboard.totalAmountDonated,
          successRate: "N/A",
        };
      }

      setProfile({
        ...user,
        stats,
      });
    } catch (error) {
      console.error("Profile loading error:", error);
      setError(
        error.response?.data?.message ||
        "Failed to load profile."
      );
    } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchProfile();
}, []);

if (loading) {
  return (
    <div className="flex h-80 items-center justify-center text-xl">
      Loading...
    </div>
  );
}
if (error || !profile) {
  return (
    <div className="flex h-80 items-center justify-center">
      <div className="rounded-2xl bg-red-50 px-6 py-4 text-center text-red-600">
        {error || "Unable to load profile."}
      </div>
    </div>
  );
}

return (
  <div className="space-y-8">
    <ProfileHero profile={profile} />

    <div className="grid gap-8 xl:grid-cols-3">
      <div className="space-y-8 xl:col-span-2">
        <PersonalInfoCard profile={profile} />
        <RecentActivity />
      </div>

      <div className="space-y-8">
        <ProfileOverviewCard profile={profile} />
        <AccountStats stats={profile?.stats} />
      </div>
    </div>
  </div>
);
};

export default Profile;