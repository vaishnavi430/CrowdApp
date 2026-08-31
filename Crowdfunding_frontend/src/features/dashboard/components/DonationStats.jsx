import { motion } from "framer-motion";
import {
  Heart,
  IndianRupee,
  Users,
  TrendingUp,
} from "lucide-react";

const DonationStats = ({ donations }) => {
  const totalDonations = donations.length;

  const totalAmount = donations.reduce(
    (sum, donation) => sum + (donation.amount || 0),
    0
  );

  const averageDonation =
    totalDonations > 0
      ? Math.round(totalAmount / totalDonations)
      : 0;

  // Since this page shows only the logged-in user's donations,
  // there is one active donor.
  const activeDonors = totalDonations > 0 ? 1 : 0;

  const stats = [
    {
      title: "Total Donations",
      value: totalDonations,
      icon: Heart,
      gradient: "from-pink-500 to-rose-500",
      bg: "bg-pink-50",
      iconColor: "text-pink-600",
    },
    {
      title: "Amount Donated",
      value: `₹${totalAmount.toLocaleString()}`,
      icon: IndianRupee,
      gradient: "from-emerald-500 to-green-500",
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Campaigns Supported",
      value: new Set(
        donations.map((d) => d.project?._id)
      ).size,
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Average Donation",
      value: `₹${averageDonation.toLocaleString()}`,
      icon: TrendingUp,
      gradient: "from-violet-500 to-purple-500",
      bg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
              duration: 0.4,
            }}
            whileHover={{
              y: -6,
            }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-2xl"
          >
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.gradient}`}
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`rounded-2xl ${stat.bg} p-4 transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon
                  className={stat.iconColor}
                  size={28}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DonationStats;