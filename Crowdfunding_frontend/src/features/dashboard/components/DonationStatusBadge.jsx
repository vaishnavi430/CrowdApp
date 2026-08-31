import { CheckCircle2, Clock3, XCircle } from "lucide-react";

const statusConfig = {
  Successful: {
    icon: CheckCircle2,
    className:
      "border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 shadow-sm",
  },
  Pending: {
    icon: Clock3,
    className:
      "border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 shadow-sm",
  },
  Failed: {
    icon: XCircle,
    className:
      "border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 text-red-700 shadow-sm",
  },
};

const DonationStatusBadge = ({ status }) => {
  const config =
    statusConfig[status] || statusConfig.Pending;

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${config.className}`}
    >
      <Icon size={16} />
      {status}
    </span>
  );
};

export default DonationStatusBadge;