import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Wallet,
  Settings,
  User,
  LogOut,
  Sparkles,
  X,
  ArrowLeft,
  Home,
} from "lucide-react";

import { motion } from "framer-motion";

import { useSidebar } from "../../../contexts/SidebarContext";
import { useAuth } from "../../../contexts/AuthContext";

const mainMenuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Campaigns",
    path: "/dashboard/campaigns",
    icon: FolderKanban,
  },
  {
    name: "Donations",
    path: "/dashboard/donations",
    icon: Wallet,
  },
];

const accountMenuItems = [
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

const DashboardSidebar = () => {
  const {
    sidebarOpen,
    closeSidebar,
  } = useSidebar();

  const {
    user,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
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
      : "Member";

  const userInitial =
    userName.charAt(0).toUpperCase();

  const renderMenuItem = (item, index) => {
    const Icon = item.icon;

    return (
      <motion.div
        key={item.path}
        initial={{
          opacity: 0,
          x: -10,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          delay: index * 0.05,
        }}
      >
        <NavLink
          to={item.path}
          end={item.path === "/dashboard"}
          onClick={closeSidebar}
          className={({ isActive }) =>
            `group relative flex items-center gap-3 rounded-xl px-3.5 py-3 transition-all duration-200 ${
              isActive
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                  isActive
                    ? "bg-white/15"
                    : "bg-slate-100 group-hover:bg-indigo-100 dark:bg-slate-800 dark:group-hover:bg-indigo-900/30"
                }`}
              >
                <Icon size={19} />
              </div>

              <span className="text-sm font-semibold">
                {item.name}
              </span>

              {isActive && (
                <motion.div
                  layoutId="sidebar-active-dot"
                  className="ml-auto h-2 w-2 rounded-full bg-white"
                />
              )}
            </>
          )}
        </NavLink>
      </motion.div>
    );
  };

  return (
    <aside
      className={`
        fixed
        left-0
        top-0
        z-50
        flex
        h-screen
        w-72
        flex-col
        border-r
        border-slate-200
        bg-white
        shadow-xl
        transition-transform
        duration-300
        dark:border-slate-700
        dark:bg-slate-900
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
        lg:translate-x-0
      `}
    >
      {/* ==========================================
          Brand
      ========================================== */}

      <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-700">
        <Link
          to="/"
          onClick={closeSidebar}
          className="group flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-600/20 transition-transform duration-300 group-hover:scale-105">
            <Sparkles
              size={22}
              className="text-white"
            />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              CrowdApp
            </h1>

            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Creator Dashboard
            </p>
          </div>
        </Link>

        {/* Mobile Close */}

        <button
          type="button"
          onClick={closeSidebar}
          className="absolute right-4 top-5 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <X size={19} />
        </button>
      </div>

      {/* ==========================================
          Navigation
      ========================================== */}

      <nav className="flex-1 overflow-y-auto px-4 py-6">

        {/* Workspace */}

        <div>
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Workspace
          </p>

          <div className="space-y-1.5">
            {mainMenuItems.map(
              renderMenuItem
            )}
          </div>
        </div>

        {/* Account */}

        <div className="mt-8">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Account
          </p>

          <div className="space-y-1.5">
            {accountMenuItems.map(
              (item, index) =>
                renderMenuItem(
                  item,
                  index + mainMenuItems.length
                )
            )}
          </div>
        </div>
      </nav>

      {/* ==========================================
          Back To Website
      ========================================== */}

      <div className="border-t border-slate-200 px-4 py-3 dark:border-slate-700">
        <Link
          to="/"
          onClick={closeSidebar}
          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
        >
          <ArrowLeft size={18} />

          <span>
            Back to Website
          </span>

          <Home
            size={16}
            className="ml-auto opacity-50 transition group-hover:opacity-100"
          />
        </Link>
      </div>

      {/* ==========================================
          Compact User Card
      ========================================== */}

      <div className="border-t border-slate-200 p-4 dark:border-slate-700">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70">

          {/* User */}

          <div className="flex items-center gap-3">

            {/* Avatar */}

            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-md">
              {userInitial}
            </div>

            {/* Name */}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                {userName}
              </p>

              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {userRole}
              </p>
            </div>
          </div>

          {/* Logout */}

          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-red-900/50 dark:hover:bg-red-900/20 dark:hover:text-red-400"
          >
            <LogOut size={16} />

            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;