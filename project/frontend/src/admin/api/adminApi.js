import axios from "axios";
import config from "../../config/config.js";

const API_BASE_URL = config.BASE_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Required for cookies
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, remove from storage
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminInfo");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const adminLogin = async (credentials) => {
  try {
    const response = await api.post("/admin/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const verifyAdminToken = async () => {
  try {
    const response = await api.get("/admin/verify");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Token verification failed");
  }
};

export const adminLogout = async () => {
  try {
    const response = await api.post("/admin/logout");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export default api;
