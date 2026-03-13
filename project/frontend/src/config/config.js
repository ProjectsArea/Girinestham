import axios from "axios";
export const BASE_URL ="http://localhost:5000/api"
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default {
  BASE_URL,
  API
};