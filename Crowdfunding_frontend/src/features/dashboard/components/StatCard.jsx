import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  change,
  trend,
  subtitle,
}) => {
  const isPositive = trend === "up";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-6 shadow-xl backdrop-blur-xl"
    >
      {/* Background Glow */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-indigo-100 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg`}
        >
          <Icon size={30} className="text-white" />
        </div>
      </div>

      {/* Progress Line */}
      <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "75%" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        <div
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${
            isPositive
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}

          {change}
        </div>

        <span className="text-xs font-medium text-slate-400">
          Last 30 Days
        </span>
      </div>
    </motion.div>
  );
};

export default StatCard;