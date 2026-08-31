import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Search,
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useSidebar } from "../../../contexts/SidebarContext";
import { useAuth } from "../../../contexts/AuthContext";

const DashboardHeader = () => {
  const { toggleSidebar } = useSidebar();
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // ==========================================
  // Close Dropdowns When Clicking Outside
  // ==========================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ==========================================
  // Notification
  // ==========================================

  const handleNotificationClick = () => {
    setNotificationOpen((previous) => !previous);
    setProfileOpen(false);
  };

  // ==========================================
  // Profile Dropdown
  // ==========================================

  const handleProfileClick = () => {
    setProfileOpen((previous) => !previous);
    setNotificationOpen(false);
  };

  // ==========================================
  // Profile
  // ==========================================

  const handleProfile = () => {
    setProfileOpen(false);
    navigate("/dashboard/profile");
  };

  // ==========================================
  // Settings
  // ==========================================

  const handleSettings = () => {
    setProfileOpen(false);
    navigate("/dashboard/settings");
  };

  // ==========================================
  // Logout
  // ==========================================

  const handleLogout = async () => {
    setProfileOpen(false);

    await logout();

    navigate("/login", {
      replace: true,
    });
  };

  const userName =
    user?.name || "User";

  const userRole =
    user?.role === "creator"
      ? "Campaign Creator"
      : user?.role === "backer"
      ? "Supporter"
      : "User";

  const userInitial =
    userName.charAt(0).toUpperCase();

  return (
    <motion.header
      initial={{
        y: -25,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.4,
      }}
      className="sticky top-0 z-40 border-b border-white/30 bg-white/80 px-4 py-5 shadow-sm backdrop-blur-xl md:px-8 dark:border-slate-700 dark:bg-slate-900/90"
    >
      <div className="flex items-center justify-between gap-6">

        {/* ==========================================
            Left
        ========================================== */}

        <div className="flex items-center gap-4">

          {/* Mobile Menu */}

          <button
            type="button"
            onClick={toggleSidebar}
            className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 transition hover:bg-slate-100 lg:hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <Menu size={22} />
          </button>

          <div>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
              Dashboard
            </span>

            <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
              Welcome Back 👋
            </h1>

            <p className="mt-1 text-slate-500 dark:text-slate-400">
              Here's what's happening with your
              campaigns today.
            </p>
          </div>
        </div>

        {/* ==========================================
            Right
        ========================================== */}

        <div className="flex items-center gap-4">

          {/* ========================================
              Search
          ======================================== */}

          <div className="relative hidden lg:block">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search campaigns..."
              className="w-80 rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:ring-indigo-900/30"
            />
          </div>

          {/* ========================================
              Notifications
          ======================================== */}

          <div
            ref={notificationRef}
            className="relative"
          >
            <button
              type="button"
              onClick={handleNotificationClick}
              aria-label="Notifications"
              className={`relative rounded-2xl border p-3 transition-all ${
                notificationOpen
                  ? "border-indigo-500 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                  : "border-slate-200 bg-white text-slate-700 hover:border-indigo-500 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Bell size={20} />

              {/* Notification Dot */}

              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
            </button>

            {/* Notification Panel */}

            {notificationOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -8,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                className="absolute right-0 mt-3 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      Notifications
                    </h3>

                    <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
                      0
                    </span>
                  </div>
                </div>

                <div className="px-5 py-8 text-center">
                  <Bell
                    size={32}
                    className="mx-auto text-slate-300 dark:text-slate-600"
                  />

                  <p className="mt-3 font-medium text-slate-700 dark:text-slate-200">
                    No new notifications
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    You're all caught up.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* ========================================
              Profile
          ======================================== */}

          <div
            ref={profileRef}
            className="relative"
          >
            <button
              type="button"
              onClick={handleProfileClick}
              aria-label="Open profile menu"
              className={`flex items-center gap-3 rounded-2xl border px-3 py-2 transition-all ${
                profileOpen
                  ? "border-indigo-500 bg-indigo-50 shadow-md dark:bg-indigo-900/30"
                  : "border-slate-200 bg-white hover:border-indigo-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
              }`}
            >
              {/* Avatar */}

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-lg font-bold text-white shadow-lg">
                {userInitial}
              </div>

              {/* User Info */}

              <div className="hidden text-left lg:block">
                <p className="font-semibold text-slate-900 dark:text-white">
                  {userName}
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {userRole}
                </p>
              </div>

              <ChevronDown
                size={18}
                className={`hidden text-slate-400 transition-transform lg:block ${
                  profileOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {/* Profile Dropdown */}

            {profileOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -8,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-700 dark:bg-slate-800"
              >
                {/* User Header */}

                <div className="border-b border-slate-200 px-3 py-3 dark:border-slate-700">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {userName}
                  </p>

                  <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
                    {user?.email || ""}
                  </p>
                </div>

                {/* Profile */}

                <button
                  type="button"
                  onClick={handleProfile}
                  className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-indigo-400"
                >
                  <User size={18} />

                  <span>
                    Profile
                  </span>
                </button>

                {/* Settings */}

                <button
                  type="button"
                  onClick={handleSettings}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-indigo-400"
                >
                  <Settings size={18} />

                  <span>
                    Settings
                  </span>
                </button>

                {/* Logout */}

                <div className="my-2 border-t border-slate-200 dark:border-slate-700" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <LogOut size={18} />

                  <span>
                    Logout
                  </span>
                </button>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;