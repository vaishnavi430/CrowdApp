import { useEffect, useState } from "react";
import { Users, Wallet, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    id: 1,
    icon: Users,
    value: 50000,
    suffix: "+",
    title: "Active Users",
    color: "text-indigo-600",
    bg: "bg-indigo-100",
  },
  {
    id: 2,
    icon: Wallet,
    value: 25,
    prefix: "₹",
    suffix: "M+",
    title: "Funds Raised",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    id: 3,
    icon: Target,
    value: 10000,
    suffix: "+",
    title: "Campaigns",
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    id: 4,
    icon: TrendingUp,
    value: 98,
    suffix: "%",
    title: "Success Rate",
    color: "text-violet-600",
    bg: "bg-violet-100",
  },
];

function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1800,
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  const display =
    value >= 1000 && suffix === "+"
      ? `${Math.floor(count / 1000)}K`
      : count;

  return (
    <>
      {prefix}
      {display}
      {suffix}
    </>
  );
}

const Stats = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-indigo-50 py-24">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-400/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="rounded-full border border-indigo-200 bg-white/70 px-5 py-2 text-sm font-semibold text-indigo-600 backdrop-blur-md">
            Platform Statistics
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 lg:text-5xl">
            Trusted by Thousands
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Our growing community continues to empower innovative ideas and
            transform dreams into successful campaigns across the country.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/50 bg-white/70 p-8 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-2xl"
              >
                {/* Glow */}
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-indigo-200/20 blur-3xl transition-all duration-500 group-hover:scale-150" />

                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.15,
                  }}
                  className={`mb-6 inline-flex rounded-2xl ${item.bg} p-4`}
                >
                  <Icon
                    size={30}
                    className={item.color}
                  />
                </motion.div>

                <h2 className="text-4xl font-extrabold text-slate-900">
                  <Counter
                    value={item.value}
                    prefix={item.prefix}
                    suffix={item.suffix}
                  />
                </h2>

                <p className="mt-3 text-lg font-medium text-slate-600">
                  {item.title}
                </p>

                <div className="mt-6 h-1 w-12 rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 transition-all duration-300 group-hover:w-24" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;