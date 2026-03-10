import jwt from "jsonwebtoken";
import { HTTP_STATUS, ERROR_MESSAGES, APP_CONFIG } from "../constants/index.js";
import { logApplicationEvent } from "../utils/logger.js";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const authenticateAdmin = (req, res, next) => {
  const startTime = Date.now();

  try {
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      const responseTime = Date.now() - startTime;

      logApplicationEvent({
        logLevel: "WARNING",
        logType: "admin_auth",
        method: req.method,
        endpoint: req.originalUrl,
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: "Admin authentication failed - No token provided",
        responseTime,
        req,
      });

      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.NO_TOKEN_PROVIDED,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (
      decoded.role !== APP_CONFIG.ADMIN_ROLES.ADMIN &&
      decoded.role !== APP_CONFIG.ADMIN_ROLES.SUPER_ADMIN
    ) {
      const responseTime = Date.now() - startTime;

      logApplicationEvent({
        logLevel: "WARNING",
        logType: "admin_auth",
        method: req.method,
        endpoint: req.originalUrl,
        adminId: decoded.id,
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: "Forbidden admin access attempt",
        details: { role: decoded.role },
        responseTime,
        req,
      });

      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: ERROR_MESSAGES.FORBIDDEN_ADMIN_ACCESS,
      });
    }

    /* ================= SUCCESS ================= */
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "admin_auth",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: decoded.id,
      statusCode: HTTP_STATUS.OK,
      message: "Admin authenticated successfully",
      details: { role: decoded.role },
      responseTime,
      req,
    });

    req.admin = decoded;
    next();
  } catch (err) {
    const responseTime = Date.now() - startTime;

    if (err.name === "TokenExpiredError") {
      logApplicationEvent({
        logLevel: "WARNING",
        logType: "admin_auth",
        method: req.method,
        endpoint: req.originalUrl,
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: "Admin token expired",
        stackTrace: err.stack,
        responseTime,
        req,
      });

      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.TOKEN_EXPIRED,
      });
    }

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "admin_auth",
      method: req.method,
      endpoint: req.originalUrl,
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: "Invalid admin token",
      stackTrace: err.stack,
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: ERROR_MESSAGES.INVALID_TOKEN,
    });
  }
};