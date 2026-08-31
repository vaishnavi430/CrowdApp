import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaRegAddressCard,
} from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import AuthBanner from "../../components/auth/AuthBanner";
import api from "../../services/api";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "creator",
      });

      console.log("SignUp Successful:", response.data);

      alert("Registration Successful! Please login.");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        bio: "",
      });

      navigate("/login");
    } catch (error) {
      console.log(
        "Signup Error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Sign-up failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6 py-10">

      <div className="mx-auto flex w-full max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Left Banner */}
        <AuthBanner />

        {/* Right Form */}
        <div className="flex w-full items-center justify-center p-10 lg:w-[45%]">

          <div className="w-full max-w-md">

            {/* Heading */}
            <div className="mb-8 text-center">

              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg">

                <span className="text-3xl font-bold text-white">
                  CA
                </span>

              </div>

              <h2 className="text-4xl font-bold tracking-tight text-slate-900">
                Create Account
              </h2>

              <p className="mt-3 text-slate-500">
                Start your crowdfunding journey today.
              </p>

            </div>

            {/* Error */}
            {error && (
              <p className="mb-5 rounded-lg bg-red-100 p-3 text-center text-red-600">
                {error}
              </p>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <div className="relative">

                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    required
                  />

                </div>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>

                <div className="relative">

                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    required
                  />

                </div>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>

                <div className="relative">

                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                    placeholder="Create password"
                    className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>

                <div className="relative">

                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Confirm password"
                    className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Bio (Optional)
                </label>

                <div className="relative">

                  <FaRegAddressCard className="absolute left-4 top-5 text-gray-400" />

                  <textarea
                    rows="3"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bio: e.target.value,
                      })
                    }
                    placeholder="Tell us about yourself..."
                    className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />

                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <ImSpinner2 className="animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <p className="text-center text-gray-600">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-semibold text-indigo-600 hover:underline"
                >
                  Login
                </Link>

              </p>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SignUp;