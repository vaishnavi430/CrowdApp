import { motion } from "framer-motion";
import {
  Search,
  Filter,
  CreditCard,
  Calendar,
  Download,
  X,
} from "lucide-react";

const DonationToolbar = ({
  search,
  setSearch,
  status,
  setStatus,
  payment,
  setPayment,
  date,
  setDate,
  onExport,
  onClearFilters,
}) => {
  const hasFilters =
    search ||
    status !== "All" ||
    payment !== "All" ||
    date;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl"
    >
      {/* ==========================================
          Header
      ========================================== */}

      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        {/* Left */}

        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Donations Manager
          </div>

          <h2 className="mt-4 text-3xl font-bold text-slate-900">
            Recent Donations
          </h2>

          <p className="mt-2 text-slate-500">
            Search, filter and manage your donation transactions.
          </p>
        </div>

        {/* Summary */}

        <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 px-6 py-5 text-white shadow-xl">
          <p className="text-sm text-emerald-100">
            Donations
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {hasFilters ? "Filtered" : "All"}
          </h3>

          <p className="mt-1 text-sm text-emerald-100">
            Your donation history
          </p>
        </div>
      </div>

      {/* ==========================================
          Filters
      ========================================== */}

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[minmax(280px,1.5fr)_minmax(170px,1fr)_minmax(170px,1fr)_minmax(190px,1fr)]">
        {/* ==========================================
            Search
        ========================================== */}

        <div className="relative min-w-0">
          <Search
            size={19}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search campaign..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* ==========================================
            Status
        ========================================== */}

        <div className="relative min-w-0">
          <Filter
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          >
            <option value="All">
              All Status
            </option>

            <option value="Success">
              Successful
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Failed">
              Failed
            </option>
          </select>
        </div>

        {/* ==========================================
            Payment
        ========================================== */}

        <div className="relative min-w-0">
          <CreditCard
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={payment}
            onChange={(event) =>
              setPayment(event.target.value)
            }
            className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          >
            <option value="All">
              All Payment
            </option>

            <option value="Online">
              Online Payment
            </option>
          </select>
        </div>

        {/* ==========================================
            Date
        ========================================== */}

        <div className="relative min-w-0">
          <Calendar
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="date"
            value={date}
            onChange={(event) =>
              setDate(event.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>

      {/* ==========================================
          Action Buttons
      ========================================== */}

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:justify-end">
        {/* Export */}

        <button
          type="button"
          onClick={onExport}
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
        >
          <Download size={18} />

          Export
        </button>

        {/* Clear */}

        {hasFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-100"
          >
            <X size={18} />

            Clear
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default DonationToolbar;