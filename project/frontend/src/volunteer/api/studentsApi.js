import axios from "axios";
import config from "../../config/config.js";

const API_BASE_URL = config.BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const STUDENTS_API_PREFIX = "/volunteer/students";

export const getStudentStats = async () => {
  try {
    const response = await api.get(`${STUDENTS_API_PREFIX}/stats`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch student stats",
    );
  }
};

export const getStudents = async () => {
  try {
    const response = await api.get(`${STUDENTS_API_PREFIX}/`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch student stats",
    );
  }
};

export const getSportsList = async () => {
  try {
    const response = await api.get(`${STUDENTS_API_PREFIX}/sports`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch sports list",
    );
  }
};

export const createStudent = async (csrfToken, payload) => {
  try {
    const response = await api.post(`${STUDENTS_API_PREFIX}/create`, payload, {
      headers: {
        "X-CSRF-TOKEN": csrfToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create user");
  }
};

export const searchStudents = async ({
  page,
  limit,
  sortColumn,
  sortOrder,
  searchName,
}) => {
  try {
    const response = await api.get(
      `${STUDENTS_API_PREFIX}/search?page=${page}&limit=${limit}${sortColumn ? `&sort_by=${sortColumn}&order=${sortOrder}` : ""}${searchName ? `&name=${searchName}` : ""}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch student stats",
    );
  }
};
