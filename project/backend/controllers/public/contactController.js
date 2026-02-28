import contactData from "../../data/contactData.js";

export const getContactInfo = (req, res) => {
  res.json(contactData);
};