import { motion } from "framer-motion";
import {
  CheckCircle,
  Mail,
  Users,
  Award,
} from "lucide-react";

const CampaignCreator = ({
  creator,
  campaign,
}) => {
  // ==========================================
  // Creator Information
  // ==========================================

  const creatorName =
    creator?.name?.trim() || "Campaign Creator";

  const creatorEmail =
    creator?.email?.trim() || "";

  const creatorInitial =
    creatorName.charAt(0).toUpperCase();

  // ==========================================
  // Contact Creator
  // ==========================================

  const handleContactCreator = () => {
    if (!creatorEmail) {
      return;
    }

    window.location.href = `mailto:${creatorEmail}?subject=${encodeURIComponent(
      `Regarding your campaign: ${
        campaign?.title || "CrowdApp Campaign"
      }`
    )}`;
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      viewport={{
        once: true,
      }}
      className="overflow-hidden rounded-3xl border border-white/40 bg-white/80 shadow-xl backdrop-blur-xl"
    >

      {/* ==========================================
          Header
      ========================================== */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white">

        <h2 className="text-2xl font-bold">
          Campaign Creator
        </h2>

        <p className="mt-2 text-sm text-indigo-100">
          Creator of this crowdfunding campaign.
        </p>

      </div>

      {/* ==========================================
          Content
      ========================================== */}
      <div className="p-6">

        {/* Creator Profile */}
        <div className="flex items-center gap-4">

          {/* Avatar */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-indigo-100 bg-gradient-to-br from-indigo-500 to-violet-600 text-2xl font-bold text-white">
            {creatorInitial}
          </div>

          {/* Creator Details */}
          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <h3 className="truncate text-xl font-bold text-slate-900">
                {creatorName}
              </h3>

              <CheckCircle
                size={20}
                className="shrink-0 text-blue-500"
                aria-label="Verified creator"
              />

            </div>

            <p className="mt-1 text-sm text-slate-500">
              Campaign Creator
            </p>

            {creatorEmail && (
              <p className="mt-1 truncate text-sm text-slate-400">
                {creatorEmail}
              </p>
            )}

          </div>

        </div>

        {/* ==========================================
            Creator Stats
        ========================================== */}
        <div className="mt-8 grid grid-cols-2 gap-4">

          {/* Campaign */}
          <div className="rounded-2xl bg-slate-50 p-4 text-center">

            <Users
              size={22}
              className="mx-auto text-indigo-600"
            />

            <h3 className="mt-2 text-xl font-bold text-slate-900">
              1
            </h3>

            <p className="text-sm text-slate-500">
              Current Campaign
            </p>

          </div>

          {/* Verification */}
          <div className="rounded-2xl bg-slate-50 p-4 text-center">

            <Award
              size={22}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-2 text-xl font-bold text-slate-900">
              Verified
            </h3>

            <p className="text-sm text-slate-500">
              Account
            </p>

          </div>

        </div>

        {/* ==========================================
            Contact Creator
        ========================================== */}
        <button
          type="button"
          onClick={handleContactCreator}
          disabled={!creatorEmail}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
        >

          <Mail size={18} />

          {creatorEmail
            ? "Contact Creator"
            : "Email Not Available"}

        </button>

      </div>

    </motion.div>
  );
};

export default CampaignCreator;