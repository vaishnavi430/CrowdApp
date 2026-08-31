import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  BellRing,
  Clock3,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../../../services/api";

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    aria-pressed={checked}
    className={`relative h-7 w-14 rounded-full transition-all duration-300 ${
      checked ? "bg-emerald-600" : "bg-slate-300"
    }`}
  >
    <span
      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${
        checked ? "left-8" : "left-1"
      }`}
    />
  </button>
);

const SecuritySettingsCard = ({
  settings,
  onSettingsChange,
}) => {
  const navigate = useNavigate();

  const [security, setSecurity] = useState({
    twoFactor: settings?.twoFactor ?? false,
    loginAlerts: settings?.loginAlerts ?? true,
    sessionTimeout:
      settings?.sessionTimeout || "30 Minutes",
  });

  const [saving, setSaving] = useState(false);

  // ==========================================
  // Update Security Settings
  // ==========================================

  const updateSecurity = async (newSecurity) => {
    const previousSecurity = security;

    setSecurity(newSecurity);
    setSaving(true);

    try {
      const response = await api.put("/users/settings", {
        security: newSecurity,
      });

      const updatedSecurity =
        response.data.settings.security;

      setSecurity(updatedSecurity);

      if (onSettingsChange) {
        onSettingsChange(updatedSecurity);
      }
    } catch (error) {
      console.error(
        "Failed to update security settings:",
        error
      );

      // Revert UI if API request fails
      setSecurity(previousSecurity);

      alert(
        error.response?.data?.message ||
          "Failed to update security settings."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // Toggle Security Setting
  // ==========================================

  const toggle = (key) => {
    updateSecurity({
      ...security,
      [key]: !security[key],
    });
  };

  // ==========================================
  // Change Session Timeout
  // ==========================================

  const changeTimeout = (value) => {
    updateSecurity({
      ...security,
      sessionTimeout: value,
    });
  };

  // ==========================================
  // Change Password
  // ==========================================

  const handleChangePassword = () => {
    navigate("/dashboard/change-password");
  };

  // ==========================================
  // Logout From All Devices
  // ==========================================

  const handleLogoutAll = () => {
    const confirmed = window.confirm(
      "Are you sure you want to sign out from all devices?"
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  };

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

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-emerald-100 p-3 dark:bg-emerald-900/40">
            <ShieldCheck
              size={24}
              className="text-emerald-600 dark:text-emerald-400"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Security
            </h2>

            <p className="text-slate-500 dark:text-slate-400">
              Protect your account with advanced security
              options.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5">

        {/* ========================================== */}
        {/* Password */}
        {/* ========================================== */}

        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-indigo-100 p-3 dark:bg-indigo-900/40">
              <Lock
                size={22}
                className="text-indigo-600 dark:text-indigo-400"
              />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Password
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Change your account password.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleChangePassword}
            className="rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700"
          >
            Change
          </button>
        </div>

        {/* ========================================== */}
        {/* Two Factor Authentication */}
        {/* ========================================== */}

        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-100 p-3 dark:bg-emerald-900/40">
              <ShieldCheck
                size={22}
                className="text-emerald-600 dark:text-emerald-400"
              />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Two-Factor Authentication
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Add an extra layer of protection.
              </p>
            </div>
          </div>

          <Toggle
            checked={security.twoFactor}
            onChange={() => toggle("twoFactor")}
          />
        </div>

        {/* ========================================== */}
        {/* Login Alerts */}
        {/* ========================================== */}

        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-orange-100 p-3 dark:bg-orange-900/40">
              <BellRing
                size={22}
                className="text-orange-600 dark:text-orange-400"
              />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Login Alerts
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Get notified when a new device logs in.
              </p>
            </div>
          </div>

          <Toggle
            checked={security.loginAlerts}
            onChange={() => toggle("loginAlerts")}
          />
        </div>

        {/* ========================================== */}
        {/* Session Timeout */}
        {/* ========================================== */}

        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/40">
              <Clock3
                size={22}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Session Timeout
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Automatically sign out after inactivity.
              </p>
            </div>
          </div>

          <div className="relative">
            <select
              value={security.sessionTimeout}
              onChange={(e) =>
                changeTimeout(e.target.value)
              }
              disabled={saving}
              className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-4 pr-10 text-slate-700 outline-none transition focus:border-indigo-500 disabled:opacity-60 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
            >
              <option>15 Minutes</option>
              <option>30 Minutes</option>
              <option>1 Hour</option>
              <option>2 Hours</option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* Footer */}
      {/* ========================================== */}

      <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-700">
        <button
          type="button"
          onClick={handleLogoutAll}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 py-3 font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
        >
          <LogOut size={18} />
          Sign Out From All Devices
        </button>
      </div>
    </motion.div>
  );
};

export default SecuritySettingsCard;