import { motion } from "framer-motion";
import { Target, TrendingUp } from "lucide-react";

const CampaignProgress = ({ raised = 0, goal = 0 }) => {
  const safeRaised = Number(raised) || 0;
  const safeGoal = Number(goal) || 0;

  const percentage =
    safeGoal > 0
      ? Math.min((safeRaised / safeGoal) * 100, 100)
      : 0;

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-lg font-bold text-slate-900">
            ₹{safeRaised.toLocaleString()}
          </p>

          <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
            <Target size={14} />
            Goal ₹{safeGoal.toLocaleString()}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-2 text-center text-white shadow-md">
          <div className="flex items-center gap-1">
            <TrendingUp size={14} />
            <span className="text-sm font-semibold">
              {percentage.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      <div className="relative h-3 overflow-hidden rounded-full bg-slate-200">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-600"
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-slate-500">
          Raised Amount
        </span>

        <span className="font-semibold text-emerald-600">
          {percentage.toFixed(0)}% Completed
        </span>
      </div>
    </div>
  );
};

export default CampaignProgress;