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

const PAYMENTS_API_PREFIX = "/volunteer/payments";
const STUDENTS_API_PREFIX = "/volunteer/students";

export const getPaymentMeta = async () => {
  try {
    const response = await api.get(`${PAYMENTS_API_PREFIX}/meta`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch payment meta",
    );
  }
};

export const getPaymentSubTypesByMode = async (modeId) => {
  try {
    const response = await api.get(
      `${PAYMENTS_API_PREFIX}/sub-types?payment_mode_id=${modeId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch payment sub-types",
    );
  }
};

export const getPaymentsDashboard = async () => {
  try {
    const response = await api.get(`${PAYMENTS_API_PREFIX}/dashboard`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch dashboard stats",
    );
  }
};

export const listPayments = async ({
  page,
  limit,
  search,
  mode,
  status,
  purpose,
  startDate,
  endDate,
  sortColumn,
  sortOrder,
}) => {
  try {
    const params = new URLSearchParams();
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (search) params.append("student_name", search);
    if (mode) params.append("payment_mode_id", mode);
    if (status) params.append("payment_status_id", status);
    if (purpose) params.append("purpose_id", purpose);
    if (startDate) params.append("date_from", startDate);
    if (endDate) params.append("date_to", endDate);
    if (sortColumn) params.append("sort_by", sortColumn);
    if (sortOrder) params.append("order", sortOrder);

    const response = await api.get(
      `${PAYMENTS_API_PREFIX}/?${params.toString()}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || "Failed to list payments");
  }
};

export const searchStudentsForPayment = async (query) => {
  try {
    const response = await api.get(
      `${STUDENTS_API_PREFIX}/search?name=${query}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.message || "Failed to search students",
    );
  }
};

export const rejectPayment = async (paymentId) => {
  try {
    const response = await api.get(
      `${PAYMENTS_API_PREFIX}/${paymentId}/reject`,
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to reject payment",
    );
  }
};

export const approvePayment = async (paymentId) => {
  try {
    const response = await api.get(
      `${PAYMENTS_API_PREFIX}/${paymentId}/approve`,
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to approve payment",
    );
  }
};

export const collectOfflinePayment = async (paymentData, csrfToken) => {
  try {
    const response = await api.post(
      `${PAYMENTS_API_PREFIX}/collect/offline`,
      paymentData,
      {
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to collect offline payment",
    );
  }
};
