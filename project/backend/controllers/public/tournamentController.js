import tournamentData from "../../data/tournamentData.js";

export const getTournaments = (req, res) => {
  res.json(tournamentData);
};