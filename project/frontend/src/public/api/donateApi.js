import config from "../../config/config";

export const fetchDonateInfo = async () => {
  try {
    const response = await fetch(`${config.BASE_URL}/donate`);

    if (!response.ok) {
      throw new Error("Failed to fetch donation information");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching donation info:", error);
    return null;
  }
};