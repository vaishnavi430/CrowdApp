import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
} from "recharts";
import {
  TrendingUp,
  Wallet,
} from "lucide-react";

const RevenueChart = ({
  donations = [],
  totalRaised = 0,
  activeCampaigns = 0,
}) => {
  // ==========================================
  // Monthly Revenue
  // ==========================================

  const chartData = useMemo(() => {
    const months = [];

    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1
      );

      months.push({
        key: `${date.getFullYear()}-${date.getMonth()}`,
        month: date.toLocaleString(
          "en-US",
          {
            month: "short",
          }
        ),
        amount: 0,
      });
    }

    donations.forEach((donation) => {
      const donationDate =
        donation?.createdAt ||
        donation?.donatedAt;

      if (!donationDate) {
        return;
      }

      const date = new Date(
        donationDate
      );

      const key = `${date.getFullYear()}-${date.getMonth()}`;

      const month = months.find(
        (item) => item.key === key
      );

      if (month) {
        month.amount += Number(
          donation.amount || 0
        );
      }
    });

    return months.map(
      ({ key, ...month }) => month
    );
  }, [donations]);

  // ==========================================
  // Highest Revenue Month
  // ==========================================

  const highestRevenueMonth = useMemo(() => {
    if (!chartData.length) {
      return "No data";
    }

    const highest = chartData.reduce(
      (max, item) =>
        item.amount > max.amount
          ? item
          : max,
      chartData[0]
    );

    return highest.amount > 0
      ? highest.month
      : "No data";
  }, [chartData]);

  // ==========================================
  // Average Monthly Revenue
  // ==========================================

  const averageMonthlyRevenue =
    chartData.length > 0
      ? Math.round(
          chartData.reduce(
            (sum, item) =>
              sum + item.amount,
            0
          ) / chartData.length
        )
      : 0;

  return (
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
      className="overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-6 shadow-xl backdrop-blur-xl"
    >
      {/* ==========================================
          Header
      ========================================== */}

      <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">
            Analytics
          </span>

          <h2 className="mt-4 text-3xl font-bold text-slate-900">
            Revenue Analytics
          </h2>

          <p className="mt-2 text-slate-500">
            Monitor campaign revenue and funding
            performance over the last six months.
          </p>
        </div>

        {/* Summary Cards */}

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-5 text-white shadow-lg">
            <Wallet size={24} />

            <p className="mt-4 text-sm text-indigo-100">
              Total Revenue
            </p>

            <h3 className="mt-1 text-2xl font-bold">
              ₹
              {Number(
                totalRaised
              ).toLocaleString()}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <TrendingUp
              size={24}
              className="text-emerald-600"
            />

            <p className="mt-4 text-sm text-slate-500">
              Monthly Average
            </p>

            <h3 className="mt-1 text-2xl font-bold text-emerald-600">
              ₹
              {averageMonthlyRevenue.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      {/* ==========================================
          Chart
      ========================================== */}

      <div className="h-[360px] w-full">
        {donations.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-2xl bg-slate-50">
            <div className="text-center">
              <Wallet
                size={40}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 font-semibold text-slate-600">
                No revenue data yet
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Revenue will appear here when
                campaigns receive donations.
              </p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="colorRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#6366F1"
                    stopOpacity={0.45}
                  />

                  <stop
                    offset="95%"
                    stopColor="#6366F1"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#E2E8F0"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: "#64748B",
                  fontSize: 13,
                }}
              />

              <Tooltip
                formatter={(value) =>
                  `₹${Number(
                    value
                  ).toLocaleString()}`
                }
                cursor={{
                  stroke: "#6366F1",
                  strokeWidth: 1,
                }}
                contentStyle={{
                  borderRadius: "14px",
                  border: "none",
                  boxShadow:
                    "0 12px 35px rgba(0,0,0,0.12)",
                }}
              />

              <Area
                type="monotone"
                dataKey="amount"
                stroke="#4F46E5"
                strokeWidth={3}
                fill="url(#colorRevenue)"
                activeDot={{
                  r: 6,
                  fill: "#4F46E5",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ==========================================
          Footer
      ========================================== */}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-slate-200 pt-6">
        <div>
          <p className="text-sm text-slate-500">
            Highest Revenue Month
          </p>

          <h4 className="mt-1 text-lg font-semibold text-slate-900">
            {highestRevenueMonth}
          </h4>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Average Monthly Revenue
          </p>

          <h4 className="mt-1 text-lg font-semibold text-emerald-600">
            ₹
            {averageMonthlyRevenue.toLocaleString()}
          </h4>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Active Campaigns
          </p>

          <h4 className="mt-1 text-lg font-semibold text-slate-900">
            {activeCampaigns}
          </h4>
        </div>
      </div>
    </motion.div>
  );
};

export default RevenueChart;