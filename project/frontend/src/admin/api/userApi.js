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

export const createUser = async (userData) => {
  try {
    const response = await api.post("/users/create", userData);
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
    const response = await api.put("/users/update", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update user");
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete user");
  }
};
