import { motion } from "framer-motion";

const categories = [
  "All",
  "Technology",
  "Education",
  "Health",
  "Agriculture",
  "Social",
];

const statuses = [
  "All",
  "Active",
  "Funded",
  "Expired",
];

const CampaignFilter = ({
  category,
  setCategory,
  status,
  setStatus,
}) => {
  return (
    <div className="flex flex-col gap-4">

      {/* Categories */}
      <div className="flex flex-wrap gap-3">

        {categories.map((item) => (
          <motion.button
            key={item}
            type="button"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => setCategory(item)}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
              category === item
                ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg"
                : "border border-slate-200 bg-white text-slate-700 hover:border-indigo-500 hover:text-indigo-600 hover:shadow-md"
            }`}
          >
            {item}
          </motion.button>
        ))}

      </div>

      {/* Status */}
      <div className="flex flex-wrap items-center gap-3">

        <span className="text-sm font-semibold text-slate-500">
          Status:
        </span>

        <div className="flex flex-wrap gap-2">

          {statuses.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStatus(item)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                status === item
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {item === "All"
                ? "All"
                : item}
            </button>
          ))}

        </div>

      </div>

    </div>
  );
};

export default CampaignFilter;