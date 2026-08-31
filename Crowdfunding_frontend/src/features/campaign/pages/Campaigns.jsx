import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import CampaignGrid from "../components/CampaignGrid";
import CampaignFilter from "../components/CampaignFilter";
import CampaignSearch from "../components/CampaignSearch";
import CampaignSort from "../components/CampaignSort";
import api from "../../../services/api";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const limit = 9;

  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const params = {
          page,
          limit,
          sort,
        };

        if (search.trim()) {
          params.search = search.trim();
        }

        if (category !== "All") {
          params.category = category;
        }

        if (status !== "All") {
          params.status = status;
        }

        const response = await api.get("/projects", {
          params,
          signal: controller.signal,
        });

        setCampaigns(response.data.projects || []);
        setTotalPages(response.data.totalPages || 1);
        setTotalProjects(response.data.totalProjects || 0);
      } catch (error) {
        if (error.code === "ERR_CANCELED") {
          return;
        }

        console.error("Failed to load campaigns:", error);

        setCampaigns([]);
        setTotalPages(1);
        setTotalProjects(0);

        setError(
          error.response?.data?.message ||
            "Failed to load campaigns. Please try again."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search, category, status, sort, page]);

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setPage(1);
  };

  const handleRetry = () => {
    setPage(1);
    setError("");
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/40 to-white py-20">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-indigo-300/20 blur-[140px]" />

      <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-violet-300/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Hero */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mb-14 text-center"
        >
          <span className="inline-flex rounded-full border border-indigo-200 bg-white/70 px-5 py-2 text-sm font-semibold text-indigo-600 backdrop-blur-md">
            Discover Amazing Projects
          </span>

          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
            Explore Campaigns
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Support innovative ideas, creative minds, and meaningful causes from
            around the world. Every contribution helps turn dreams into reality.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="rounded-3xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-xl"
        >
          <div className="flex flex-col gap-6">

            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

              <CampaignFilter
                category={category}
                setCategory={handleCategoryChange}
                status={status}
                setStatus={handleStatusChange}
              />

              <div className="flex flex-col gap-4 md:flex-row">
                <CampaignSearch
                  search={search}
                  setSearch={handleSearchChange}
                />

                <CampaignSort
                  sort={sort}
                  setSort={handleSortChange}
                />
              </div>

            </div>

            {/* Results count */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">

              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-800">
                  {campaigns.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-800">
                  {totalProjects}
                </span>{" "}
                campaigns
              </p>

              {(search || category !== "All" || status !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setStatus("All");
                    setSort("newest");
                    setPage(1);
                  }}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Clear all filters
                </button>
              )}

            </div>

          </div>
        </motion.div>

        {/* Campaign Grid */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}
          className="mt-14"
        >
          <CampaignGrid
            campaigns={campaigns}
            loading={loading}
            error={error}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            onRetry={handleRetry}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Campaigns;