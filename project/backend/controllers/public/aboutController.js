import aboutData from "../../data/aboutData.js";

export const getAboutData = (req, res) => {
  res.json(aboutData);
};