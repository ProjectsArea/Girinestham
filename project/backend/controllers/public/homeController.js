import homeData from "../../data/homeData.js";

export const getHomeData = (req, res) => {
  res.json(homeData);
};