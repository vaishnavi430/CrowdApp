import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CampaignCard from "./CampaignCard";
import api from "../../../services/api";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
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

const RelatedCampaigns = ({
  campaignId,
  category,
}) => {
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedCampaigns = async () => {
      if (!category) {
        setCampaigns([]);
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(
          "/projects",
          {
            params: {
              category,
              status: "Active",
              sort: "newest",
              page: 1,
              limit: 6,
            },
          }
        );

        const related =
          response.data.projects || [];

        const filtered = related
          .filter(
            (campaign) =>
              campaign._id !== campaignId
          )
          .slice(0, 3);

        setCampaigns(filtered);
      } catch (error) {
        console.error(
          "Failed to load related campaigns:",
          error
        );

        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedCampaigns();
  }, [campaignId, category]);

  if (!loading && campaigns.length === 0) {
    return null;
  }

  return (
    <section className="relative mt-28 overflow-hidden py-10">

      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-indigo-300/20 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-300/20 blur-[120px]" />

      <div className="relative">

        {/* Header */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">

          <div>

            <span className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
              Discover More
            </span>

            <h2 className="mt-5 text-4xl font-bold text-slate-900">
              Related Campaigns
            </h2>

            <p className="mt-3 max-w-2xl text-lg text-slate-600">
              Explore more campaigns in the{" "}
              <span className="font-semibold text-indigo-600">
                {category}
              </span>{" "}
              category.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/campaigns")
            }
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:text-indigo-600 hover:shadow-lg"
          >
            View All Campaigns
            <ArrowRight size={18} />
          </button>

        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[430px] animate-pulse rounded-2xl bg-slate-200"
              />
            ))}

          </div>
        ) : (

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
            }}
            className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
          >

            {campaigns.map((campaign) => (
              <motion.div
                key={campaign._id}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                }}
              >
                <CampaignCard
                  campaign={campaign}
                />
              </motion.div>
            ))}

          </motion.div>

        )}

      </div>
    </section>
  );
};

export default RelatedCampaigns;