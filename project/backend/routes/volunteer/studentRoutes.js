import express from "express";
import {
  createStudent,
  getStudents,
  searchStudents,
  updateStudent,
  getStudentStats,
  getPendingApprovalStatus,
  deactiveStudent,
  getStudent,
  getSportsList,
  getMemberShipPlans,
} from "../../controllers/volunteer/studentController.js";

const router = express.Router();

router.get("/", getStudents);
router.get("/search", searchStudents);
router.get("/stats", getStudentStats);
router.get("/pending-approval", getPendingApprovalStatus);
router.get("/sports", getSportsList);
router.get("/membership-plans", getMemberShipPlans);
router.get("/:id", getStudent);

router.post("/create", createStudent);
router.put("/update/:id", updateStudent);
router.delete("/:id", deactiveStudent);

export default router;
