import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import api from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";

import StatsGrid from "../components/StatsGrid";
import RevenueChart from "../components/RevenueChart";
import RecentCampaigns from "../components/RecentCampaigns";
import QuickActions from "../components/QuickActions";

const DashboardHome = () => {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ==========================================
  // Fetch Dashboard
  // ==========================================

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!user?.role) {
        return;
      }

      try {
        setLoading(true);
        setError("");

        const endpoint =
          user.role === "creator"
            ? "/dashboard/creator"
            : "/dashboard/backer";

        const response =
          await api.get(endpoint);

        const data =
          response.data.dashboard;

        setDashboard(data);

        // ======================================
        // Creator Data
        // ======================================

        if (user.role === "creator") {
          // We still need campaign objects
          // because RecentCampaigns needs them.

          try {
            const campaignResponse =
              await api.get(
                "/projects/my-projects"
              );

            setCampaigns(
              campaignResponse.data.projects ||
                []
            );
          } catch (campaignError) {
            console.error(
              "Failed to load campaigns:",
              campaignError
            );

            setCampaigns([]);
          }

          setDonations(
            data?.recentDonations || []
          );
        }

        // ======================================
        // Backer Data
        // ======================================

        if (user.role === "backer") {
          setCampaigns([]);
          setDonations(
            data?.recentDonations || []
          );
        }
      } catch (error) {
        console.error(
          "Failed to load dashboard:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [user?.role]);

  // ==========================================
  // Creator Statistics
  // ==========================================

  const creatorStats = useMemo(() => {
    if (user?.role !== "creator") {
      return {
        totalRaised: 0,
        totalGoal: 0,
        fundedCampaigns: 0,
        successRate: 0,
        backers: 0,
      };
    }

    const totalRaised =
      Number(dashboard?.totalRaised || 0);

    const totalGoal =
      Number(dashboard?.totalGoal || 0);

    const totalCampaigns =
      Number(
        dashboard?.totalCampaigns || 0
      );

    const fundedCampaigns =
      Number(
        dashboard?.fundedCampaigns || 0
      );

    const successRate =
      totalCampaigns > 0
        ? Math.round(
            (fundedCampaigns /
              totalCampaigns) *
              100
          )
        : 0;

    return {
      totalRaised,
      totalGoal,
      fundedCampaigns,
      successRate,
      backers: Number(
        dashboard?.totalBackers || 0
      ),
    };
  }, [dashboard, user?.role]);

  // ==========================================
  // Backer Statistics
  // ==========================================

  const backerStats = useMemo(() => {
    return {
      totalDonations: Number(
        dashboard?.totalDonations || 0
      ),

      totalAmountDonated: Number(
        dashboard?.totalAmountDonated || 0
      ),

      campaignsSupported: Number(
        dashboard?.campaignsSupported || 0
      ),
    };
  }, [dashboard]);

  // ==========================================
  // Creator Funding Percentage
  // ==========================================

  const fundingPercentage = useMemo(() => {
    if (
      !creatorStats.totalGoal
    ) {
      return 0;
    }

    return Math.min(
      Math.round(
        (creatorStats.totalRaised /
          creatorStats.totalGoal) *
          100
      ),
      100
    );
  }, [creatorStats]);

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

          <p className="mt-4 font-semibold text-slate-600">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // Error
  // ==========================================

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="w-full max-w-lg rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <h2 className="text-xl font-bold text-red-700">
            Unable to Load Dashboard
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // BACKER DASHBOARD
  // ==========================================

  if (user?.role === "backer") {
    return (
      <div className="space-y-8">
        {/* Welcome */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 text-white shadow-2xl"
        >
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
              <Sparkles size={16} />

              Backer Dashboard
            </div>

            <h1 className="text-4xl font-bold">
              Welcome Back 👋
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-indigo-100">
              Track your donations, discover
              campaigns, and support projects
              that matter to you.
            </p>
          </div>
        </motion.div>

        {/* Backer Stats */}

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
            <p className="text-sm text-slate-500">
              Total Donated
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              ₹
              {backerStats.totalAmountDonated.toLocaleString()}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
            <p className="text-sm text-slate-500">
              Donations
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {backerStats.totalDonations.toLocaleString()}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
            <p className="text-sm text-slate-500">
              Campaigns Supported
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {backerStats.campaignsSupported.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* Recent Donations */}

        <div className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-slate-900">
            Recent Donations
          </h2>

          {donations.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-slate-50 p-8 text-center">
              <p className="font-semibold text-slate-600">
                No donations yet
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Your recent donations will appear
                here.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {donations.map(
                (donation) => (
                  <div
                    key={donation._id}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">
                        {donation.project
                          ?.title ||
                          "Campaign"}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {donation.createdAt
                          ? new Date(
                              donation.createdAt
                            ).toLocaleDateString()
                          : ""}
                      </p>
                    </div>

                    <p className="font-bold text-emerald-600">
                      ₹
                      {Number(
                        donation.amount || 0
                      ).toLocaleString()}
                    </p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // CREATOR DASHBOARD
  // ==========================================

  return (
    <div className="space-y-8">
      {/* ==========================================
          Welcome Banner
      ========================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 text-white shadow-2xl"
      >
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          {/* Welcome */}

          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
              <Sparkles size={16} />

              Dashboard Overview
            </div>

            <h1 className="text-4xl font-bold">
              Welcome Back 👋
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-indigo-100">
              Track your crowdfunding campaigns,
              monitor donations, analyze performance,
              and grow your community—all from one
              centralized dashboard.
            </p>
          </div>

          {/* Funding Summary */}

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md lg:max-w-sm">
            <p className="text-sm uppercase tracking-wider text-indigo-100">
              Overall Funding
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {fundingPercentage}% Funded
            </h2>

            <p className="mt-3 text-indigo-100">
              ₹
              {creatorStats.totalRaised.toLocaleString()}{" "}
              raised from ₹
              {creatorStats.totalGoal.toLocaleString()}{" "}
              across your campaigns.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ==========================================
          Stats
      ========================================== */}

      <StatsGrid
        totalRaised={
          creatorStats.totalRaised
        }
        campaigns={Number(
          dashboard?.totalCampaigns || 0
        )}
        backers={creatorStats.backers}
        successRate={
          creatorStats.successRate
        }
      />

      {/* ==========================================
          Analytics
      ========================================== */}

      <RevenueChart
        donations={donations}
        totalRaised={
          creatorStats.totalRaised
        }
        activeCampaigns={Number(
          dashboard?.activeCampaigns || 0
        )}
      />

      {/* ==========================================
          Bottom Section
      ========================================== */}

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="lg:col-span-2"
        >
          <RecentCampaigns
            campaigns={campaigns}
          />
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          <QuickActions />
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;