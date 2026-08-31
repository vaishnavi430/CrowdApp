import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Download,
  Trash2,
} from "lucide-react";

import api from "../../../services/api";

const DangerZoneCard = () => {
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ==========================================
  // Export Data
  // ==========================================

  const handleExportData = async () => {
    try {
      setExporting(true);

      const response = await api.get(
        "/users/export-data"
      );

      const data = response.data.data;

      const json = JSON.stringify(
        data,
        null,
        2
      );

      const blob = new Blob(
        [json],
        {
          type: "application/json",
        }
      );

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download = `crowdapp-data-${new Date()
        .toISOString()
        .split("T")[0]}.json`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

      alert(
        "Your data has been exported successfully."
      );
    } catch (error) {
      console.error(
        "Export data error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to export your data."
      );
    } finally {
      setExporting(false);
    }
  };

  // ==========================================
  // Delete Account
  // ==========================================

  const handleDeleteAccount = async () => {
    const firstConfirm = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!firstConfirm) {
      return;
    }

    const secondConfirm = window.confirm(
      "This will permanently delete your profile, campaigns, and donation records. This action cannot be undone. Continue?"
    );

    if (!secondConfirm) {
      return;
    }

    try {
      setDeleting(true);

      await api.delete(
        "/users/account"
      );

      // Remove authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem(
        "appearanceSettings"
      );

      alert(
        "Your account has been deleted successfully."
      );

      // Redirect to login
      window.location.href = "/login";
    } catch (error) {
      console.error(
        "Delete account error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete your account."
      );

      setDeleting(false);
    }
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
      className="overflow-hidden rounded-3xl border border-red-200 bg-white shadow-xl"
    >
      {/* ================================= */}
      {/* Header */}
      {/* ================================= */}

      <div className="border-b border-red-100 bg-gradient-to-r from-red-50 via-white to-red-50 p-8">
        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-red-100 p-4">
            <AlertTriangle
              size={28}
              className="text-red-600"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-red-700">
              Danger Zone
            </h2>

            <p className="mt-2 text-slate-600">
              These actions are permanent and
              cannot be undone. Please proceed
              carefully.
            </p>
          </div>

        </div>
      </div>

      <div className="space-y-6 p-8">

        {/* ================================= */}
        {/* Export Data */}
        {/* ================================= */}

        <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Export Your Data
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Download a complete copy of your
              account, campaigns, donations,
              and profile information.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportData}
            disabled={exporting || deleting}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-indigo-200 bg-white px-6 py-3 font-semibold text-indigo-600 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download size={18} />

            {exporting
              ? "Exporting..."
              : "Export Data"}
          </button>

        </div>

        {/* ================================= */}
        {/* Delete Account */}
        {/* ================================= */}

        <div className="flex flex-col gap-6 rounded-2xl border border-red-200 bg-red-50 p-6 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h3 className="text-lg font-semibold text-red-700">
              Delete Account
            </h3>

            <p className="mt-2 text-sm text-red-600">
              Deleting your account permanently
              removes your profile, campaigns,
              and donation records. This action
              cannot be reversed.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={deleting || exporting}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={18} />

            {deleting
              ? "Deleting..."
              : "Delete Account"}
          </button>

        </div>

        {/* ================================= */}
        {/* Warning */}
        {/* ================================= */}

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">

          <div className="flex items-start gap-4">

            <AlertTriangle
              size={22}
              className="mt-0.5 flex-shrink-0 text-amber-600"
            />

            <div>

              <h4 className="font-semibold text-amber-700">
                Important Notice
              </h4>

              <p className="mt-2 text-sm leading-7 text-amber-700">
                Before deleting your account,
                we recommend exporting your data.
                Once your account is removed,
                your campaigns, donation history,
                supporter records, and profile
                information cannot be recovered.
              </p>

            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default DangerZoneCard;