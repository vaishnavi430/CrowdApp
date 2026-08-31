import { motion } from "framer-motion";
import {
  Eye,
  Receipt,
  Calendar,
  CreditCard,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import DonationStatusBadge from "./DonationStatusBadge";

const DonationTableRow = ({
  donation,
}) => {
  const navigate = useNavigate();

  const campaign = donation?.project;

  // ==========================================
  // View Campaign
  // ==========================================

  const handleViewCampaign = () => {
    if (!campaign?._id) {
      alert(
        "Campaign information is unavailable."
      );

      return;
    }

    navigate(
      `/campaigns/${campaign._id}`
    );
  };

  // ==========================================
  // Generate Receipt
  // ==========================================

  const handleReceipt = () => {
    const donationDate =
      donation?.donatedAt ||
      donation?.createdAt;

    const receiptContent = `
DONATION RECEIPT
==============================

Campaign:
${campaign?.title || "Unknown Campaign"}

Category:
${campaign?.category || "N/A"}

Amount:
₹${Number(
      donation?.amount || 0
    ).toLocaleString()}

Payment Status:
${donation?.paymentStatus || "N/A"}

Donation Date:
${
  donationDate
    ? new Date(
        donationDate
      ).toLocaleDateString()
    : "N/A"
}

Transaction ID:
${
  donation?.transactionId ||
  "Not available"
}

Thank you for supporting this campaign.
`;

    const blob = new Blob(
      [receiptContent.trim()],
      {
        type: "text/plain;charset=utf-8",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = `donation-receipt-${
      donation?._id || "receipt"
    }.txt`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // ==========================================
  // Safe Image
  // ==========================================

  const imageUrl =
    typeof campaign?.image ===
      "string" &&
    campaign.image.trim() !== ""
      ? campaign.image
      : "https://placehold.co/600x400?text=No+Image";

  // ==========================================
  // Safe Date
  // ==========================================

  const donationDate =
    donation?.donatedAt ||
    donation?.createdAt;

  return (
    <motion.tr
      layout
      whileHover={{
        backgroundColor: "#F8FAFC",
      }}
      className="border-b border-slate-100 transition-all duration-300 last:border-0"
    >
      {/* Donor */}

      <td className="w-[35%] px-8 py-6 align-top">
        <div className="flex items-center gap-4">
          <img
            src={imageUrl}
            alt={
              campaign?.title ||
              "Campaign"
            }
            className="h-16 w-16 rounded-2xl object-cover shadow-md"
            onError={(event) => {
              event.currentTarget.src =
                "https://placehold.co/600x400?text=No+Image";
            }}
          />

          <div>
            <h3 className="text-lg font-bold text-slate-900">
              You
            </h3>

            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <CreditCard size={15} />

              Online Payment
            </div>
          </div>
        </div>
      </td>

      {/* Campaign */}

      <td className="w-[25%] px-8 py-6 align-top">
        <h3 className="font-semibold text-slate-800">
          {campaign?.title ||
            "Unknown Campaign"}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          <Calendar size={15} />

          {donationDate
            ? new Date(
                donationDate
              ).toLocaleDateString()
            : "N/A"}
        </div>
      </td>

      {/* Amount */}

      <td className="w-[15%] px-8 py-6 align-middle">
        <div>
          <p className="text-2xl font-bold text-emerald-600">
            ₹
            {Number(
              donation?.amount || 0
            ).toLocaleString()}
          </p>

          <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
            Donation
          </p>
        </div>
      </td>

      {/* Status */}

      <td className="w-[12%] px-8 py-6 align-middle">
        <DonationStatusBadge
          status={
            donation?.paymentStatus
          }
        />
      </td>

      {/* Actions */}

      <td className="w-[13%] px-8 py-6 align-middle">
        <div className="flex items-center gap-3">
          {/* View */}

          <button
            type="button"
            onClick={
              handleViewCampaign
            }
            title="View campaign"
            aria-label="View campaign"
            className="rounded-xl border border-slate-200 bg-white p-2.5 transition-all hover:-translate-y-0.5 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
          >
            <Eye size={18} />
          </button>

          {/* Receipt */}

          <button
            type="button"
            onClick={handleReceipt}
            title="Download receipt"
            aria-label="Download donation receipt"
            className="rounded-xl border border-slate-200 bg-white p-2.5 transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
          >
            <Receipt size={18} />
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

export default DonationTableRow;