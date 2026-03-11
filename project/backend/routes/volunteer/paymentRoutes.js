import express from "express";
import {
  getPaymentMeta,
  getPaymentSubTypesByMode,
  getPaymentsDashboard,
  listPayments,
  getPayment,
  collectOfflinePayment,
  collectOnlinePayment,
} from "../../controllers/volunteer/paymentController.js";

const router = express.Router();

router.get("/meta", getPaymentMeta);
router.get("/sub-types", getPaymentSubTypesByMode);
router.get("/dashboard", getPaymentsDashboard);
router.get("/", listPayments);
router.get("/:id", getPayment);

router.post("/collect/offline", collectOfflinePayment);
router.post("/collect/online", collectOnlinePayment);

export default router;
