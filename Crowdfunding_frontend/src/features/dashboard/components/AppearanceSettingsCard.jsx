import { motion } from "framer-motion";
import {
  Palette,
  Monitor,
  Sun,
  Moon,
  Globe,
  LayoutGrid,
} from "lucide-react";

import { useTheme } from "../../../contexts/ThemeContext";

const AppearanceSettingsCard = ({ settings }) => {
  const {
    settings: globalAppearance,
    updateAppearance,
  } = useTheme();

  const theme =
    globalAppearance?.theme ||
    settings?.theme ||
    "Light";

  const language =
    settings?.language ||
    "English";

  const density =
    globalAppearance?.density ||
    settings?.density ||
    "Comfortable";

  const accent =
    globalAppearance?.accent ||
    settings?.accent ||
    "Indigo";

  const accentColors = [
    {
      name: "Indigo",
      color: "bg-indigo-600",
    },
    {
      name: "Emerald",
      color: "bg-emerald-600",
    },
    {
      name: "Rose",
      color: "bg-rose-600",
    },
    {
      name: "Amber",
      color: "bg-amber-500",
    },
    {
      name: "Sky",
      color: "bg-sky-500",
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
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="rounded-2xl bg-violet-100 p-3 dark:bg-violet-900/40">
          <Palette
            size={24}
            className="text-violet-600 dark:text-violet-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Appearance
          </h2>

          <p className="text-slate-500 dark:text-slate-400">
            Personalize the dashboard experience.
          </p>
        </div>
      </div>

      <div className="space-y-8">

        {/* ================================= */}
        {/* Theme */}
        {/* ================================= */}

        <div>
          <label className="mb-4 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
            <Monitor size={18} />
            Theme
          </label>

          <div className="grid grid-cols-3 gap-3">
            {[
              {
                name: "Light",
                icon: Sun,
              },
              {
                name: "Dark",
                icon: Moon,
              },
              {
                name: "System",
                icon: Monitor,
              },
            ].map((item) => {
              const Icon = item.icon;

              const isSelected =
                theme === item.name;

              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() =>
                    updateAppearance({
                      theme: item.name,
                    })
                  }
                  style={
                    isSelected
                      ? {
                          borderColor:
                            "var(--accent-color)",
                          color:
                            "var(--accent-color)",
                          backgroundColor:
                            "color-mix(in srgb, var(--accent-color) 10%, transparent)",
                        }
                      : undefined
                  }
                  className={`rounded-2xl border p-4 transition-all duration-300 ${
                    isSelected
                      ? "shadow-md"
                      : "border-slate-200 text-slate-600 hover:border-indigo-300 dark:border-slate-700 dark:text-slate-300"
                  }`}
                >
                  <Icon
                    size={24}
                    className="mx-auto mb-2"
                  />

                  <p className="font-medium">
                    {item.name}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================= */}
        {/* Language */}
        {/* ================================= */}

        <div>
          <label className="mb-3 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
            <Globe size={18} />
            Language
          </label>

          <select
            value={language}
            onChange={(e) =>
              updateAppearance({
                language: e.target.value,
              })
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>

        {/* ================================= */}
        {/* Dashboard Density */}
        {/* ================================= */}

        <div>
          <label className="mb-3 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
            <LayoutGrid size={18} />
            Dashboard Density
          </label>

          <select
            value={density}
            onChange={(e) =>
              updateAppearance({
                density: e.target.value,
              })
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <option>Comfortable</option>
            <option>Compact</option>
          </select>
        </div>

        {/* ================================= */}
        {/* Accent Color */}
        {/* ================================= */}

        <div>
          <label className="mb-4 block font-semibold text-slate-700 dark:text-slate-200">
            Accent Color
          </label>

          <div className="flex flex-wrap gap-4">
            {accentColors.map((item) => {
              const isSelected =
                accent === item.name;

              return (
                <button
                  type="button"
                  key={item.name}
                  title={item.name}
                  aria-label={`Select ${item.name} accent`}
                  onClick={() =>
                    updateAppearance({
                      accent: item.name,
                    })
                  }
                  className={`h-12 w-12 rounded-full ${item.color} transition-all duration-300 ${
                    isSelected
                      ? "scale-110 ring-4 ring-slate-300 dark:ring-slate-600"
                      : "hover:scale-105"
                  }`}
                />
              );
            })}
          </div>

          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Selected:{" "}
            <span
              className="font-semibold"
              style={{
                color: "var(--accent-color)",
              }}
            >
              {accent}
            </span>
          </p>
        </div>

        {/* ================================= */}
        {/* Preview */}
        {/* ================================= */}

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Preview
          </h3>

          <div className="mt-4 rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800">
            <div className="mb-3 h-3 w-2/3 rounded bg-slate-300 dark:bg-slate-600" />

            <div className="mb-6 h-2 w-full rounded bg-slate-200 dark:bg-slate-700" />

            <div className="flex gap-3">
              {/* Dynamic Accent */}
              <div
                className="h-10 w-10 rounded-xl"
                style={{
                  backgroundColor:
                    "var(--accent-color)",
                }}
              />

              <div className="flex-1">
                <div className="mb-2 h-3 w-1/2 rounded bg-slate-300 dark:bg-slate-600" />

                <div className="h-2 w-full rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default AppearanceSettingsCard;