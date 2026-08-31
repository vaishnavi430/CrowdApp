import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

import api from "../../../services/api";

const DonationModal = ({
  campaignId,
  onClose,
  onSuccess,
}) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // Handle Amount
  // ==========================================

  const handleAmountChange = (e) => {
    const value = e.target.value;

    // Allow empty value
    if (value === "") {
      setAmount("");
      setError("");
      return;
    }

    // Only allow positive numeric values
    if (!/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setAmount(value);
    setError("");
  };

  // ==========================================
  // Handle Donation
  // ==========================================

  const handleDonate = async () => {
    setError("");

    const donationAmount = Number(amount);

    // ==========================================
    // Validate Amount
    // ==========================================

    if (!amount.trim()) {
      setError(
        "Please enter a donation amount."
      );
      return;
    }

    if (
      !Number.isFinite(donationAmount) ||
      donationAmount <= 0
    ) {
      setError(
        "Donation amount must be greater than 0."
      );
      return;
    }

    if (!Number.isInteger(donationAmount)) {
      setError(
        "Please enter a whole-number amount."
      );
      return;
    }

    // ==========================================
    // Validate Campaign ID
    // ==========================================

    if (!campaignId) {
      setError(
        "Campaign information is missing."
      );
      return;
    }

    try {
      setLoading(true);

      await api.post(
        "/donations",
        {
          projectId: campaignId,
          amount: donationAmount,
        }
      );

      alert("Donation Successful!");

      // Refresh campaign details and
      // supporter information.
      if (onSuccess) {
        await onSuccess();
      }

      onClose();
    } catch (error) {
      console.error(
        "Donation error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Donation failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Handle Enter Key
  // ==========================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleDonate();
    }

    if (e.key === "Escape" && !loading) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      onClick={!loading ? onClose : undefined}
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.25,
        }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
      >
        {/* ==========================================
            Header
        ========================================== */}

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Donate
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Support this campaign
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close donation modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* ==========================================
            Amount
        ========================================== */}

        <div className="mt-6">
          <label
            htmlFor="donation-amount"
            className="mb-2 block font-medium text-slate-700"
          >
            Donation Amount
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-slate-500">
              ₹
            </span>

            <input
              id="donation-amount"
              type="text"
              inputMode="numeric"
              placeholder="Enter amount"
              value={amount}
              onChange={handleAmountChange}
              onKeyDown={handleKeyDown}
              disabled={loading}
              autoFocus
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-lg outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-100"
            />
          </div>
        </div>

        {/* ==========================================
            Error
        ========================================== */}

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* ==========================================
            Buttons
        ========================================== */}

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDonate}
            disabled={loading}
            className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : "Donate"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DonationModal;