import axios from "axios";
import config from "../../config/config.js";

const API_BASE_URL = `${config.BASE_URL}`;

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
  console.log("All cookies:", document.cookie);
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === '_csrf') {
      console.log("Found CSRF token:", decodeURIComponent(value));
      return decodeURIComponent(value);
    }
  }
  console.log("CSRF token not found in cookies");
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

export const createRole = async (roleData) => {
  try {
    console.log("Creating role - fetching CSRF token first...");
    // First get CSRF token
    const csrfToken = await getCSRFToken();
    console.log("CSRF token fetched:", csrfToken ? "Success" : "Failed");
    
    const response = await api.post("/roles/create", roleData, {
      headers: {
        'X-CSRF-Token': csrfToken
      }
    });
    console.log("Role creation successful");
    return response.data;
  } catch (error) {
    console.error("Role creation failed:", error.response?.data);
    throw new Error(error.response?.data?.message || "Failed to create role");
  }
};

export const getRoles = async () => {
  try {
    const response = await api.get("/roles");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch roles");
  }
};

export const updateRole = async (roleData) => {
  try {
    // First get CSRF token
    const csrfToken = await getCSRFToken();
    
    const response = await api.put("/roles/update", roleData, {
      headers: {
        'X-CSRF-Token': csrfToken
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update role");
  }
};

export const deleteRole = async (roleId) => {
  try {
    // First get CSRF token
    const csrfToken = await getCSRFToken();
    
    const response = await api.delete(`/roles/${roleId}`, {
      headers: {
        'X-CSRF-Token': csrfToken
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete role");
  }
};
