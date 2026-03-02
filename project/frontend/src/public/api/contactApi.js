import config from "../../config/config";

export const fetchContactInfo = async () => {
  try {
    const response = await fetch(`${config.BASE_URL}/contact`);

    if (!response.ok) {
      throw new Error("Failed to fetch contact information");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return null;
  }
};