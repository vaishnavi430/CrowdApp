import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CampaignProgress from "./CampaignProgress";
import CampaignStatusBadge from "./CampaignStatusBadge";
import api from "../../../services/api";

const CampaignCard = ({
  campaign,
  showManagementActions = false,
  onDelete,
}) => {
  const navigate = useNavigate();

  const campaignId = campaign?._id;

  const handleOpenCampaign = () => {
    if (!campaignId) {
      console.error(
        "Cannot open campaign: campaign ID is missing.",
        campaign
      );
      return;
    }

    navigate(`/campaigns/${campaignId}`);
  };

  const handleDelete = async (event) => {
    event.stopPropagation();

    if (!campaignId) {
      return;
    }

    if (
      !window.confirm(
        "Are you sure you want to delete this campaign?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/projects/${campaignId}`);

      alert("Campaign deleted successfully.");

      if (onDelete) {
        onDelete(campaignId);
      } else {
        window.location.reload();
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

  const handleEdit = (event) => {
    event.stopPropagation();

    if (!campaignId) {
      return;
    }

    navigate(
      `/dashboard/edit-campaign/${campaignId}`
    );
  };

  const handleView = (event) => {
    event.stopPropagation();
    handleOpenCampaign();
  };

  // Safe Image URL
  const imageUrl =
    typeof campaign?.image === "string" &&
    campaign.image.trim() !== ""
      ? campaign.image
      : "https://placehold.co/600x400?text=No+Image";

  return (
    <article
      onClick={handleOpenCampaign}
      onKeyDown={(event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          handleOpenCampaign();
        }
      }}
      role="link"
      tabIndex={0}
      className="cursor-pointer rounded-2xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {/* Campaign Image */}
      <img
        src={imageUrl}
        alt={campaign?.title || "Campaign"}
        className="h-48 w-full rounded-xl object-cover"
        onError={(event) => {
          event.currentTarget.src =
            "https://placehold.co/600x400?text=No+Image";
        }}
      />

      {/* Campaign Information */}
      <div className="mt-4">
        <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">
          {campaign?.title || "Untitled Campaign"}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {campaign?.category || "Uncategorized"}
        </p>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <CampaignProgress
          raised={campaign?.pledgedAmount || 0}
          goal={campaign?.goalAmount || 0}
        />
      </div>

      {/* Bottom Section */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <CampaignStatusBadge
          status={campaign?.status}
        />

        <div className="flex gap-2">
          {/* View Campaign */}
          <button
            type="button"
            onClick={handleView}
            title="View campaign"
            aria-label={`View ${campaign?.title || "campaign"}`}
            className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100"
          >
            <Eye size={18} />
          </button>

          {/* Creator Management Actions */}
          {showManagementActions && (
            <>
              {/* Edit */}
              <button
                type="button"
                onClick={handleEdit}
                title="Edit campaign"
                aria-label={`Edit ${campaign?.title || "campaign"}`}
                className="rounded-lg border border-slate-200 p-2 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                <Pencil size={18} />
              </button>

              {/* Delete */}
              <button
                type="button"
                onClick={handleDelete}
                title="Delete campaign"
                aria-label={`Delete ${campaign?.title || "campaign"}`}
                className="rounded-lg border border-slate-200 p-2 transition hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default CampaignCard;