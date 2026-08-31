import { motion } from "framer-motion";
import {
  FolderKanban,
  Heart,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

const AccountStats = ({ stats = {} }) => {
  const campaigns = stats.campaigns ?? 0;
  const donations = stats.donations ?? 0;
  const amountRaised = stats.amountRaised ?? 0;
  const successRate = stats.successRate ?? "0%";

  const statItems = [
    {
      title: "Campaigns",
      value: campaigns,
      icon: FolderKanban,
      color: "from-indigo-500 to-violet-500",
      bg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      title: "Donations",
      value: donations,
      icon: Heart,
      color: "from-rose-500 to-pink-500",
      bg: "bg-rose-50",
      iconColor: "text-rose-600",
    },
    {
      title: "Amount Raised",
      value: `₹${amountRaised.toLocaleString()}`,
      icon: IndianRupee,
      color: "from-emerald-500 to-green-500",
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Success Rate",
      value: successRate,
      icon: TrendingUp,
      color: "from-amber-500 to-orange-500",
      bg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur-xl"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Account Statistics
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your overall fundraising performance.
        </p>
      </div>

      <div className="space-y-4">
        {statItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                x: 5,
              }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-indigo-200 hover:bg-white"
            >
              <div
                className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${item.color}`}
              />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {item.title}
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-slate-900">
                    {item.value}
                  </h3>
                </div>

                <div
                  className={`${item.bg} rounded-2xl p-4 transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon
                    size={24}
                    className={item.iconColor}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AccountStats;