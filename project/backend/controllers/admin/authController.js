import jwt from "jsonwebtoken";
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../constants/index.js";
import { logApplicationEvent } from "../../utils/logger.js";

export const verifyToken = (req, res) => {
  const startTime = Date.now();

  try {
    /* ================= TOKEN FROM COOKIE OR HEADER ================= */
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      const responseTime = Date.now() - startTime;

      logApplicationEvent({
        logLevel: "WARNING",
        logType: "token_verification",
        method: req.method,
        endpoint: req.originalUrl,
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: "Token verification failed - No token provided",
        responseTime,
        req,
      });

      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.NO_TOKEN_PROVIDED,
      });
    }

    /* ================= VERIFY ================= */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "token_verification",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: decoded.id,
      statusCode: HTTP_STATUS.OK,
      message: "Token verified successfully",
      details: { role: decoded.role },
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.TOKEN_VALID,
      admin: {
        id: decoded.id,
        role: decoded.role,
      },
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;

    /* ================= TOKEN EXPIRED ================= */
    if (error.name === "TokenExpiredError") {
      logApplicationEvent({
        logLevel: "WARNING",
        logType: "token_verification",
        method: req.method,
        endpoint: req.originalUrl,
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: "Token expired",
        stackTrace: error.stack,
        responseTime,
        req,
      });

      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.TOKEN_EXPIRED,
      });
    }

    /* ================= INVALID TOKEN ================= */
    logApplicationEvent({
      logLevel: "ERROR",
      logType: "token_verification",
      method: req.method,
      endpoint: req.originalUrl,
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: "Invalid token",
      stackTrace: error.stack,
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: ERROR_MESSAGES.INVALID_TOKEN,
    });
  }
};