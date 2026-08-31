import {
  CheckCircle2,
  Clock3,
  FileEdit,
} from "lucide-react";

const statusConfig = {
  Active: {
    icon: CheckCircle2,
    className:
      "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200",
  },
  Completed: {
    icon: CheckCircle2,
    className:
      "bg-gradient-to-r from-blue-100 to-sky-100 text-blue-700 border border-blue-200",
  },
  Draft: {
    icon: FileEdit,
    className:
      "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border border-amber-200",
  },
};

const defaultConfig = {
  icon: Clock3,
  className:
    "bg-slate-100 text-slate-700 border border-slate-200",
};

const CampaignStatusBadge = ({ status }) => {
  const config = statusConfig[status] || defaultConfig;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm ${config.className}`}
    >
      <Icon size={15} />
      {status}
    </span>
  );
};

export default CampaignStatusBadge;