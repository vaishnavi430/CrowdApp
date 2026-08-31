import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const ThemeContext = createContext();

/* ==========================================
   Default Appearance
========================================== */

const defaultAppearance = {
  theme: "Light",
  accent: "Indigo",
  density: "Comfortable",
  language: "English",
};

/* ==========================================
   Accent Colors
========================================== */

const accentMap = {
  Indigo: {
    main: "#4f46e5",
    hover: "#4338ca",
    light: "#eef2ff",
    text: "#4f46e5",
  },

  Emerald: {
    main: "#059669",
    hover: "#047857",
    light: "#ecfdf5",
    text: "#059669",
  },

  Rose: {
    main: "#e11d48",
    hover: "#be123c",
    light: "#fff1f2",
    text: "#e11d48",
  },

  Amber: {
    main: "#f59e0b",
    hover: "#d97706",
    light: "#fffbeb",
    text: "#d97706",
  },

  Sky: {
    main: "#0ea5e9",
    hover: "#0284c7",
    light: "#f0f9ff",
    text: "#0ea5e9",
  },
};

/* ==========================================
   Theme Provider
========================================== */

export const ThemeProvider = ({ children }) => {
  const [settings, setSettings] = useState(
    defaultAppearance
  );

  const [loading, setLoading] = useState(true);

  /* ==========================================
     Load Saved Settings
  ========================================== */

  useEffect(() => {
    const loadSettings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(
          "/users/settings"
        );

        const appearance =
          response.data.settings?.appearance;

        if (appearance) {
          const savedAppearance = {
            ...defaultAppearance,
            ...appearance,
          };

          setSettings(savedAppearance);

          localStorage.setItem(
            "appearanceSettings",
            JSON.stringify(savedAppearance)
          );
        }
      } catch (error) {
        console.error(
          "Failed to load appearance settings:",
          error
        );

        const storedAppearance =
          localStorage.getItem(
            "appearanceSettings"
          );

        if (storedAppearance) {
          try {
            const parsedAppearance =
              JSON.parse(storedAppearance);

            setSettings({
              ...defaultAppearance,
              ...parsedAppearance,
            });
          } catch (error) {
            console.error(
              "Failed to read local appearance settings:",
              error
            );
          }
        }
      } finally {
        setLoading(false);
      }
    };

    /* Load local settings immediately */

    const storedAppearance =
      localStorage.getItem(
        "appearanceSettings"
      );

    if (storedAppearance) {
      try {
        const parsedAppearance =
          JSON.parse(storedAppearance);

        setSettings({
          ...defaultAppearance,
          ...parsedAppearance,
        });
      } catch (error) {
        console.error(
          "Invalid local appearance settings:",
          error
        );
      }
    }

    loadSettings();
  }, []);

  /* ==========================================
     Apply Light / Dark / System
  ========================================== */

  useEffect(() => {
    const root = document.documentElement;

    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const applyTheme = () => {
      let darkMode = false;

      if (settings.theme === "Dark") {
        darkMode = true;
      }

      if (settings.theme === "Light") {
        darkMode = false;
      }

      if (settings.theme === "System") {
        darkMode = mediaQuery.matches;
      }

      root.classList.toggle(
        "dark",
        darkMode
      );
    };

    applyTheme();

    const handleSystemThemeChange = () => {
      if (settings.theme === "System") {
        applyTheme();
      }
    };

    mediaQuery.addEventListener(
      "change",
      handleSystemThemeChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleSystemThemeChange
      );
    };
  }, [settings.theme]);

  /* ==========================================
     Apply Accent
  ========================================== */

  useEffect(() => {
    const root = document.documentElement;

    const accent =
      accentMap[settings.accent] ||
      accentMap.Indigo;

    root.style.setProperty(
      "--accent-color",
      accent.main
    );

    root.style.setProperty(
      "--accent-hover",
      accent.hover
    );

    root.style.setProperty(
      "--accent-light",
      accent.light
    );

    root.style.setProperty(
      "--accent-text",
      accent.text
    );
  }, [settings.accent]);

  /* ==========================================
     Apply Density
  ========================================== */

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove(
      "density-comfortable",
      "density-compact"
    );

    if (settings.density === "Compact") {
      root.classList.add(
        "density-compact"
      );
    } else {
      root.classList.add(
        "density-comfortable"
      );
    }
  }, [settings.density]);

  /* ==========================================
     Update Appearance
  ========================================== */

  const updateAppearance = async (
    newSettings
  ) => {
    const updatedSettings = {
      ...settings,
      ...newSettings,
    };

    /* Update immediately */

    setSettings(updatedSettings);

    /* Save locally */

    localStorage.setItem(
      "appearanceSettings",
      JSON.stringify(updatedSettings)
    );

    /* Save backend */

    try {
      await api.put(
        "/users/settings",
        {
          appearance: updatedSettings,
        }
      );
    } catch (error) {
      console.error(
        "Failed to save appearance settings:",
        error
      );
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        settings,
        updateAppearance,
        loading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/* ==========================================
   Hook
========================================== */

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
};