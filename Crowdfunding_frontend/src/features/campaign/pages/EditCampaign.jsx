import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const EditCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    goalAmount: "",
    deadline: "",
  });

  const [existingImage, setExistingImage] =
    useState("");

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] =
    useState("");

  const [error, setError] = useState("");

  // ==========================================
  // Fetch Campaign
  // ==========================================

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/projects/${id}`
        );

        const campaign =
          response.data.project;

        if (!campaign) {
          throw new Error(
            "Campaign not found."
          );
        }

        setFormData({
          title: campaign.title || "",
          description:
            campaign.description || "",
          category:
            campaign.category || "",
          goalAmount:
            campaign.goalAmount ?? "",
          deadline: campaign.deadline
            ? campaign.deadline.slice(0, 10)
            : "",
        });

        setExistingImage(
          campaign.image || ""
        );
      } catch (error) {
        console.error(
          "Fetch campaign error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Unable to load campaign."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCampaign();
    }
  }, [id]);

  // ==========================================
  // Cleanup Preview
  // ==========================================

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // ==========================================
  // Handle Inputs
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
  // Handle New Image
  // ==========================================

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

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
  // Remove New Image
  // ==========================================

  const handleRemoveNewImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImage(null);
    setImagePreview("");

    const fileInput =
      document.getElementById(
        "campaign-image"
      );

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

    const goalAmount = Number(
      formData.goalAmount
    );

    if (!Number.isFinite(goalAmount) || goalAmount <= 0) {
      setError(
        "Goal amount must be greater than 0."
      );
      return;
    }

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
      setSaving(true);

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

      // Only send image when a new image
      // was selected.
      if (image) {
        data.append(
          "image",
          image
        );
      }

      await api.put(
        `/projects/${id}`,
        data
      );

      alert(
        "Campaign updated successfully!"
      );

      navigate("/dashboard/campaigns");
    } catch (error) {
      console.error(
        "Update campaign error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update campaign."
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
      <div className="flex h-80 items-center justify-center">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

          <p className="mt-4 text-slate-600">
            Loading campaign...
          </p>

        </div>
      </div>
    );
  }

  // ==========================================
  // Render
  // ==========================================

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
          Edit Campaign
        </h1>

        <p className="mt-2 text-slate-500">
          Update your campaign information.
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
            Current / New Image
        ========================================== */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Campaign Image
          </label>

          {imagePreview ? (
            <div className="relative overflow-hidden rounded-2xl border border-slate-200">
              <img
                src={imagePreview}
                alt="New campaign preview"
                className="h-72 w-full object-cover"
              />

              <button
                type="button"
                onClick={handleRemoveNewImage}
                className="absolute right-4 top-4 rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80"
                aria-label="Remove new image"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-3 text-sm font-medium text-white">
                New image selected
              </div>
            </div>
          ) : existingImage ? (
            <div className="relative overflow-hidden rounded-2xl border border-slate-200">
              <img
                src={existingImage}
                alt="Current campaign"
                className="h-72 w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src =
                    "https://placehold.co/1200x600?text=No+Image";
                }}
              />

              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-3 text-sm font-medium text-white">
                Current campaign image
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
              No campaign image available.
            </div>
          )}

          {/* Upload New Image */}
          <label
            htmlFor="campaign-image"
            className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <ImagePlus size={20} />

            {imagePreview
              ? "Choose Different Image"
              : "Replace Campaign Image"}

            <input
              id="campaign-image"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <p className="mt-2 text-xs text-slate-500">
            JPG, PNG, JPEG or WEBP — maximum 5 MB.
            Leave unchanged to keep the current image.
          </p>
        </div>

        {/* ==========================================
            Goal
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
          disabled={saving}
          className="w-full rounded-xl bg-indigo-600 py-4 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Updating Campaign..."
            : "Update Campaign"}
        </button>
      </form>
    </motion.div>
  );
};

export default EditCampaign;