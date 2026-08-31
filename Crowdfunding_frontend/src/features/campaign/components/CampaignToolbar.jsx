import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Filter,
  FolderKanban,
} from "lucide-react";

const CampaignToolbar = ({
  search,
  setSearch,
  status,
  setStatus,
  totalCampaigns,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 text-white shadow-2xl"
    >
      {/* ==========================================
          Top Section
      ========================================== */}

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        {/* Left */}

        <div className="flex-1">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            <FolderKanban size={14} />

            Campaign Manager
          </div>

          <h2 className="text-4xl font-bold text-white">
            My Campaigns
          </h2>

          <p className="mt-3 max-w-2xl text-indigo-100">
            Manage, monitor and organize all your
            crowdfunding campaigns from one dashboard.
          </p>
        </div>

        {/* ==========================================
            Total Campaigns
        ========================================== */}

        <div className="flex min-w-[230px] shrink-0 items-center gap-4 rounded-2xl border border-white/20 bg-white/15 px-5 py-4 shadow-lg backdrop-blur-md">
          {/* Number */}

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold text-white">
            {totalCampaigns}
          </div>

          {/* Text */}

          <div className="min-w-0">
            <p className="whitespace-nowrap text-xs font-medium uppercase tracking-wider text-indigo-100">
              Total Campaigns
            </p>

            <h3 className="mt-1 text-xl font-bold text-white">
              {totalCampaigns}
            </h3>
          </div>
        </div>
      </div>

      {/* ==========================================
          Controls
      ========================================== */}

      <div className="mt-8 flex flex-col gap-4 xl:flex-row xl:items-center">
        {/* Search */}

        <div className="relative flex-1">
          <Search
            size={20}
            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search campaigns..."
            className="h-14 w-full rounded-2xl border border-white/20 bg-white/10 pl-12 pr-4 text-white outline-none backdrop-blur-md transition placeholder:text-indigo-100 focus:border-white/40 focus:ring-4 focus:ring-white/20"
          />
        </div>

        {/* Filter */}

        <div className="relative">
          <Filter
            size={20}
            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="h-14 w-full min-w-[200px] appearance-none rounded-2xl border border-white/20 bg-white/10 pl-12 pr-8 text-white outline-none backdrop-blur-md transition focus:border-white/40 focus:ring-4 focus:ring-white/20"
          >
            <option
              value="All"
              className="text-black"
            >
              All Campaigns
            </option>

            <option
              value="Active"
              className="text-black"
            >
              Active
            </option>

            <option
              value="Completed"
              className="text-black"
            >
              Completed
            </option>

            <option
              value="Draft"
              className="text-black"
            >
              Draft
            </option>
          </select>
        </div>

        {/* New Campaign */}

        <button
          type="button"
          onClick={() =>
            navigate(
              "/dashboard/create-campaign"
            )
          }
          className="flex h-14 min-w-[210px] items-center justify-center gap-2 rounded-2xl bg-white px-8 font-semibold text-indigo-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-50 hover:shadow-2xl"
        >
          <Plus size={18} />

          <span>New Campaign</span>
        </button>
      </div>
    </motion.div>
  );
};

export default CampaignToolbar;