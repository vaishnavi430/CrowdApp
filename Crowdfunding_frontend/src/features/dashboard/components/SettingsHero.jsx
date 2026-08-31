import { motion } from "framer-motion";
import {
  Settings,
  ShieldCheck,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const SettingsHero = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-900 p-8 text-white shadow-2xl"
    >
      {/* Glow Effects */}

      <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
            <Settings size={16} />

            Account Preferences
          </div>

          <h1 className="text-4xl font-bold">
            Settings
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Manage your account, notifications, privacy,
            security, and appearance from one place.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-300">

            <div className="flex items-center gap-2">
              <ShieldCheck size={18} />

              Secure Account
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={18} />

              Changes Saved Automatically
            </div>

          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-md">
          <div className="rounded-xl bg-emerald-500/20 p-2">
            <CheckCircle2
              size={24}
              className="text-emerald-400"
            />
          </div>

          <div>
            <p className="text-sm text-slate-300">
              Settings Status
            </p>

            <p className="font-semibold text-white">
              All Changes Saved
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default SettingsHero;