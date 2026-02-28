import express from "express";
import { getDonateInfo } from "../../controllers/public/donateController.js";

const router = express.Router();

router.get("/", getDonateInfo);

export default router;