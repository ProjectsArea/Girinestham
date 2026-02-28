import config from "../../config/config";

export const fetchHomeData = async () => {
  try {
    const response = await fetch(`${config.BASE_URL}/home`);

    if (!response.ok) {
      throw new Error("Failed to fetch home data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching home data:", error);
    return null;
  }
};