import jwt from "jsonwebtoken";
import { HTTP_STATUS, ERROR_MESSAGES, APP_CONFIG } from "../../constants/index.js";
import { logApplicationEvent } from "../../utils/logger.js";
import { SECURITY_CONSTANTS } from "../../constants/security.js";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const verifyAdminToken = (req, res, next) => {
  const startTime = Date.now();

  try {
    /* ================= GET TOKEN ================= */
    const token =
      req.cookies?.token ||
      (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      logApplicationEvent({
        logLevel: "WARNING",
        logType: "auth",
        method: req.method,
        endpoint: req.originalUrl,
        userId: null,
        adminId: null,
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: "Token verification failed - Token missing",
        responseTime: Date.now() - startTime,
        req,
      });

      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS || "Token required",
      });
    }

    /* ================= VERIFY TOKEN ================= */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      logApplicationEvent({
        logLevel: "WARNING",
        logType: "auth",
        method: req.method,
        endpoint: req.originalUrl,
        userId: null,
        adminId: null,
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: "Token verification failed - Invalid token",
        responseTime: Date.now() - startTime,
        req,
      });

      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: ERROR_MESSAGES.INVALID_TOKEN || "Invalid token",
      });
    }

    /* ================= ATTACH ADMIN ================= */
    req.admin = {
      id: decoded.id,
      role: decoded.role,
    };

    logApplicationEvent({
      logLevel: "INFO",
      logType: "auth",
      method: req.method,
      endpoint: req.originalUrl,
      userId: null,
      adminId: decoded.id,
      statusCode: HTTP_STATUS.OK,
      message: "Token verified successfully",
      responseTime: Date.now() - startTime,
      req,
    });

    next();
  } catch (error) {
    logApplicationEvent({
      logLevel: "ERROR",
      logType: "auth",
      method: req.method,
      endpoint: req.originalUrl,
      userId: null,
      adminId: null,
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: "Token verification error",
      details: { error: error.message },
      responseTime: Date.now(),
      req,
    });

    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: ERROR_MESSAGES.INVALID_TOKEN || "Invalid or expired token",
    });
  }
};

export const generateAdminToken = (admin) => {
  return jwt.sign(
    {
      id: admin.id,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: SECURITY_CONSTANTS.JWT_EXPIRES_IN,
    }
  );
};
