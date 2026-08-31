import {
  Wallet,
  FolderKanban,
  Users,
  TrendingUp,
} from "lucide-react";

import StatCard from "./StatCard";

const StatsGrid = ({
  totalRaised = 0,
  campaigns = 0,
  backers = 0,
  successRate = 0,
}) => {
  const stats = [
    {
      title: "Total Raised",
      value: `₹${Number(
        totalRaised
      ).toLocaleString()}`,
      icon: Wallet,
      color: "from-emerald-500 to-green-600",
      change: "Live",
      trend: "up",
      subtitle: "Total funds raised",
    },
    {
      title: "Campaigns",
      value: campaigns,
      icon: FolderKanban,
      color: "from-indigo-500 to-blue-600",
      change: "Live",
      trend: "up",
      subtitle: "Your campaigns",
    },
    {
      title: "Backers",
      value: backers.toLocaleString(),
      icon: Users,
      color: "from-orange-500 to-amber-500",
      change: "Live",
      trend: "up",
      subtitle: "Unique supporters",
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      icon: TrendingUp,
      color: "from-purple-500 to-fuchsia-600",
      change: "Live",
      trend: "up",
      subtitle: "Funded campaigns",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          {...stat}
        />
      ))}
    </div>
  );
};

export default StatsGrid;