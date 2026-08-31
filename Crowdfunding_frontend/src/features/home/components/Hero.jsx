import { motion } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Users,
  ShieldCheck,
  Wallet,
  Star,
} from "lucide-react";

import Button from "../../../components/ui/Button";

const Hero = () => {
  return (
    <section
      className="
        relative overflow-hidden
        bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50
        py-24
        dark:from-slate-950
        dark:via-slate-900
        dark:to-slate-950
      "
    >
      {/* ==========================================
          Animated Background
      ========================================== */}

      <div className="absolute inset-0 -z-20 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute -left-32 top-10 h-72 w-72
            rounded-full
            bg-indigo-400/20
            blur-3xl
            dark:bg-indigo-500/10
          "
        />

        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute right-0 top-0 h-96 w-96
            rounded-full
            bg-cyan-400/20
            blur-3xl
            dark:bg-cyan-500/10
          "
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute bottom-0 left-1/3 h-80 w-80
            rounded-full
            bg-violet-400/20
            blur-3xl
            dark:bg-violet-500/10
          "
        />
      </div>

      {/* ==========================================
          Grid Pattern
      ========================================== */}

      <div
        className="
          absolute inset-0 -z-10
          opacity-[0.04]
          dark:opacity-[0.06]
        "
        style={{
          backgroundImage: `
            linear-gradient(to right,#6366f1 1px,transparent 1px),
            linear-gradient(to bottom,#6366f1 1px,transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ==========================================
          Container
      ========================================== */}

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-24 lg:grid-cols-2 xl:gap-32">

          {/* ==========================================
              Left Side
          ========================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            {/* Badge */}

            <span
              className="
                inline-flex items-center
                rounded-full
                border border-indigo-200
                bg-white/70
                px-4 py-2
                text-sm font-semibold
                text-indigo-700
                backdrop-blur-md
                dark:border-slate-700
                dark:bg-slate-900/70
                dark:text-slate-200
              "
            >
              🚀 Trusted Crowdfunding Platform
            </span>

            {/* Heading */}

            <h1
              className="
                mt-8
                text-5xl
                font-bold
                leading-tight
                text-slate-900
                lg:text-6xl
                dark:text-white
              "
            >
              Fund Ideas.
              <br />

              Change{" "}
              <span className="accent-text">
                Lives.
              </span>
            </h1>

            {/* Description */}

            <p
              className="
                mt-6
                max-w-xl
                text-lg
                leading-8
                text-slate-600
                dark:text-slate-300
              "
            >
              Discover innovative campaigns, support creators,
              and help transform ideas into reality with a secure,
              transparent and community-driven crowdfunding platform.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.96,
                }}
              >
                <Button>
                  Explore Campaigns
                </Button>
              </motion.div>

              <Button variant="secondary">
                Start Fundraising
              </Button>
            </div>

            {/* ==========================================
                Stats
            ========================================== */}

            <div className="mt-14 flex flex-wrap gap-10">

              {/* Campaigns */}

              <div
                className="
                  rounded-2xl
                  bg-white/70
                  px-6 py-4
                  shadow-md
                  backdrop-blur-md
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                  dark:border
                  dark:border-slate-700
                  dark:bg-slate-900/70
                "
              >
                <h2 className="accent-text text-3xl font-bold">
                  10K+
                </h2>

                <p className="mt-1 text-slate-500 dark:text-slate-400">
                  Campaigns
                </p>
              </div>

              {/* Funds */}

              <div
                className="
                  rounded-2xl
                  bg-white/70
                  px-6 py-4
                  shadow-md
                  backdrop-blur-md
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                  dark:border
                  dark:border-slate-700
                  dark:bg-slate-900/70
                "
              >
                <h2 className="accent-text text-3xl font-bold">
                  ₹25M+
                </h2>

                <p className="mt-1 text-slate-500 dark:text-slate-400">
                  Funds Raised
                </p>
              </div>

              {/* Supporters */}

              <div
                className="
                  rounded-2xl
                  bg-white/70
                  px-6 py-4
                  shadow-md
                  backdrop-blur-md
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                  dark:border
                  dark:border-slate-700
                  dark:bg-slate-900/70
                "
              >
                <h2 className="accent-text text-3xl font-bold">
                  50K+
                </h2>

                <p className="mt-1 text-slate-500 dark:text-slate-400">
                  Supporters
                </p>
              </div>

            </div>
          </motion.div>

          {/* ==========================================
              Right Side
          ========================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -12, 0],
            }}
            transition={{
              opacity: {
                duration: 0.7,
              },
              x: {
                duration: 0.7,
              },
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            whileHover={{
              scale: 1.02,
            }}
            className="relative"
          >

            {/* ==========================================
                Active Backers Floating Card
            ========================================== */}

            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -left-20
                -top-8
                z-20
                hidden
                w-56
                rounded-2xl
                border
                border-white/60
                bg-white/95
                p-4
                shadow-2xl
                backdrop-blur-xl
                xl:block
                dark:border-slate-700
                dark:bg-slate-900/95
              "
            >
              <div className="flex items-center gap-3">

                <div
                  className="
                    rounded-full
                    bg-indigo-100
                    p-3
                    dark:bg-indigo-900/40
                  "
                >
                  <Users
                    className="accent-text"
                    size={20}
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Active Backers
                  </p>

                  <h3 className="font-bold text-slate-900 dark:text-white">
                    1,258
                  </h3>
                </div>

              </div>
            </motion.div>

            {/* ==========================================
                Raised Today Floating Card
            ========================================== */}

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -right-16
                top-1/2
                z-20
                hidden
                w-56
                -translate-y-1/2
                rounded-2xl
                border
                border-white/60
                bg-white/95
                p-4
                shadow-2xl
                backdrop-blur-xl
                xl:block
                dark:border-slate-700
                dark:bg-slate-900/95
              "
            >
              <div className="flex items-center gap-3">

                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                  <Wallet
                    className="text-green-600 dark:text-green-400"
                    size={20}
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Raised Today
                  </p>

                  <h3 className="font-bold text-slate-900 dark:text-white">
                    ₹85K
                  </h3>
                </div>

              </div>
            </motion.div>

            {/* ==========================================
                Success Rate Floating Card
            ========================================== */}

            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -bottom-10
                left-16
                z-20
                hidden
                w-52
                rounded-2xl
                border
                border-white/60
                bg-white/95
                p-4
                shadow-2xl
                backdrop-blur-xl
                xl:block
                dark:border-slate-700
                dark:bg-slate-900/95
              "
            >
              <div className="flex items-center gap-3">

                <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-900/30">
                  <Star
                    className="text-yellow-500 dark:text-yellow-400"
                    size={20}
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Success Rate
                  </p>

                  <h3 className="font-bold text-slate-900 dark:text-white">
                    98%
                  </h3>
                </div>

              </div>
            </motion.div>

            {/* ==========================================
                Main Campaign Card
            ========================================== */}

            <div
              className="
                relative
                z-10
                rounded-3xl
                border
                border-white/40
                bg-white/80
                p-8
                shadow-[0_30px_80px_rgba(99,102,241,0.15)]
                backdrop-blur-xl
                dark:border-slate-700
                dark:bg-slate-900/80
                dark:shadow-[0_30px_80px_rgba(0,0,0,0.35)]
              "
            >

              {/* Campaign Header */}

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Smart Farming Project
                  </h3>

                  <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Sustainable Agriculture
                  </p>
                </div>

                <TrendingUp
                  className="text-green-500 dark:text-green-400"
                  size={42}
                />

              </div>

              {/* Funding */}

              <div className="mt-8">

                <div className="mb-2 flex justify-between">

                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Raised
                  </span>

                  <span className="font-semibold text-slate-900 dark:text-white">
                    ₹7,80,000 / ₹10,00,000
                  </span>

                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: "78%",
                    }}
                    transition={{
                      duration: 1.4,
                    }}
                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-indigo-600
                      to-violet-500
                    "
                  />

                </div>
              </div>

              {/* ==========================================
                  Campaign Stats
              ========================================== */}

              <div className="mt-10 grid grid-cols-2 gap-6">

                <motion.div
                  whileHover={{
                    y: -5,
                  }}
                  className="
                    rounded-2xl
                    bg-indigo-50
                    p-5
                    dark:bg-indigo-900/20
                  "
                >
                  <Users className="accent-text" />

                  <h4 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
                    1,258
                  </h4>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Backers
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{
                    y: -5,
                  }}
                  className="
                    rounded-2xl
                    bg-green-50
                    p-5
                    dark:bg-green-900/20
                  "
                >
                  <ShieldCheck className="text-green-600 dark:text-green-400" />

                  <h4 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
                    Verified
                  </h4>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Campaign
                  </p>
                </motion.div>

              </div>

              {/* Donate */}

              <Button className="mt-8 w-full shadow-lg transition-all duration-300 hover:shadow-indigo-300">
                Donate Now

                <ArrowRight
                  className="ml-2 inline"
                  size={18}
                />
              </Button>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;