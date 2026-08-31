import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  HeartHandshake,
  Download,
} from "lucide-react";

import api from "../../../services/api";

import DonationStats from "../components/DonationStats";
import DonationToolbar from "../components/DonationToolbar";
import DonationTable from "../components/DonationTable";

const Donations = () => {
  const [donations, setDonations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ==========================================
  // Filters
  // ==========================================

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const [payment, setPayment] =
    useState("All");

  const [date, setDate] =
    useState("");

  // ==========================================
  // Fetch Donations
  // ==========================================

  const fetchDonations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/donations/my-donations"
      );

      setDonations(
        response.data.donations || []
      );
    } catch (error) {
      console.error(
        "Error fetching donations:",
        error
      );

      setDonations([]);

      setError(
        error.response?.data?.message ||
          "Unable to load your donations."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Initial Load
  // ==========================================

  useEffect(() => {
    fetchDonations();
  }, []);

  // ==========================================
  // Filter Donations
  // ==========================================

  const filteredDonations = useMemo(() => {
    const searchText =
      search.trim().toLowerCase();

    return donations.filter(
      (donation) => {
        const campaign =
          donation.project || {};

        const campaignTitle =
          campaign.title
            ?.toLowerCase() || "";

        const campaignCategory =
          campaign.category
            ?.toLowerCase() || "";

        // Search
        const matchesSearch =
          !searchText ||
          campaignTitle.includes(
            searchText
          ) ||
          campaignCategory.includes(
            searchText
          );

        // Status
        const matchesStatus =
          status === "All" ||
          donation.paymentStatus ===
            status;

        // Payment
        const matchesPayment =
          payment === "All" ||
          payment === "Online";

        // Date
        let matchesDate = true;

        if (date) {
          const donationDate =
            donation.donatedAt ||
            donation.createdAt;

          if (donationDate) {
            const localDate =
              new Date(donationDate)
                .toISOString()
                .slice(0, 10);

            matchesDate =
              localDate === date;
          } else {
            matchesDate = false;
          }
        }

        return (
          matchesSearch &&
          matchesStatus &&
          matchesPayment &&
          matchesDate
        );
      }
    );
  }, [
    donations,
    search,
    status,
    payment,
    date,
  ]);

  // ==========================================
  // Clear Filters
  // ==========================================

  const handleClearFilters = () => {
    setSearch("");
    setStatus("All");
    setPayment("All");
    setDate("");
  };

  // ==========================================
  // Export Report
  // ==========================================

  const handleExportReport = () => {
    if (
      filteredDonations.length === 0
    ) {
      alert(
        "There are no donations to export."
      );

      return;
    }

    const headers = [
      "Campaign",
      "Category",
      "Amount",
      "Payment Status",
      "Donation Date",
    ];

    const rows =
      filteredDonations.map(
        (donation) => {
          const campaign =
            donation.project || {};

          const donationDate =
            donation.donatedAt ||
            donation.createdAt;

          return [
            campaign.title ||
              "Unknown Campaign",
            campaign.category || "N/A",
            donation.amount || 0,
            donation.paymentStatus ||
              "N/A",
            donationDate
              ? new Date(
                  donationDate
                ).toLocaleDateString()
              : "N/A",
          ];
        }
      );

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => {
            const text = String(
              value ?? ""
            );

            return `"${text.replace(
              /"/g,
              '""'
            )}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "donation-report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />

          <p className="mt-4 font-semibold text-slate-600">
            Loading donations...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // Error
  // ==========================================

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="w-full max-w-lg rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <h2 className="text-xl font-bold text-red-700">
            Unable to Load Donations
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <button
            onClick={fetchDonations}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="space-y-8">
      {/* Hero */}

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
          duration: 0.4,
        }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-8 text-white shadow-2xl"
      >
        <div className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
              <HeartHandshake size={16} />

              Donations Overview
            </div>

            <h1 className="text-4xl font-bold">
              Donations
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-emerald-100">
              Track your donations and
              fundraising contributions
              across all campaigns.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportReport}
            disabled={
              filteredDonations.length ===
              0
            }
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-emerald-700 shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            <Download size={20} />

            Export Report
          </button>
        </div>
      </motion.div>

      {/* Stats */}

      <DonationStats
        donations={donations}
      />

      {/* Toolbar */}

      <DonationToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        payment={payment}
        setPayment={setPayment}
        date={date}
        setDate={setDate}
        onExport={handleExportReport}
        onClearFilters={
          handleClearFilters
        }
      />

      {/* Table */}

      <DonationTable
        donations={filteredDonations}
      />
    </div>
  );
};

export default Donations;