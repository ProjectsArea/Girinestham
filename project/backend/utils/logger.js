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
    // Temporarily disable database logging to prevent table errors
    // TODO: Create proper application_logs table and re-enable
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${logLevel}] ${message} hi messge`, {
        logType,
        method,
        endpoint,
        userId,
        adminId,
        statusCode,
        details,
        responseTime
      });
    }
  } catch (err) {
    // Only log to console in development to avoid infinite loops
    if (process.env.NODE_ENV === 'development') {
      console.error("Logging failed:", err.message);
    }
  }
};