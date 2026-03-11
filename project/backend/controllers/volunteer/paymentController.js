import {
  fetchPaymentMeta,
  fetchPaymentSubTypes,
  fetchPaymentsDashboard,
  getPaymentById,
} from "../../models/volunteer/paymentController.model";

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
