import express from "express";
import { getHomeData } from "../../controllers/public/homeController.js";

const router = express.Router();

router.get("/", getHomeData);

export default router;