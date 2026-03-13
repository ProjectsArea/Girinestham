import {
  fetchPaymentMeta,
  fetchPaymentSubTypes,
  fetchPaymentsDashboard,
  getPaymentById,
  updateTournamentPayment,
  updateMembershipPayment,
  insertPayment,
  generateReceiptNumber,
  getPaymentStatusMap,
  getPaymentDecisionMap,
  isTransactionIdDuplicate,
  fetchPayments,
  rejectPayment,
  approvePayment,
  getMembershipById,
  incrementMembershipAmountPaid,
  insertStudentMembership,
} from "../../models/volunteer/paymentController.model.js";
import { logApplicationEvent } from "../../utils/logger.js";
import validator from "validator";

import {
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  DATABASE_CONSTANTS,
} from "../../constants/index.js";

const INVALID_INPUT_MESSAGE = ERROR_MESSAGES.INVALID_INPUT;
const PAYMENT_SUCCESS_MESSAGE = "Payment recorded successfully";

const validateCollectPaymentInput = (body) => {
  const errors = {};

  if (!Object.keys(body || {}).length) {
    errors.body = "data is required";
    return { error: errors, value: body };
  }

  if (!validator.isInt(body.student_id + "")) {
    errors.student_id = "Valid student_id is required";
  }
  //Todo: do i even need to validate this id's,
  // since they are guaranteed to be integers and not null.
  if (!validator.isInt(body.purpose_id + "")) {
    errors.purpose_id = "Valid purpose_id is required";
  }
  if (!validator.isInt(body.payment_mode_id + "")) {
    errors.payment_mode_id = "Valid payment_mode_id is required";
  }
  if (!validator.isInt(body.payment_sub_type_id + "")) {
    errors.payment_sub_type_id = "Valid payment_sub_type_id is required";
  }
  if (!validator.isInt(body.collected_by_id + "")) {
    errors.collected_by_id = "Valid collected_by_id is required";
  }
  if (body.reference_id != null && !validator.isInt(body.reference_id + "")) {
    errors.reference_id = "reference_id must be a valid integer";
  }
  if (
    !body.amount ||
    !Number.isFinite(Number(body.amount)) ||
    Number(body.amount) <= 0
  ) {
    errors.amount = "amount must be greater than 0";
  }

  return {
    error: Object.keys(errors).length ? errors : null,
    value: body,
  };
};

export const getPaymentMeta = async (req, res) => {
  const startTime = Date.now();

  try {
    const masters = await fetchPaymentMeta();
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "payment_masters",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.OK,
      message: "Payment masters fetched successfully",
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.OK).json({ success: true, ...masters });
  } catch (err) {
    const responseTime = Date.now() - startTime;
    logApplicationEvent({
      logLevel: "ERROR",
      logType: "payment_masters",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Payment masters DB error",
      stackTrace: err.stack,
      details: err.message,
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
      details: err.message,
    });
  }
};

export const getPaymentSubTypesByMode = async (req, res) => {
  const startTime = Date.now();

  if (!validator.isInt(String(req.query.payment_mode_id || ""))) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: INVALID_INPUT_MESSAGE,
      details: {
        payment_mode_id: "Valid payment_mode_id is required",
      },
    });
  }

  try {
    const subTypes = await fetchPaymentSubTypes(
      Number.parseInt(req.query.payment_mode_id, 10),
    );
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "payment_sub_types",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.OK,
      message: "Payment sub types fetched successfully",
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.OK).json({ success: true, subTypes });
  } catch (err) {
    const responseTime = Date.now() - startTime;
    logApplicationEvent({
      logLevel: "ERROR",
      logType: "payment_sub_types",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Payment sub types DB error",
      stackTrace: err.stack,
      details: err.message,
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
      details: err.message,
    });
  }
};

export const getPaymentsDashboard = async (req, res) => {
  const startTime = Date.now();

  try {
    const stats = await fetchPaymentsDashboard();
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "payment_dashboard",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.OK,
      message: "Payment dashboard fetched successfully",
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.OK).json({ success: true, stats });
  } catch (err) {
    const responseTime = Date.now() - startTime;
    logApplicationEvent({
      logLevel: "ERROR",
      logType: "payment_dashboard",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Payment dashboard DB error",
      stackTrace: err.stack,
      details: err.message,
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
      details: err.message,
    });
  }
};

