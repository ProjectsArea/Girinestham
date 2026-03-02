import express from "express";
import { getContactInfo } from "../../controllers/public/contactController.js";

const router = express.Router();

router.get("/", getContactInfo);

export default router;