import { motion } from "framer-motion";

const CampaignSort = ({
  sort,
  setSort,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
    >
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-2xl border border-slate-200 bg-white/90 px-5 py-3.5 text-slate-700 shadow-sm backdrop-blur-md outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:shadow-lg"
      >
        <option value="newest">
          Newest
        </option>

        <option value="oldest">
          Oldest
        </option>

        <option value="highest">
          Most Funded
        </option>

        <option value="lowest">
          Least Funded
        </option>

        <option value="ending">
          Ending Soon
        </option>

        <option value="goal">
          Highest Goal
        </option>
      </select>
    </motion.div>
  );
};

export default CampaignSort;