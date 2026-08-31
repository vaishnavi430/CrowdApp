import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// ==========================================
// Automatically attach JWT token
// ==========================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ==========================================
    // Only set JSON Content-Type for normal
    // requests.
    //
    // For FormData, the browser/Axios must
    // automatically set multipart/form-data
    // with the correct boundary.
    // ==========================================

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] =
        "application/json";
    } else {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================
// Handle expired/invalid authentication
// globally
// ==========================================

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);

export default api;