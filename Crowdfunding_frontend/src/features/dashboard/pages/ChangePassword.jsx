import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import api from "../../../services/api";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccess("");
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");

    if (
      !form.currentPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {
      alert("Please fill in all password fields.");
      return;
    }

    if (form.newPassword.length < 6) {
      alert(
        "New password must be at least 6 characters."
      );
      return;
    }

    if (
      form.newPassword !== form.confirmPassword
    ) {
      alert(
        "New Password and Confirm Password do not match."
      );
      return;
    }

    if (
      form.currentPassword === form.newPassword
    ) {
      alert(
        "New password must be different from your current password."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await api.put(
        "/users/change-password",
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }
      );

      setSuccess(
        response.data.message ||
          "Password changed successfully."
      );

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/dashboard/settings");
      }, 1500);
    } catch (error) {
      console.error(
        "Change password error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100";

  const PasswordField = ({
    name,
    label,
    placeholder,
    field,
  }) => {
    const visible = showPassword[field];

    return (
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Lock size={16} />
          {label}
        </label>

        <div className="relative">
          <input
            type={visible ? "text" : "password"}
            name={name}
            value={form[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className={inputClass}
            disabled={loading}
            autoComplete={
              name === "currentPassword"
                ? "current-password"
                : "new-password"
            }
          />

          <button
            type="button"
            onClick={() =>
              togglePassword(field)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-indigo-600"
            aria-label={
              visible
                ? "Hide password"
                : "Show password"
            }
          >
            {visible ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur-xl">

        {/* Header */}

        <div className="mb-8">
          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/settings")
            }
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={18} />
            Back to Settings
          </button>

          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-indigo-100 p-4">
              <Lock
                size={26}
                className="text-indigo-600"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Change Password
              </h1>

              <p className="mt-2 text-slate-500">
                Update your account password to keep
                your account secure.
              </p>
            </div>
          </div>
        </div>

        {/* Success Message */}

        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
            <CheckCircle2 size={20} />

            <p className="font-medium">
              {success}
            </p>
          </div>
        )}

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <PasswordField
            name="currentPassword"
            label="Current Password"
            placeholder="Enter your current password"
            field="current"
          />

          <PasswordField
            name="newPassword"
            label="New Password"
            placeholder="Enter your new password"
            field="new"
          />

          <PasswordField
            name="confirmPassword"
            label="Confirm New Password"
            placeholder="Confirm your new password"
            field="confirm"
          />

          {/* Password Requirement */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-700">
              Password requirements
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Your new password must contain at
              least 6 characters.
            </p>
          </div>

          {/* Buttons */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() =>
                navigate("/dashboard/settings")
              }
              disabled={loading}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Changing Password..."
                : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;