import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Mail,
  HeartHandshake,
  Megaphone,
  Send,
} from "lucide-react";
import api from "../../../services/api";

const Toggle = ({ checked, onChange, disabled }) => {
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      aria-pressed={checked}
      className={`relative h-7 w-14 rounded-full transition-all duration-300 ${checked ? "bg-indigo-600" : "bg-slate-300"
        } ${disabled
          ? "cursor-not-allowed opacity-60"
          : "cursor-pointer"
        }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${checked ? "left-8" : "left-1"
          }`}
      />
    </button>
  );
};

const NotificationSettingsCard = ({
  settings,
  onSettingsChange,
}) => {
  const [notificationSettings, setNotificationSettings] =
    useState(settings || {});

  const [savingKey, setSavingKey] = useState(null);

  // Update local state if Settings.jsx receives
  // fresh settings from the backend.
  useEffect(() => {
    setNotificationSettings(settings || {});
  }, [settings]);

  const updateSetting = async (key) => {
    const previousSettings = {
      ...notificationSettings,
    };

    const newSettings = {
      ...notificationSettings,
      [key]: !notificationSettings[key],
    };

    // Update UI immediately
    setNotificationSettings(newSettings);
    setSavingKey(key);

    try {

      const response = await api.put(
        "/users/settings",
        {
          notifications: newSettings,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedNotifications =
        response.data.settings.notifications;

      // Update local state with actual backend data
      setNotificationSettings(
        updatedNotifications
      );

      // Update parent Settings state
      if (onSettingsChange) {
        onSettingsChange(updatedNotifications);
      }
    } catch (error) {
      console.error(
        "Failed to update notification settings:",
        error
      );

      // Restore previous UI state
      setNotificationSettings(
        previousSettings
      );

      alert(
        error.response?.data?.message ||
        "Failed to update settings."
      );
    } finally {
      setSavingKey(null);
    }
  };

  const options = [
    {
      key: "email",
      title: "Email Notifications",
      description:
        "Receive important updates by email.",
      icon: Mail,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      key: "push",
      title: "Push Notifications",
      description:
        "Allow browser push notifications.",
      icon: Bell,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      key: "donations",
      title: "Donation Alerts",
      description:
        "Notify me when someone donates.",
      icon: HeartHandshake,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      key: "campaignUpdates",
      title: "Campaign Updates",
      description:
        "Receive campaign activity updates.",
      icon: Megaphone,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      key: "marketing",
      title: "Marketing Emails",
      description:
        "Receive news and promotional emails.",
      icon: Send,
      color: "text-violet-600",
      bg: "bg-violet-100",
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
      className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur-xl"
    >
      {/* Header */}

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Notifications
        </h2>

        <p className="mt-2 text-slate-500">
          Control how you receive notifications.
        </p>
      </div>

      {/* Notification Options */}

      <div className="space-y-5">
        {options.map((option) => {
          const Icon = option.icon;

          const isSaving =
            savingKey === option.key;

          return (
            <div
              key={option.key}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-indigo-200 hover:bg-white"
            >
              {/* Left */}

              <div className="flex items-center gap-4">
                <div
                  className={`${option.bg} rounded-2xl p-3`}
                >
                  <Icon
                    size={22}
                    className={option.color}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {option.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {option.description}
                  </p>
                </div>
              </div>

              {/* Toggle */}

              <Toggle
                checked={
                  notificationSettings[
                  option.key
                  ] || false
                }
                disabled={isSaving}
                onChange={() =>
                  updateSetting(option.key)
                }
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default NotificationSettingsCard;