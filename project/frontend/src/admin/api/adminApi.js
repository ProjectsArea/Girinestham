import axios from "axios";
import config from "../../config/config.js";

const API_BASE_URL = config.BASE_URL;

// Function to get CSRF token from API
export const getCSRFToken = async () => {
  try {
    const response = await api.get("/admin/csrf");
    return response.data.csrfToken;
  } catch (error) {
    console.error("Failed to get CSRF token:", error);
    return null;
  }
};

// Function to get CSRF token from cookies (fallback)
const getCSRFTokenFromCookies = () => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === '_csrf') {
      return decodeURIComponent(value);
    }
  }
  return null;
};

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Required for CSRF cookies
});

// Add request interceptor to include auth token and CSRF token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add CSRF token for state-changing requests
    let csrfToken = getCSRFTokenFromCookies();
    if (!csrfToken && ['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase())) {
      // Try to get from API if not in cookies
      getCSRFToken().then(token => {
        if (token) {
          config.headers['X-CSRF-Token'] = token;
        }
      });
    }
    
    if (csrfToken && ['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase())) {
      config.headers['X-CSRF-Token'] = csrfToken;
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
    // First get CSRF token
    const csrfToken = await getCSRFToken();
    
    const response = await api.post("/admin/login", credentials, {
      headers: {
        'X-CSRF-Token': csrfToken
      }
    });
    
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data);
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
