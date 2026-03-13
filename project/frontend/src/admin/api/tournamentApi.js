import config, { BASE_URL } from "../../config/config";
import { getCsrfToken } from "../../public/api/authApi";

const TOURNAMENTS_PATH = `${BASE_URL}/admin/tournaments`;

const getCsrfTokenFromStorage = () => {
  return localStorage.getItem('csrfToken') || null;
};

const getOrFetchCsrfToken = async () => {       
  let token = getCsrfTokenFromStorage();
  
  if (!token) {
    token = await getCsrfToken();
    if (token) {
      localStorage.setItem('csrfToken', token);
    }
  }
  
  return token;
};

/* Get All Tournaments */
export const getTournaments = async () => {
  try {
    const response = await fetch(TOURNAMENTS_PATH);

    if (!response.ok) {
      throw new Error("Failed to fetch tournaments");
    }

    return await response.json();

  } catch (error) {
    console.error("Error fetching tournaments:", error);
    return [];
  }
};

/* Get Tournament by ID */
export const getTournamentById = async (id) => {
  try {
    const response = await fetch(`${TOURNAMENTS_PATH}/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch tournament");
    }

    return await response.json();

  } catch (error) {
    console.error("Error fetching tournament:", error);
    return null;
  }
};

/* Create Tournament */
export const createTournament = async (data) => {
  try {
    const csrfToken = await getOrFetchCsrfToken();
    
    const response = await fetch(`${TOURNAMENTS_PATH}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create tournament");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating tournament:", error);
    return null;
  }
};

/* Update Tournament */
export const updateTournament = async (id, data) => {
  try {
    const csrfToken = await getOrFetchCsrfToken();
    
    const response = await fetch(`${TOURNAMENTS_PATH}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update tournament");
    }

    return await response.json();

  } catch (error) {
    console.error("Error updating tournament:", error);
    return null;
  }
};

/* Delete Tournament */
export const deleteTournament = async (id) => {
  try {
    const csrfToken = await getOrFetchCsrfToken();
    
    console.log(csrfToken)
    const response = await fetch(`${TOURNAMENTS_PATH}/${id}`, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": csrfToken,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete tournament");
    }

    return await response.json();

  } catch (error) {
    console.error("Error deleting tournament:", error);
    return null;
  }
};

/* Get Tournament Registrations */
export const getTournamentRegistrations = async (tournamentId) => {
  try {
    const response = await fetch(`${TOURNAMENTS_PATH}/${tournamentId}/registrations`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tournament registrations");
    }

    return await response.json();

  } catch (error) {
    console.error("Error fetching tournament registrations:", error);
    return null;
  }
};