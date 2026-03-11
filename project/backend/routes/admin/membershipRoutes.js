import express from "express";

import {
  createMembership,
  getMemberships,
  getMembershipById,
  updateMembership,
  deleteMembership,
  getMembershipDashboard,
  activateMembershipController,
  deactivateMembershipController,
} from "../../controllers/admin/membershipController.js";

const router = express.Router();

/* CREATE */
router.post("/", createMembership);

/* LIST */
router.get("/", getMemberships);

/* DASHBOARD */
router.get("/dashboard", getMembershipDashboard);

/* GET BY ID */
router.get("/:id", getMembershipById);

/* UPDATE */
router.put("/:id", updateMembership);

/* DELETE */
router.delete("/:id", deleteMembership);

/* ACTIVATE */
router.patch("/:id/activate", activateMembershipController);

/* DEACTIVATE */
router.patch("/:id/deactivate", deactivateMembershipController);

export default router;