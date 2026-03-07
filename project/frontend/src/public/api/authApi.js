import config from "../../config/config";

export const getCsrfToken = async () => {
  try {
    const response = await fetch(`${config.BASE_URL}/csrf-token`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    return data.csrfToken;
  } catch (error) {
    console.error("Failed to get CSRF token:", error);
    return null;
  }
};

export const loginAdmin = async (formData, csrfToken) => {
  const response = await fetch(`${config.BASE_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  return response;
};

export const getRoles = async () => {
  try {
    const response = await fetch(`${config.BASE_URL}/admin/roles`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error('Failed to fetch roles');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Failed to get roles:", error);
    return [];
  }
};

export const logoutAdmin = async (token, csrfToken) => {
  return fetch(`${config.BASE_URL}/admin/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-CSRF-Token": csrfToken,
    },
    credentials: "include",
  });
};