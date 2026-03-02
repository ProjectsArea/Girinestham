import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../config/db.js";
import {
  SECURITY_CONSTANTS,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "../../constants/index.js";
import { logApplicationEvent } from "../../utils/logger.js";

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  const startTime = Date.now();

  try {
    const { email, password } = req.body;

    /* ================= INPUT VALIDATION ================= */
    if (!email || !password) {
      const responseTime = Date.now() - startTime;

      logApplicationEvent({
        logLevel: "WARNING",
        logType: "auth",
        method: req.method,
        endpoint: req.originalUrl,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Login failed - Email or password missing",
        details: { email },
        responseTime,
        req,
      });

      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: ERROR_MESSAGES.EMAIL_PASSWORD_REQUIRED });
    }

    const query =
      "SELECT * FROM admin_users WHERE email = ? AND is_active = TRUE";

    db.query(query, [email], async (err, results) => {
      const responseTime = Date.now() - startTime;

      /* ================= DB ERROR ================= */
      if (err) {
        logApplicationEvent({
          logLevel: "ERROR",
          logType: "database",
          method: req.method,
          endpoint: req.originalUrl,
          statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          message: "Login DB error",
          details: { email },
          stackTrace: err.stack,
          responseTime,
          req,
        });

        return res
          .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
      }

      /* ================= INVALID EMAIL ================= */
      if (!results || results.length === 0) {
        logApplicationEvent({
          logLevel: "WARNING",
          logType: "auth",
          method: req.method,
          endpoint: req.originalUrl,
          statusCode: HTTP_STATUS.UNAUTHORIZED,
          message: "Invalid login attempt - Email not found",
          details: { email },
          responseTime,
          req,
        });

        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
      }

      const admin = results[0];

      /* ================= ACCOUNT LOCK CHECK ================= */
      if (admin.lock_until && new Date(admin.lock_until) > new Date()) {
        logApplicationEvent({
          logLevel: "WARNING",
          logType: "auth",
          method: req.method,
          endpoint: req.originalUrl,
          adminId: admin.id,
          statusCode: HTTP_STATUS.FORBIDDEN,
          message: "Login blocked - Account locked",
          responseTime,
          req,
        });

        return res
          .status(HTTP_STATUS.FORBIDDEN)
          .json({ message: ERROR_MESSAGES.ACCOUNT_LOCKED });
      }

      /* ================= PASSWORD CHECK ================= */
      const valid = await bcrypt.compare(password, admin.password);

      if (!valid) {
        const attempts = admin.login_attempts + 1;

        db.query(
          "UPDATE admin_users SET login_attempts = ? WHERE id = ?",
          [attempts, admin.id]
        );

        if (attempts >= SECURITY_CONSTANTS.DEFAULT_MAX_LOGIN_ATTEMPTS) {
          const lockUntil = new Date(
            Date.now() +
              SECURITY_CONSTANTS.DEFAULT_LOCK_TIME_MINUTES * 60000
          );

          db.query(
            "UPDATE admin_users SET lock_until = ?, login_attempts = 0 WHERE id = ?",
            [lockUntil, admin.id]
          );
        }

        logApplicationEvent({
          logLevel: "WARNING",
          logType: "auth",
          method: req.method,
          endpoint: req.originalUrl,
          adminId: admin.id,
          statusCode: HTTP_STATUS.UNAUTHORIZED,
          message: "Invalid password attempt",
          details: { attempts },
          responseTime,
          req,
        });

        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
      }

      /* ================= SUCCESS LOGIN ================= */
      db.query(
        "UPDATE admin_users SET login_attempts = 0, lock_until = NULL WHERE id = ?",
        [admin.id]
      );

      const token = jwt.sign(
        { id: admin.id, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: SECURITY_CONSTANTS.JWT_EXPIRES_IN }
      );

      res.cookie("token", token, SECURITY_CONSTANTS.COOKIE_OPTIONS);

      logApplicationEvent({
        logLevel: "SUCCESS",
        logType: "auth",
        method: req.method,
        endpoint: req.originalUrl,
        adminId: admin.id,
        statusCode: HTTP_STATUS.OK,
        message: "Admin login successful",
        responseTime,
        req,
      });

      return res.status(HTTP_STATUS.OK).json({
        message: SUCCESS_MESSAGES.LOGIN_SUCCESSFUL,
        admin: {
          id: admin.id,
          email: admin.email,
          role: admin.role,
        },
      });
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "system",
      method: req.method,
      endpoint: req.originalUrl,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Unexpected login error",
      stackTrace: error.stack,
      responseTime,
      req,
    });

    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

/* ================= LOGOUT ================= */
export const logout = (req, res) => {
  const startTime = Date.now();

  res.clearCookie("token", SECURITY_CONSTANTS.COOKIE_OPTIONS);

  const responseTime = Date.now() - startTime;

  logApplicationEvent({
    logLevel: "SUCCESS",
    logType: "logout",
    method: req.method,
    endpoint: req.originalUrl,
    adminId: req.user?.id || null,
    statusCode: HTTP_STATUS.OK,
    message: "Admin logout successful",
    responseTime,
    req,
  });

  return res
    .status(HTTP_STATUS.OK)
    .json({ message: SUCCESS_MESSAGES.LOGOUT_SUCCESSFUL });
};