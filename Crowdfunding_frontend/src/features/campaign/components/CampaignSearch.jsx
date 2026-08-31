import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

const CampaignSearch = ({
  search,
  setSearch,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="relative w-full md:w-96"
    >
      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search campaigns..."
        className="w-full rounded-2xl border border-slate-200 bg-white/90 py-3.5 pl-14 pr-12 text-slate-700 shadow-sm backdrop-blur-md outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:shadow-lg"
      />

      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </motion.div>
  );
};

export default CampaignSearch;