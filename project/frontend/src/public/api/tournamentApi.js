import config from "../../config/config";

export const fetchTournaments = async () => {
  try {
    const response = await fetch(`${config.BASE_URL}/tournaments`);

    if (!response.ok) {
      throw new Error("Failed to fetch tournaments");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    return null;
  }
};