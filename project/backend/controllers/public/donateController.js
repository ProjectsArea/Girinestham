import donateData from "../../data/donateData.js";

export const getDonateInfo = (req, res) => {
  res.json(donateData);
};