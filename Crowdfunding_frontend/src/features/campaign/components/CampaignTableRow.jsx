import { motion } from "framer-motion";
import {
  Eye,
  Pencil,
  Trash2,
  Calendar,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import CampaignStatusBadge from "./CampaignStatusBadge";
import CampaignProgress from "./CampaignProgress";
import api from "../../../services/api";

const CampaignTableRow = ({
  campaign,
  refreshCampaigns,
}) => {
  const navigate = useNavigate();

  const campaignId = campaign?._id;

  // ==========================================
  // View Campaign
  // ==========================================

  const handleView = () => {
    if (!campaignId) {
      console.error(
        "Cannot open campaign: Campaign ID is missing.",
        campaign
      );
      return;
    }

    navigate(`/campaigns/${campaignId}`);
  };

  // ==========================================
  // Edit Campaign
  // ==========================================

  const handleEdit = () => {
    if (!campaignId) {
      console.error(
        "Cannot edit campaign: Campaign ID is missing.",
        campaign
      );
      return;
    }

    navigate(
      `/dashboard/edit-campaign/${campaignId}`
    );
  };

  // ==========================================
  // Delete Campaign
  // ==========================================

  const handleDelete = async () => {
    if (!campaignId) {
      console.error(
        "Cannot delete campaign: Campaign ID is missing.",
        campaign
      );
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this campaign?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(
        `/projects/${campaignId}`
      );

      alert(
        "Campaign deleted successfully!"
      );

      if (refreshCampaigns) {
        await refreshCampaigns();
      }
    } catch (error) {
      console.error(
        "Failed to delete campaign:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete campaign."
      );
    }
  };

  // ==========================================
  // Safe Image URL
  // ==========================================

  const imageUrl =
    typeof campaign?.image === "string" &&
    campaign.image.trim() !== ""
      ? campaign.image
      : "https://placehold.co/600x400?text=No+Image";

  // ==========================================
  // Render
  // ==========================================

  return (
    <motion.tr
      layout
      whileHover={{
        backgroundColor: "#F8FAFC",
      }}
      className="border-b border-slate-100 transition-all duration-300 last:border-0"
    >
      {/* ==========================================
          Campaign
      ========================================== */}

      <td className="w-[42%] px-8 py-6 align-top">
        <div className="flex items-start gap-5">
          <img
            src={imageUrl}
            alt={
              campaign?.title ||
              "Campaign"
            }
            className="h-20 w-20 flex-shrink-0 rounded-2xl object-cover shadow-md"
            onError={(event) => {
              event.currentTarget.src =
                "https://placehold.co/600x400?text=No+Image";
            }}
          />

          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold leading-snug text-slate-900">
              {campaign?.title ||
                "Untitled Campaign"}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {campaign?.category ||
                "Uncategorized"}
            </p>

            <div className="mt-4 flex flex-col gap-2 text-xs text-slate-400 2xl:flex-row 2xl:gap-6">
              {/* Deadline */}
              <div className="flex items-center gap-1">
                <Calendar size={14} />

                <span>
                  Ends{" "}
                  {campaign?.deadline
                    ? new Date(
                        campaign.deadline
                      ).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>

              {/* Creator */}
              <div className="flex items-center gap-1">
                <Users size={14} />

                <span>
                  Creator Campaign
                </span>
              </div>
            </div>
          </div>
        </div>
      </td>

      {/* ==========================================
          Progress
      ========================================== */}

      <td className="w-[30%] px-8 py-6 align-top">
        <CampaignProgress
          raised={
            campaign?.pledgedAmount || 0
          }
          goal={
            campaign?.goalAmount || 0
          }
        />
      </td>

      {/* ==========================================
          Status
      ========================================== */}

      <td className="w-[14%] px-8 py-6 align-middle">
        <CampaignStatusBadge
          status={campaign?.status}
        />
      </td>

      {/* ==========================================
          Actions
      ========================================== */}

      <td className="w-[14%] px-8 py-6 align-middle">
        <div className="flex items-center gap-3">
          {/* View */}
          <button
            type="button"
            onClick={handleView}
            title="View campaign"
            aria-label={`View ${
              campaign?.title ||
              "campaign"
            }`}
            className="rounded-xl border border-slate-200 bg-white p-2.5 transition-all hover:-translate-y-0.5 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Eye size={18} />
          </button>

          {/* Edit */}
          <button
            type="button"
            onClick={handleEdit}
            title="Edit campaign"
            aria-label={`Edit ${
              campaign?.title ||
              "campaign"
            }`}
            className="rounded-xl border border-slate-200 bg-white p-2.5 transition-all hover:-translate-y-0.5 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Pencil size={18} />
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={handleDelete}
            title="Delete campaign"
            aria-label={`Delete ${
              campaign?.title ||
              "campaign"
            }`}
            className="rounded-xl border border-slate-200 bg-white p-2.5 transition-all hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

export default CampaignTableRow;