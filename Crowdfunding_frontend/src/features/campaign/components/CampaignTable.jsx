import { motion } from "framer-motion";
import { FolderKanban } from "lucide-react";

import CampaignTableRow from "./CampaignTableRow";
import CampaignCard from "./CampaignCard";

const CampaignTable = ({
  campaigns,
  refreshCampaigns,
}) => {
  return (
    <>
      {/* Desktop Table */}
      <motion.div
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
        className="hidden overflow-hidden rounded-3xl border border-white/40 bg-white/80 shadow-xl backdrop-blur-xl lg:block"
      >

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">

          <div>

            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">
              <FolderKanban size={14} />
              Campaign List
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              All Campaigns
            </h2>

            <p className="mt-1 text-slate-500">
              Manage and monitor all your crowdfunding campaigns.
            </p>

          </div>

          <div className="rounded-2xl bg-indigo-50 px-5 py-3">

            <p className="text-sm text-slate-500">
              Total Campaigns
            </p>

            <h3 className="text-2xl font-bold text-indigo-600">
              {campaigns.length}
            </h3>

          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="sticky top-0 border-b border-slate-200 bg-slate-50">

              <tr>

                <th className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Campaign
                </th>

                <th className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Progress
                </th>

                <th className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {campaigns.map((campaign) => (
                <CampaignTableRow
                  key={campaign._id}
                  campaign={campaign}
                  refreshCampaigns={refreshCampaigns}
                />
              ))}

            </tbody>

          </table>

        </div>

      </motion.div>

      {/* Mobile */}
      <div className="grid gap-5 lg:hidden">

        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign._id}
            campaign={campaign}
            showManagementActions
            onDelete={refreshCampaigns}
          />
        ))}

      </div>
    </>
  );
};

export default CampaignTable;