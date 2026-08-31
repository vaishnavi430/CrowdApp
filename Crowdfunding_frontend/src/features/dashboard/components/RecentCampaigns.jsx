import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Target,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const RecentCampaigns = ({
  campaigns = [],
}) => {
  const navigate = useNavigate();

  const recentCampaigns = [...campaigns]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 3);

  return (
    <motion.section
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
      className="overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-6 shadow-xl backdrop-blur-xl"
    >
      {/* Header */}

      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">
            Campaigns
          </span>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            Recent Campaigns
          </h2>

          <p className="mt-2 text-slate-500">
            Monitor the performance of your latest
            fundraising campaigns.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/dashboard/campaigns")
          }
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          View All

          <ArrowRight size={18} />
        </button>
      </div>

      {/* Empty State */}

      {recentCampaigns.length === 0 ? (
        <div className="rounded-2xl bg-slate-50 py-14 text-center">
          <Target
            size={40}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 text-lg font-semibold text-slate-700">
            No campaigns yet
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Create your first campaign to start
            fundraising.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/dashboard/create-campaign"
              )
            }
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Create Campaign
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {recentCampaigns.map(
            (campaign, index) => {
              const goal =
                Number(
                  campaign.goalAmount || 0
                );

              const raised =
                Number(
                  campaign.pledgedAmount || 0
                );

              const percentage =
                goal > 0
                  ? Math.min(
                      Math.round(
                        (raised / goal) *
                          100
                      ),
                      100
                    )
                  : 0;

              return (
                <motion.div
                  key={campaign._id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  viewport={{
                    once: true,
                  }}
                  whileHover={{
                    y: -4,
                  }}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-xl"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                    {/* Image */}

                    <img
                      src={
                        campaign.image ||
                        "https://placehold.co/600x400?text=No+Image"
                      }
                      alt={
                        campaign.title ||
                        "Campaign"
                      }
                      className="h-28 w-full rounded-2xl object-cover lg:w-44"
                      onError={(event) => {
                        event.currentTarget.src =
                          "https://placehold.co/600x400?text=No+Image";
                      }}
                    />

                    {/* Details */}

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-bold text-slate-900">
                          {campaign.title}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            campaign.status ===
                            "Active"
                              ? "bg-emerald-100 text-emerald-700"
                              : campaign.status ===
                                "Funded"
                              ? "bg-indigo-100 text-indigo-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <Target
                            size={16}
                          />

                          Goal ₹
                          {goal.toLocaleString()}
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar
                            size={16}
                          />

                          {campaign.deadline
                            ? new Date(
                                campaign.deadline
                              ).toLocaleDateString()
                            : "No deadline"}
                        </div>
                      </div>

                      {/* Progress */}

                      <div className="mt-5">
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-600">
                            ₹
                            {raised.toLocaleString()}{" "}
                            Raised
                          </span>

                          <span className="font-bold text-indigo-600">
                            {percentage}%
                          </span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                          <motion.div
                            initial={{
                              width: 0,
                            }}
                            whileInView={{
                              width: `${percentage}%`,
                            }}
                            transition={{
                              duration: 1,
                            }}
                            viewport={{
                              once: true,
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action */}

                    <div className="flex flex-col items-start gap-4 lg:items-end">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/campaigns/${campaign._id}`
                          )
                        }
                        className="rounded-2xl border border-slate-200 px-6 py-3 font-semibold transition-all hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>
      )}
    </motion.section>
  );
};

export default RecentCampaigns;