import { motion } from "framer-motion";
import {
  Globe,
  Linkedin,
  Github,
  ExternalLink,
} from "lucide-react";

const SocialLinksCard = ({ profile }) => {
  const links = [
    {
      title: "Website",
      value: profile?.social?.website || "Not Added",
      icon: Globe,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "LinkedIn",
      value: profile?.social?.linkedin || "Not Added",
      icon: Linkedin,
      bg: "bg-sky-50",
      color: "text-sky-600",
    },
    {
      title: "GitHub",
      value: profile?.social?.github || "Not Added",
      icon: Github,
      bg: "bg-slate-100",
      color: "text-slate-700",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur-xl"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Social Links
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Connect with your online profiles.
        </p>
      </div>

      <div className="space-y-4">
        {links.map((link, index) => {
          const Icon = link.icon;

          return (
            <motion.a
              key={link.title}
              href={link.value !== "Not Added" ? link.value : "#"}
              target={link.value !== "Not Added" ? "_blank" : undefined}
              rel="noopener noreferrer"
              onClick={(e) => {
                if (link.value === "Not Added") {
                  e.preventDefault();
                }
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                y: -3,
              }}
              className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-indigo-200 hover:bg-white hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`${link.bg} rounded-2xl p-3`}
                >
                  <Icon
                    size={22}
                    className={link.color}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {link.title}
                  </h3>

                  <p className="mt-1 max-w-[180px] truncate text-sm text-slate-500">
                    {link.value}
                  </p>
                </div>
              </div>

              <ExternalLink
                size={18}
                className="text-slate-400 transition group-hover:text-indigo-600"
              />
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SocialLinksCard;