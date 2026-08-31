import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";

import CampaignCard from "./CampaignCard";
import CampaignGridSkeleton from "./CampaignGridSkeleton";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const CampaignGrid = ({
  campaigns = [],
  loading = false,
  error = "",
  page = 1,
  totalPages = 1,
  setPage,
  onRetry,
}) => {
  if (loading) {
    return <CampaignGridSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-100 bg-white p-10 text-center shadow-xl">

        <h3 className="text-2xl font-bold text-slate-900">
          Unable to load campaigns
        </h3>

        <p className="mx-auto mt-3 max-w-lg text-slate-500">
          {error}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          <RefreshCw size={18} />
          Try Again
        </button>

      </div>
    );
  }

  if (!campaigns.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xl">

        <h3 className="text-2xl font-bold text-slate-900">
          No campaigns found
        </h3>

        <p className="mx-auto mt-3 max-w-lg text-slate-500">
          We couldn't find any campaigns matching your current search or filters.
        </p>

      </div>
    );
  }

  return (
    <div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
      >
        {campaigns.map((campaign) => (
          <motion.div
            key={campaign._id}
            variants={itemVariants}
            whileHover={{
              y: -8,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <CampaignCard
              campaign={campaign}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-4">

          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-indigo-500 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <div className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-md">
            Page {page} of {totalPages}
          </div>

          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-indigo-500 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight size={18} />
          </button>

        </div>
      )}

    </div>
  );
};

export default CampaignGrid;