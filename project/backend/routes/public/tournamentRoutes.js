import express from "express";
import { getTournaments } from "../../controllers/public/tournamentController.js";

const router = express.Router();

router.get("/", getTournaments);

export default router;