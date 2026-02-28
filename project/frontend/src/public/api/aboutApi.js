import config from "../../config/config";

export const fetchAboutData = async () => {
  try {
    const response = await fetch(`${config.BASE_URL}/about`);

    if (!response.ok) {
      throw new Error("Failed to fetch about data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
};