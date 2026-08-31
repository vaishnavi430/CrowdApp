const settingsData = {
  notifications: {
    email: true,
    push: true,
    campaignUpdates: true,
    donations: true,
    marketing: false,
  },

  security: {
    twoFactor: true,
    loginAlerts: true,
    sessionTimeout: "30 Minutes",
  },

  appearance: {
    theme: "Light",
    language: "English",
  },

  privacy: {
    profilePublic: true,
    showEmail: false,
    showPhone: false,
  },
};

export default settingsData;