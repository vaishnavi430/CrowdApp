import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ImagePlus, X } from "lucide-react";

import api from "../../../services/api";

const categories = [
  "Technology",
  "Education",
  "Healthcare",
  "Environment",
  "Animals",
  "Agriculture",
  "Energy",
  "Business",
  "Art",
  "Community",
];

const CreateCampaign = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    goalAmount: "",
    deadline: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // Cleanup Image Preview
  // ==========================================

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // ==========================================
  // Handle Text Inputs
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // ==========================================
  // Handle Image
  // ==========================================

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError(
        "Please select a JPG, JPEG, PNG, or WEBP image."
      );

      e.target.value = "";
      return;
    }

    // Validate file size
    const maxSize = 5 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
      setError(
        "Image size must be less than 5 MB."
      );

      e.target.value = "";
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImage(selectedFile);
    setImagePreview(
      URL.createObjectURL(selectedFile)
    );
    setError("");
  };

  // ==========================================
  // Remove Image
  // ==========================================

  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImage(null);
    setImagePreview("");

    const fileInput =
      document.getElementById("campaign-image");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Image is required for a new campaign
    if (!image) {
      setError(
        "Please select a campaign image."
      );
      return;
    }

    // Goal validation
    const goalAmount = Number(
      formData.goalAmount
    );

    if (!Number.isFinite(goalAmount) || goalAmount <= 0) {
      setError(
        "Goal amount must be greater than 0."
      );
      return;
    }

    // Deadline validation
    if (!formData.deadline) {
      setError(
        "Please select a campaign deadline."
      );
      return;
    }

    const selectedDeadline = new Date(
      `${formData.deadline}T23:59:59`
    );

    if (selectedDeadline <= new Date()) {
      setError(
        "Campaign deadline must be in the future."
      );
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append(
        "title",
        formData.title.trim()
      );

      data.append(
        "description",
        formData.description.trim()
      );

      data.append(
        "category",
        formData.category
      );

      data.append(
        "goalAmount",
        String(goalAmount)
      );

      data.append(
        "deadline",
        formData.deadline
      );

      data.append(
        "image",
        image
      );

      await api.post(
        "/projects",
        data
      );

      alert(
        "Campaign created successfully!"
      );

      navigate("/dashboard/campaigns");
    } catch (error) {
      console.error(
        "Create campaign error:",
        error
      );

      console.error(
        "Backend response:",
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
        JSON.stringify(
          error.response?.data || {}
        ) ||
        "Failed to create campaign."
      );
    } finally {
      setLoading(false);
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
      className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Create Campaign
        </h1>

        <p className="mt-2 text-slate-500">
          Share your idea and start raising funds.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* ==========================================
            Title
        ========================================== */}

        <div>
          <label
            htmlFor="campaign-title"
            className="mb-2 block font-medium text-slate-700"
          >
            Campaign Title
          </label>

          <input
            id="campaign-title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={150}
            placeholder="Enter your campaign title"
            className="w-full rounded-xl border border-slate-200 p-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {/* ==========================================
            Description
        ========================================== */}

        <div>
          <label
            htmlFor="campaign-description"
            className="mb-2 block font-medium text-slate-700"
          >
            Description
          </label>

          <textarea
            id="campaign-description"
            rows={6}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Explain what your campaign is about..."
            className="w-full resize-y rounded-xl border border-slate-200 p-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {/* ==========================================
            Category
        ========================================== */}

        <div>
          <label
            htmlFor="campaign-category"
            className="mb-2 block font-medium text-slate-700"
          >
            Category
          </label>

          <select
            id="campaign-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* ==========================================
            Image Upload
        ========================================== */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Campaign Image
          </label>

          {!imagePreview ? (
            <label
              htmlFor="campaign-image"
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center transition hover:border-indigo-500 hover:bg-indigo-50"
            >
              <ImagePlus
                size={42}
                className="text-indigo-500"
              />

              <p className="mt-4 font-semibold text-slate-700">
                Upload campaign image
              </p>

              <p className="mt-1 text-sm text-slate-500">
                JPG, PNG, JPEG or WEBP — maximum 5 MB
              </p>

              <input
                id="campaign-image"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative overflow-hidden rounded-2xl border border-slate-200">
              <img
                src={imagePreview}
                alt="Campaign preview"
                className="h-72 w-full object-cover"
              />

              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute right-4 top-4 rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80"
                aria-label="Remove image"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>

        {/* ==========================================
            Goal Amount
        ========================================== */}

        <div>
          <label
            htmlFor="campaign-goal"
            className="mb-2 block font-medium text-slate-700"
          >
            Goal Amount
          </label>

          <input
            id="campaign-goal"
            type="number"
            name="goalAmount"
            value={formData.goalAmount}
            onChange={handleChange}
            required
            min="1"
            step="1"
            placeholder="Enter funding goal"
            className="w-full rounded-xl border border-slate-200 p-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {/* ==========================================
            Deadline
        ========================================== */}

        <div>
          <label
            htmlFor="campaign-deadline"
            className="mb-2 block font-medium text-slate-700"
          >
            Deadline
          </label>

          <input
            id="campaign-deadline"
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            min={
              new Date(
                Date.now() + 86400000
              )
                .toISOString()
                .split("T")[0]
            }
            className="w-full rounded-xl border border-slate-200 p-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {/* ==========================================
            Submit
        ========================================== */}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 py-4 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Creating Campaign..."
            : "Create Campaign"}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateCampaign;