import { useEffect, useState } from "react";

import SettingsHero from "../components/SettingsHero";
import AccountSettingsCard from "../components/AccountSettingsCard";
import NotificationSettingsCard from "../components/NotificationSettingsCard";
import SecuritySettingsCard from "../components/SecuritySettingsCard";
import AppearanceSettingsCard from "../components/AppearanceSettingsCard";
import PrivacySettingsCard from "../components/PrivacySettingsCard";
import DangerZoneCard from "../components/DangerZoneCard";

import api from "../../../services/api";

const Settings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const response = await api.get("/users/settings");

      setSettings(response.data.settings);
    } catch (error) {
      console.error(
        "Failed to load settings:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // ==========================================
  // Update Notifications in Parent
  // ==========================================

  const handleNotificationsChange = (
    notifications
  ) => {
    setSettings((previous) => ({
      ...previous,
      notifications,
    }));
  };

  // ==========================================
  // Update Security in Parent
  // ==========================================

  const handleSecurityChange = (
    security
  ) => {
    setSettings((previous) => ({
      ...previous,
      security,
    }));
  };

  // ==========================================
  // Update Appearance in Parent
  // ==========================================

  const handleAppearanceChange = (
    appearance
  ) => {
    setSettings((previous) => ({
      ...previous,
      appearance,
    }));
  };

  // ==========================================
  // Update Privacy in Parent
  // ==========================================

  const handlePrivacyChange = (
    privacy
  ) => {
    setSettings((previous) => ({
      ...previous,
      privacy,
    }));
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <p className="text-xl font-semibold text-slate-600">
          Loading settings...
        </p>
      </div>
    );
  }

  // ==========================================
  // Error
  // ==========================================

  if (!settings) {
    return (
      <div className="flex h-80 items-center justify-center">
        <div className="rounded-2xl bg-red-50 px-6 py-4 text-red-600">
          Failed to load settings.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero */}

      <SettingsHero />

      <div className="grid gap-8 xl:grid-cols-2">

        {/* Account */}

        <AccountSettingsCard />

        {/* Notifications */}

        <NotificationSettingsCard
          settings={settings.notifications}
          onSettingsChange={
            handleNotificationsChange
          }
        />

        {/* Security */}

        <SecuritySettingsCard
          settings={settings.security}
          onSettingsChange={
            handleSecurityChange
          }
        />

        {/* Appearance */}

        <AppearanceSettingsCard
          settings={settings.appearance}
          onSettingsChange={
            handleAppearanceChange
          }
        />

        {/* Privacy */}

        <PrivacySettingsCard
          settings={settings.privacy}
          onSettingsChange={
            handlePrivacyChange
          }
        />

        {/* Danger Zone */}

        <DangerZoneCard />

      </div>
    </div>
  );
};

export default Settings;