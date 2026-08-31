import { motion } from "framer-motion";
import {
  PlusCircle,
  Wallet,
  BarChart3,
  Settings,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Create Campaign",
    description:
      "Launch a new fundraising campaign.",
    icon: PlusCircle,
    color:
      "from-indigo-500 to-violet-600",
    path: "/dashboard/create-campaign",
  },
  {
    title: "Donations",
    description:
      "View your donation and funding activity.",
    icon: Wallet,
    color:
      "from-emerald-500 to-green-600",
    path: "/dashboard/donations",
  },
  {
    title: "Analytics",
    description:
      "Track donations and campaign growth.",
    icon: BarChart3,
    color:
      "from-orange-500 to-amber-500",
    path: "/dashboard/donations",
  },
  {
    title: "Settings",
    description:
      "Manage your account preferences.",
    icon: Settings,
    color:
      "from-slate-500 to-slate-700",
    path: "/dashboard/settings",
  },
];

const QuickActions = () => {
  const navigate = useNavigate();

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

      <div className="mb-8">
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">
          Shortcuts
        </span>

        <h2 className="mt-3 text-3xl font-bold text-slate-900">
          Quick Actions
        </h2>

        <p className="mt-2 text-slate-500">
          Access your most frequently used
          dashboard features.
        </p>
      </div>

      {/* Actions */}

      <div className="space-y-4">
        {actions.map(
          (action, index) => {
            const Icon = action.icon;

            return (
              <motion.button
                key={action.title}
                type="button"
                onClick={() =>
                  navigate(action.path)
                }
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                viewport={{
                  once: true,
                }}
                whileHover={{
                  x: 5,
                }}
                className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-indigo-500 hover:shadow-lg"
              >
                <div
                  className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color} shadow-md`}
                >
                  <Icon
                    size={24}
                    className="text-white"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {action.description}
                  </p>
                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600"
                />
              </motion.button>
            );
          }
        )}
      </div>

      {/* Footer Card */}

      <div className="mt-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white shadow-lg">
        <p className="text-sm text-indigo-100">
          Need help getting started?
        </p>

        <h3 className="mt-2 text-xl font-bold">
          Explore Your Campaigns
        </h3>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/dashboard/campaigns"
            )
          }
          className="mt-5 rounded-xl bg-white px-5 py-2 font-semibold text-indigo-700 transition hover:scale-105"
        >
          View Campaigns
        </button>
      </div>
    </motion.section>
  );
};

export default QuickActions;