export const listPayments = async (req, res) => {
  const startTime = Date.now();

  try {
    const result = await fetchPayments({
      page: req.query.page ? Number.parseInt(req.query.page, 10) : 1,
      limit: req.query.limit ? Number.parseInt(req.query.limit, 10) : 30,
      student_name: req.query.student_name || "",
      receipt_no: req.query.receipt_no || "",
      transaction_id: req.query.transaction_id || "",
      purpose_id: req.query.purpose_id || "",
      payment_mode_id: req.query.payment_mode_id || "",
      payment_status_id: req.query.payment_status_id || "",
      date_from: req.query.date_from || "",
      date_to: req.query.date_to || "",
      sort_by: req.query.sort_by || "",
      order: req.query.order || "",
    });

    const responseTime = Date.now() - startTime;
    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "payment_list",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.OK,
      message: "Payments fetched successfully",
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.OK).json({ success: true, ...result });
  } catch (err) {
    const responseTime = Date.now() - startTime;
    logApplicationEvent({
      logLevel: "ERROR",
      logType: "payment_list",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Payment list DB error",
      stackTrace: err.stack,
      details: err.message,
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
      details: err.message,
    });
  }
};

export const getPayment = async (req, res) => {
  const startTime = Date.now();

  if (!validator.isInt(String(req.params.id || ""))) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: INVALID_INPUT_MESSAGE,
      details: { id: "Valid payment id is required" },
    });
  }

  try {
    const payment = await getPaymentById(Number.parseInt(req.params.id, 10));
    if (!payment) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Payment not found",
      });
    }

    const responseTime = Date.now() - startTime;
    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "payment_get",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.OK,
      message: "Payment fetched successfully",
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.OK).json({ success: true, payment });
  } catch (err) {
    const responseTime = Date.now() - startTime;
    logApplicationEvent({
      logLevel: "ERROR",
      logType: "payment_get",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Payment fetch DB error",
      stackTrace: err.stack,
      details: err.message,
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
      details: err.message,
    });
  }
};

const buildBasePaymentPayload = (value) => ({
  payment_mode_id: Number(value.payment_mode_id),
  payment_sub_type_id: Number(value.payment_sub_type_id),
  collected_by_id: Number(value.collected_by_id),
  amount: Number(value.amount),
  purpose_id: Number(value.purpose_id),
  reference_id: value.reference_id ? Number(value.reference_id) : null,
  student_id: Number(value.student_id),
  remarks: value.remarks || null,
});

export const collectOnlinePayment = async (req, res) => {
  const startTime = Date.now();
  const { error, value } = validateCollectPaymentInput(req.body);

  if (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: INVALID_INPUT_MESSAGE,
      details: error,
    });
  }

  if (validator.isEmpty(String(value.transaction_id || ""))) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: INVALID_INPUT_MESSAGE,
      details: {
        transaction_id: "transaction_id is required for online payment",
      },
    });
  }

  try {
    const duplicate = await isTransactionIdDuplicate(value.transaction_id);
    if (duplicate) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: "Duplicate transaction id",
        details: { transaction_id: "transaction_id already exists" },
      });
    }

    const [paymentStatusMap, paymentDecisionMap] = await Promise.all([
      getPaymentStatusMap(),
      getPaymentDecisionMap(),
    ]);

    const successStatusId = paymentStatusMap.success;
    const approvedDecisionId =
      paymentDecisionMap.approved || paymentDecisionMap.accepted || null;

    const now = new Date();
    const paymentDate = now.toISOString().slice(0, 10);
    const paymentTime = now.toTimeString().slice(0, 8);

    const insertResult = await insertPayment({
      ...buildBasePaymentPayload(value),
      payment_date: paymentDate,
      payment_time: paymentTime,
      transaction_id: value.transaction_id,
      payment_status_id: successStatusId,
      payment_decision_id: approvedDecisionId,
      decision_date: paymentDate,
      proof: null,
      receipt_no: value.receipt_no || null,
    });

    // TODO: update fee_paid, fee_status_id, payment_id on membership/tournament and roll up totals to parent

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "payment_collect",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.CREATED,
      message: "Online payment recorded successfully",
      details: { payment_id: insertResult.insertId },
      responseTime: Date.now() - startTime,
      req,
    });

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: PAYMENT_SUCCESS_MESSAGE,
      data: {
        payment_id: insertResult.insertId,
        payment_status_id: successStatusId,
        payment_status: "Success",
      },
    });
  } catch (err) {
    if (err.code === DATABASE_CONSTANTS.ERROR_DUPLICATE_ENTRY) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: "Duplicate transaction identifier",
        details: err.message,
      });
    }

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "payment_collect",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Online payment collect DB error",
      stackTrace: err.stack,
      details: err.message,
      responseTime: Date.now() - startTime,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
      details: err.message,
    });
  }
};

