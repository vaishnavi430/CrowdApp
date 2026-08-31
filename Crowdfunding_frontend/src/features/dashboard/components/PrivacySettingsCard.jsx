import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  Mail,
  Phone,
  Database,
  ChevronDown,
} from "lucide-react";

import api from "../../../services/api";

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    aria-pressed={checked}
    className={`relative h-7 w-14 shrink-0 rounded-full transition-all duration-300 ${
      checked ? "bg-indigo-600" : "bg-slate-300"
    }`}
  >
    <span
      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${
        checked
          ? "right-1"
          : "left-1"
      }`}
    />
  </button>
);

const PrivacySettingsCard = ({
  settings,
  onSettingsChange,
}) => {
  const [privacy, setPrivacy] = useState({
    publicProfile:
      settings?.publicProfile ?? true,

    showEmail:
      settings?.showEmail ?? false,

    showPhone:
      settings?.showPhone ?? false,

    dataSharing:
      settings?.dataSharing ?? false,

    profileVisibility:
      settings?.profileVisibility || "Public",
  });

  const [saving, setSaving] = useState(false);

  // ==========================================
  // Update Privacy Settings
  // ==========================================

  const updatePrivacy = async (newPrivacy) => {
    const previousPrivacy = privacy;

    setPrivacy(newPrivacy);
    setSaving(true);

    try {
      const response = await api.put("/users/settings", {
        privacy: newPrivacy,
      });

      const updatedPrivacy =
        response.data.settings.privacy;

      setPrivacy(updatedPrivacy);

      if (onSettingsChange) {
        onSettingsChange(updatedPrivacy);
      }
    } catch (error) {
      console.error(
        "Failed to update privacy settings:",
        error
      );

      // Revert UI if API fails
      setPrivacy(previousPrivacy);

      alert(
        error.response?.data?.message ||
          "Failed to update privacy settings."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // Toggle Privacy Setting
  // ==========================================

  const toggle = (key) => {
    updatePrivacy({
      ...privacy,
      [key]: !privacy[key],
    });
  };

  // ==========================================
  // Change Profile Visibility
  // ==========================================

  const changeVisibility = (value) => {
    updatePrivacy({
      ...privacy,
      profileVisibility: value,
    });
  };

  const rows = [
    {
      key: "publicProfile",
      title: "Public Profile",
      description:
        "Allow others to discover your profile.",
      icon: Eye,
      bg: "bg-indigo-100 dark:bg-indigo-900/40",
      color:
        "text-indigo-600 dark:text-indigo-400",
    },
    {
      key: "showEmail",
      title: "Display Email Address",
      description:
        "Show your email on your public profile.",
      icon: Mail,
      bg: "bg-blue-100 dark:bg-blue-900/40",
      color:
        "text-blue-600 dark:text-blue-400",
    },
    {
      key: "showPhone",
      title: "Display Phone Number",
      description:
        "Allow verified users to view your phone number.",
      icon: Phone,
      bg: "bg-emerald-100 dark:bg-emerald-900/40",
      color:
        "text-emerald-600 dark:text-emerald-400",
    },
    {
      key: "dataSharing",
      title: "Analytics & Data Sharing",
      description:
        "Help improve the platform by sharing anonymous usage data.",
      icon: Database,
      bg: "bg-violet-100 dark:bg-violet-900/40",
      color:
        "text-violet-600 dark:text-violet-400",
    },
  ];

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
        duration: 0.35,
      }}
      className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/80"
    >
      {/* ========================================== */}
      {/* Header */}
      {/* ========================================== */}

      <div className="mb-8 flex items-center gap-4">
        <div className="rounded-2xl bg-indigo-100 p-3 dark:bg-indigo-900/40">
          <Shield
            size={24}
            className="text-indigo-600 dark:text-indigo-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Privacy Settings
          </h2>

          <p className="text-slate-500 dark:text-slate-400">
            Control who can view your information and how
            your data is used.
          </p>
        </div>
      </div>

      {/* ========================================== */}
      {/* Privacy Options */}
      {/* ========================================== */}

      <div className="space-y-5">
        {rows.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-indigo-200 hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-700 dark:hover:bg-slate-800"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-2xl p-3 ${item.bg}`}
                >
                  <Icon
                    size={22}
                    className={item.color}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>

              <Toggle
                checked={privacy[item.key]}
                onChange={() => toggle(item.key)}
              />
            </div>
          );
        })}
      </div>

      {/* ========================================== */}
      {/* Profile Visibility */}
      {/* ========================================== */}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
        <label className="mb-3 block font-semibold text-slate-700 dark:text-slate-200">
          Profile Visibility
        </label>

        <div className="relative">
          <select
            value={privacy.profileVisibility}
            onChange={(e) =>
              changeVisibility(e.target.value)
            }
            disabled={saving}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-slate-700 outline-none transition focus:border-indigo-500 disabled:opacity-60 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
          >
            <option>Public</option>
            <option>Supporters Only</option>
            <option>Private</option>
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
      </div>

      {/* Saving Indicator */}
      {saving && (
        <p className="mt-4 text-right text-sm text-slate-400">
          Saving...
        </p>
      )}
    </motion.div>
  );
};

export default PrivacySettingsCard;