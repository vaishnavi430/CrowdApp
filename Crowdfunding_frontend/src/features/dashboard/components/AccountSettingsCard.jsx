import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Save,
} from "lucide-react";

import api from "../../../services/api";

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-400 dark:focus:bg-slate-800 dark:focus:ring-indigo-900/30";

const AccountSettingsCard = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // Fetch Profile
  // ==========================================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/profile");

        const user = response.data.user;

        setForm({
          name: user?.name || "",
          email: user?.email || "",
          phone: user?.phone || "",
          address: user?.address || "",
          bio: user?.bio || "",
        });
      } catch (error) {
        console.error(
          "Failed to load account information:",
          error
        );

        alert(
          error.response?.data?.message ||
            "Failed to load account information."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ==========================================
  // Handle Input Change
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // Save Profile
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    try {
      setSaving(true);

      const response = await api.put("/users/profile", {
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        bio: form.bio.trim(),
      });

      const updatedUser = response.data.user;

      setForm((prev) => ({
        ...prev,
        name: updatedUser?.name || "",
        email: updatedUser?.email || prev.email,
        phone: updatedUser?.phone || "",
        address: updatedUser?.address || "",
        bio: updatedUser?.bio || "",
      }));

      // ==========================================
      // Keep localStorage User Data Updated
      // ==========================================

      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...parsedUser,
              ...updatedUser,
            })
          );
        } catch (error) {
          console.error(
            "Failed to update local user data:",
            error
          );
        }
      }

      alert(
        response.data.message ||
          "Profile updated successfully."
      );
    } catch (error) {
      console.error(
        "Failed to update profile:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
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
        <div className="flex h-48 items-center justify-center text-slate-500 dark:text-slate-400">
          Loading account information...
        </div>
      </motion.div>
    );
  }

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
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Account Information
        </h2>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Update your personal information and account
          details.
        </p>
      </div>

      {/* ========================================== */}
      {/* Form */}
      {/* ========================================== */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid gap-6 md:grid-cols-2">

          {/* Full Name */}

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <User size={16} />
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Enter full name"
            />
          </div>

          {/* Email */}

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <Mail size={16} />
              Email Address
            </label>

            <input
              type="email"
              value={form.email}
              disabled
              className={`${inputClass} cursor-not-allowed opacity-70`}
              placeholder="Email address"
            />

            <p className="mt-2 text-xs text-slate-400">
              Email changes are not available from this page.
            </p>
          </div>

          {/* Phone */}

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <Phone size={16} />
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter phone number"
            />
          </div>

          {/* Address */}

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <MapPin size={16} />
              Address
            </label>

            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter address"
            />
          </div>

          {/* Bio */}

          <div className="md:col-span-2">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <FileText size={16} />
              Bio
            </label>

            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={5}
              className={inputClass}
              placeholder="Tell us about yourself"
            />
          </div>
        </div>

        {/* ========================================== */}
        {/* Save Button */}
        {/* ========================================== */}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={18} />

            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AccountSettingsCard;