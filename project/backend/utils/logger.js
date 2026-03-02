import db from "../config/db.js";
import { APP_CONFIG } from "../constants/index.js";

/**
 * Centralized application logger
 */
export const logApplicationEvent = ({
  logLevel = "INFO",
  logType = "system",
  method = null,
  endpoint = null,
  userId = null,
  adminId = null,
  statusCode = null,
  message,
  details = null,
  stackTrace = null,
  responseTime = null,
  req = null,
}) => {
  try {
    const query =
      "CALL log_application_event(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(query, [
      logLevel,
      logType,
      method,
      endpoint,
      userId,
      adminId,
      req?.ip || null,
      req?.headers?.["user-agent"] || null,
      statusCode,
      message,
      details ? JSON.stringify(details) : null,
      stackTrace,
      responseTime,
      APP_CONFIG.SERVER_NAME || "main_server",
      process.env.NODE_ENV || "development",
    ]);
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
};