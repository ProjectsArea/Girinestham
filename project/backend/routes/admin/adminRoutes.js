import express from "express";
import { getRolesController } from "../../controllers/admin/adminController.js";

const router = express.Router();

// Middleware to add start time for response time calculation
router.use((req, res, next) => {
    req.startTime = Date.now();
    next();
});

// GET /api/admin/roles - Get all active roles
router.get("/roles", getRolesController);

export default router;