export const collectOfflinePayment = async (req, res) => {
  const startTime = Date.now();
  const { error, value } = validateCollectPaymentInput(req.body);
  console.log(error);

  if (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: INVALID_INPUT_MESSAGE,
      details: error,
    });
  }

  if (validator.isEmpty(String(value.proof || ""))) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: INVALID_INPUT_MESSAGE,
      details: { proof: "proof is required for offline payment" },
    });
  }

  try {
    const paymentStatusMap = await getPaymentStatusMap();
    const paymentDecisionMap = await getPaymentDecisionMap();

    const pendingStatusId = paymentStatusMap.pending;

    const now = new Date();
    const paymentDate = now.toISOString().slice(0, 10);
    const paymentTime = now.toTimeString().slice(0, 8);
    const receiptNo = await generateReceiptNumber(paymentDate);

    const insertResult = await insertPayment({
      ...buildBasePaymentPayload(value),
      payment_date: paymentDate,
      payment_time: paymentTime,
      proof: value.proof,
      payment_status_id: pendingStatusId,
      payment_decision_id: paymentDecisionMap.pending,
      decision_date: null,
      transaction_id: null,
      receipt_no: receiptNo,
    });

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "payment_collect",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.CREATED,
      message: "Offline payment recorded successfully",
      details: { payment_id: insertResult.insertId },
      responseTime: Date.now() - startTime,
      req,
    });

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: PAYMENT_SUCCESS_MESSAGE,
      data: {
        payment_id: insertResult.insertId,
        payment_status_id: pendingStatusId,
        payment_status: "Pending",
        receipt_no: receiptNo,
      },
    });
  } catch (err) {
    logApplicationEvent({
      logLevel: "ERROR",
      logType: "payment_collect",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Offline payment collect DB error",
      stackTrace: err.stack,
      details: err.message,
      responseTime: Date.now() - startTime,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
      details: err.message,
    });
  }
};

export const approvePaymentHandler = async (req, res) => {
  const startTime = Date.now();

  const { id } = req.params;

  try {
    await approvePayment(id);
    const payment = await getPaymentById(id);

    //INFO: currently it only handlers membership payments.
    //TODO: handle tournamnets and other payment purposes.
    //TODO: handle multiple memberships for a single student.
    const membership = await getMembershipById(payment.reference_id);
    await incrementMembershipAmountPaid(payment.amount, membership.id);
    const studentMembership = await insertStudentMembership({
      student_id: payment.student_id,
      membership_id: membership.id,
      registration_date: new Date(),
      fee_paid: payment.amount,
      fee_type_id: null, //TODO: should be set based on the payment type.
      fee_status_id: payment.payment_status_id,
      payment_id: id,
    });
    //

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "payment_approve",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.CREATED,
      message: "payment approved successfully",
      details: { payment_id: id },
      responseTime: Date.now() - startTime,
      req,
    });
    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "payment approved successfully",
      details: { payment_id: id },
    });
  } catch (err) {
    logApplicationEvent({
      logLevel: "ERROR",
      logType: "payment_approve",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "payment approve DB error",
      stackTrace: err.stack,
      details: err.message,
      responseTime: Date.now() - startTime,
      req,
    });
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
      details: err.message,
    });
  }
};

export const rejectPaymentHandler = async (req, res) => {
  const startTime = Date.now();

  const { id } = req.params;
  try {
    await rejectPayment(id);

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "payment_reject",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.CREATED,
      message: "payment rejected successfully",
      details: { payment_id: id },
      responseTime: Date.now() - startTime,
      req,
    });
    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "payment rejected successfully",
      details: { payment_id: id },
    });
  } catch (err) {
    logApplicationEvent({
      logLevel: "ERROR",
      logType: "payment_reject",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "payment reject DB error",
      stackTrace: err.stack,
      details: err.message,
      responseTime: Date.now() - startTime,
      req,
    });
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
      details: err.message,
    });
  }
};
