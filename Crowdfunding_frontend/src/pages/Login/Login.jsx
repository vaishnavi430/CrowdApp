import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

import AuthBanner from "../../components/auth/AuthBanner";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);

      setEmail("");
      setPassword("");

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Login Error:", error);

      setError(
        error.response?.data?.message ||
          "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6 py-10">
      <div className="mx-auto flex w-full max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Left Side */}
        <AuthBanner />

        {/* Right Side */}
        <div className="flex w-full items-center justify-center p-10 lg:w-[45%]">

          <div className="w-full max-w-md">

            <div className="mb-8 text-center">

              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg">
                <span className="text-3xl font-bold text-white">
                  CA
                </span>
              </div>

              <h2 className="text-4xl font-bold tracking-tight text-slate-900">
                Welcome Back
              </h2>

              <p className="mt-3 text-slate-500">
                Login to your CrowdApp account
              </p>

              <p className="mt-2 text-gray-500">
                Sign in to continue
              </p>

            </div>

            {error && (
              <p className="mb-4 rounded-lg bg-red-100 p-3 text-center text-red-600">
                {error}
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>

                <div className="relative">

                  <FaEnvelope
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    required
                  />

                </div>

              </div>

              {/* Password */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>

                <div className="relative">

                  <FaLock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
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

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between text-sm">

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-indigo-600 hover:underline"
                >
                  Forgot Password?
                </button>

              </div>

              {/* Login */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <ImSpinner2 className="animate-spin text-lg" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

            </form>

            <p className="mt-8 text-center text-gray-600">
              Don't have an account?{" "}

              <Link
                to="/signup"
                className="font-semibold text-indigo-600 hover:underline"
              >
                Sign Up
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;