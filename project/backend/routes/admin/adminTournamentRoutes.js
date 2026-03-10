// import express from 'express';

// import { createTournament } from '../../controllers/admin/tournamentController.js';
// const router = express.Router();

// router.get('/',createTournament);


// export default router;
 import express from "express";
import {
  createTournamentController,
  getAllTournamentsController,
  getTournamentByIdController,
  updateTournamentController,
  deleteTournamentController,
} from "../../controllers/admin/adminTournamentController.js";

const router = express.Router();

router.post("/", createTournamentController);
router.get("/", getAllTournamentsController);
router.get("/:id", getTournamentByIdController);
router.put("/:id", updateTournamentController);
router.delete("/:id", deleteTournamentController);

export default router;