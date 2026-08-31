import { motion } from "framer-motion";

import DonationTableRow from "./DonationTableRow";

const DonationTable = ({ donations }) => {
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
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 shadow-xl backdrop-blur-xl"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              <th className="w-[35%] px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-600">
                Donor
              </th>

              <th className="w-[25%] px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-600">
                Campaign
              </th>

              <th className="w-[15%] px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-600">
                Amount
              </th>

              <th className="w-[12%] px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-600">
                Status
              </th>

              <th className="w-[13%] px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {donations.map((donation) => (
              <DonationTableRow
                key={donation._id}
                donation={donation}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}

      {donations.length === 0 && (
        <div className="py-16 text-center">
          <h3 className="text-xl font-semibold text-slate-700">
            No Donations Found
          </h3>

          <p className="mt-2 text-slate-500">
            Try changing your search or
            filters.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default DonationTable;