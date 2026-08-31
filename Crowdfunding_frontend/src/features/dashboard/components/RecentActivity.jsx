import { motion } from "framer-motion";
import {
  FolderPlus,
  HeartHandshake,
  IndianRupee,
  UserCog,
  Trophy,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "New Campaign Created",
    description: "Education For Every Child campaign was published.",
    time: "2 hours ago",
    icon: FolderPlus,
    bg: "bg-indigo-100",
    color: "text-indigo-600",
  },
  {
    id: 2,
    title: "Donation Received",
    description: "Rahul Sharma donated ₹5,000.",
    time: "5 hours ago",
    icon: HeartHandshake,
    bg: "bg-emerald-100",
    color: "text-emerald-600",
  },
  {
    id: 3,
    title: "Fundraising Milestone",
    description: "Raised ₹3,00,000 across all campaigns.",
    time: "Yesterday",
    icon: IndianRupee,
    bg: "bg-amber-100",
    color: "text-amber-600",
  },
  {
    id: 4,
    title: "Profile Updated",
    description: "Personal information was updated.",
    time: "3 days ago",
    icon: UserCog,
    bg: "bg-violet-100",
    color: "text-violet-600",
  },
  {
    id: 5,
    title: "Campaign Completed",
    description: "Village School campaign reached its funding goal.",
    time: "Last week",
    icon: Trophy,
    bg: "bg-rose-100",
    color: "text-rose-600",
  },
];

const RecentActivity = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur-xl"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Recent Activity
        </h2>

        <p className="mt-2 text-slate-500">
          Latest updates from your account and campaigns.
        </p>
      </div>

      <div className="relative">
        {/* Timeline */}
        <div className="absolute left-6 top-0 h-full w-px bg-slate-200" />

        <div className="space-y-8">
          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <motion.div
                key={activity.id}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  x: 6,
                }}
                className="relative flex gap-5"
              >
                <div
                  className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl ${activity.bg} shadow-sm`}
                >
                  <Icon
                    size={22}
                    className={activity.color}
                  />
                </div>

                <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-indigo-200 hover:bg-white">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-semibold text-slate-900">
                      {activity.title}
                    </h3>

                    <span className="text-sm text-slate-400">
                      {activity.time}
                    </span>
                  </div>

                  <p className="mt-2 text-slate-600">
                    {activity.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default RecentActivity;