import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  Heart,
  ShieldCheck,
  Users,
  Globe,
  Rocket,
  Award,
} from "lucide-react";

const stats = [
  {
    value: "50K+",
    label: "Community Members",
  },
  {
    value: "₹10M+",
    label: "Funds Raised",
  },
  {
    value: "2,500+",
    label: "Successful Campaigns",
  },
  {
    value: "98%",
    label: "Success Rate",
  },
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "Empowering creators, innovators, and communities by making crowdfunding accessible, transparent, and impactful.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Transparency",
    description:
      "Every campaign is designed to build confidence through openness and accountability.",
  },
  {
    icon: Heart,
    title: "Community First",
    description:
      "We believe every contribution, no matter the size, creates meaningful change.",
  },
];

function About() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-slate-50
        via-indigo-50/40
        to-white
        dark:from-slate-950
        dark:via-slate-900
        dark:to-slate-950
      "
    >
      {/* =========================================
          BACKGROUND GLOW
      ========================================= */}

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-indigo-300/20 blur-[150px]" />

      <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-violet-300/20 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">

        {/* =========================================
            HERO
        ========================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mb-20 text-center"
        >
          <span
            className="
              rounded-full
              border
              border-indigo-200
              bg-white/70
              px-5
              py-2
              text-sm
              font-semibold
              text-indigo-600
              backdrop-blur-md
              dark:border-slate-700
              dark:bg-slate-800/70
              dark:text-indigo-300
            "
          >
            About CrowdApp
          </span>

          <h1
            className="
              mt-6
              text-5xl
              font-extrabold
              text-slate-900
              dark:!text-white
              md:text-6xl
            "
          >
            Empowering Ideas Through

            <span
              className="
                bg-gradient-to-r
                from-indigo-600
                to-violet-600
                bg-clip-text
                text-transparent
              "
            >
              {" "}
              Crowdfunding
            </span>
          </h1>

          <p
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-lg
              leading-8
              text-slate-600
              dark:!text-slate-300
            "
          >
            CrowdApp connects creators, supporters, and communities to turn
            innovative ideas into reality. Together, we make meaningful
            projects possible through collaboration and trust.
          </p>
        </motion.div>

        {/* =========================================
            MISSION
        ========================================= */}

        <div className="grid items-center gap-12 lg:grid-cols-2">

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
              alt="Team"
              className="rounded-3xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <h2
              className="
                text-4xl
                font-bold
                text-slate-900
                dark:!text-white
              "
            >
              Building Dreams Together
            </h2>

            <p
              className="
                mt-6
                leading-8
                text-slate-600
                dark:!text-slate-300
              "
            >
              Our platform enables entrepreneurs, students, NGOs, artists, and
              innovators to raise funds while giving supporters an easy way to
              contribute to meaningful causes.
            </p>

            <p
              className="
                mt-5
                leading-8
                text-slate-600
                dark:!text-slate-300
              "
            >
              We believe crowdfunding is more than fundraising—it's about
              creating communities that believe in ideas and help them succeed.
            </p>
          </motion.div>

        </div>

        {/* =========================================
            STATS
        ========================================= */}

        <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{
                y: -8,
              }}
              className="
                rounded-3xl
                border
                border-white/40
                bg-white/80
                p-8
                text-center
                shadow-xl
                backdrop-blur-xl
                dark:border-slate-700
                dark:bg-slate-800/90
              "
            >
              <h3 className="text-4xl font-bold text-indigo-600 dark:!text-indigo-400">
                {item.value}
              </h3>

              <p className="mt-3 text-slate-600 dark:!text-slate-300">
                {item.label}
              </p>
            </motion.div>
          ))}

        </div>

        {/* =========================================
            VALUES
        ========================================= */}

        <div className="mt-24">

          <div className="mb-14 text-center">

            <h2
              className="
                text-4xl
                font-bold
                text-slate-900
                dark:!text-white
              "
            >
              Why Choose CrowdApp?
            </h2>

            <p
              className="
                mt-4
                text-lg
                text-slate-600
                dark:!text-slate-300
              "
            >
              Everything we build is focused on helping creators and supporters
              succeed together.
            </p>

          </div>

          {/* =========================================
              VALUE CARDS
          ========================================= */}

          <div className="grid gap-8 md:grid-cols-3">

            {values.map((value) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  whileHover={{
                    y: -10,
                  }}
                  className="
                    rounded-3xl
                    border
                    border-white/40
                    bg-white/80
                    p-8
                    shadow-xl
                    backdrop-blur-xl
                    dark:border-slate-700
                    dark:bg-slate-800/90
                  "
                >
                  {/* Icon */}

                  <div
                    className="
                      mb-6
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-r
                      from-indigo-600
                      to-violet-600
                      text-white
                    "
                  >
                    <Icon size={30} />
                  </div>

                  {/* Card Heading */}

                  <h3
                    className="
                      text-2xl
                      font-bold
                      !text-slate-900
                      dark:!text-white
                    "
                  >
                    {value.title}
                  </h3>

                  {/* Card Description */}

                  <p
                    className="
                      mt-4
                      leading-7
                      !text-slate-600
                      dark:!text-slate-300
                    "
                  >
                    {value.description}
                  </p>
                </motion.div>
              );
            })}

          </div>
        </div>

        {/* =========================================
            COMMUNITY
        ========================================= */}

        <div
          className="
            mt-24
            rounded-3xl
            bg-gradient-to-r
            from-indigo-600
            to-violet-600
            p-12
            text-center
            text-white
            shadow-2xl
          "
        >
          <Users
            className="mx-auto"
            size={60}
          />

          <h2 className="mt-6 text-4xl font-bold">
            Join Our Growing Community
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-indigo-100">
            Thousands of creators and supporters are already making a
            difference through CrowdApp. Become part of a trusted crowdfunding
            ecosystem where ideas turn into reality.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-6">

            <div className="flex items-center gap-2">
              <Globe size={20} />
              Global Reach
            </div>

            <div className="flex items-center gap-2">
              <Rocket size={20} />
              Innovative Projects
            </div>

            <div className="flex items-center gap-2">
              <Award size={20} />
              Trusted Platform
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default About;