import axios from "axios";
import config from "../../config/config.js";

const API_BASE_URL = `${config.BASE_URL}/admin`;

// Function to get CSRF token from API
export const getCSRFToken = async () => {
  try {
    const response = await axios.get(`${config.BASE_URL}/admin/csrf`, {
      withCredentials: true
    });
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

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Required for CSRF cookies
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add CSRF token for state-changing requests
    const csrfToken = getCSRFToken();
    if (csrfToken && ['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase())) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createUser = async (userData) => {
  try {
    // First get CSRF token
    const csrfToken = await getCSRFToken();
    
    const response = await api.post("/users/create", userData, {
      headers: {
        'X-CSRF-Token': csrfToken
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create user");
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};

export const updateUser = async (userData) => {
  try {
    // First get CSRF token
    const csrfToken = await getCSRFToken();
    
    const response = await api.put("/users/update", userData, {
      headers: {
        'X-CSRF-Token': csrfToken
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update user");
  }
};

export const deleteUser = async (userId) => {
  try {
    // First get CSRF token
    const csrfToken = await getCSRFToken();
    
    const response = await api.delete(`/users/${userId}`, {
      headers: {
        'X-CSRF-Token': csrfToken
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete user");
  }
};
