import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/admin";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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

export const createRole = async (roleData) => {
  try {
    const response = await api.post("/roles/create", roleData);
    return response.data;
  } catch (error) {
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
    const response = await api.put("/roles/update", roleData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update role");
  }
};
