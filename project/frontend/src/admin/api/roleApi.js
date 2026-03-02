import axios from "axios";
import config from "../../config/config.js";

const API_BASE_URL = config.BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Required for cookies
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
    const response = await api.post("/admin/roles/create", roleData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create role");
  }
};

export const getRoles = async () => {
  try {
    const response = await api.get("/admin/roles");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch roles");
  }
};

export const updateRole = async (roleData) => {
  try {
    const response = await api.put("/admin/roles/update", roleData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update role");
  }
};
