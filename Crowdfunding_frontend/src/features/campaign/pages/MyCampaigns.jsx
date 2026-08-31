import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

import api from "../../../services/api";

import CampaignToolbar from "../components/CampaignToolbar";
import CampaignTable from "../components/CampaignTable";

const MyCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // ==========================================
  // Fetch My Campaigns
  // ==========================================

  const fetchMyCampaigns = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/projects/my-projects"
      );

      setCampaigns(
        response.data.projects || []
      );
    } catch (error) {
      console.error(
        "Error fetching campaigns:",
        error
      );

      setCampaigns([]);

      setError(
        error.response?.data?.message ||
          "Unable to load your campaigns."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Initial Load
  // ==========================================

  useEffect(() => {
    fetchMyCampaigns();
  }, []);

  // ==========================================
  // Search + Status Filter
  // ==========================================

  const filteredCampaigns = useMemo(() => {
    const searchText =
      search.trim().toLowerCase();

    return campaigns.filter((campaign) => {
      const title =
        campaign.title?.toLowerCase() || "";

      const matchesSearch =
        title.includes(searchText);

      const matchesStatus =
        status === "All" ||
        campaign.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [campaigns, search, status]);

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

          <p className="mt-4 text-slate-600">
            Loading your campaigns...
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
            Unable to Load Campaigns
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <button
            onClick={fetchMyCampaigns}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="space-y-8">
      <CampaignToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        totalCampaigns={
          campaigns.length
        }
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <CampaignTable
          campaigns={filteredCampaigns}
          refreshCampaigns={
            fetchMyCampaigns
          }
        />
      </motion.div>

      {/* Empty Search / Filter Result */}
      {filteredCampaigns.length === 0 &&
        campaigns.length > 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h3 className="text-xl font-bold text-slate-800">
              No Campaigns Found
            </h3>

            <p className="mt-2 text-slate-500">
              Try changing your search or
              status filter.
            </p>
          </div>
        )}
    </div>
  );
};

export default MyCampaigns;