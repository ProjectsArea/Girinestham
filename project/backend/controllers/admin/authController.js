import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  SECURITY_CONSTANTS,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "../../constants/index.js";

import {
  findAdminByEmail,
  updateLoginAttempts,
  lockAdminAccount,
  resetLoginAttempts,
  findRole,
} from "../../models/admin/authController.model.js";

import { logApplicationEvent } from "../../utils/logger.js";
import { generateAdminToken } from "../../middleware/admin/adminAuth.js";

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  const startTime = Date.now();

  try {
    let { email, password, role } = req.body;

    /* ================= INPUT EXISTS VALIDATION ================= */
    if (!email || !password) {
      const responseTime = Date.now() - startTime;

      logApplicationEvent({
        logLevel: "WARNING",
        logType: "auth",
        method: req.method,
        endpoint: req.originalUrl,
        userId: null,
        adminId: null,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Login failed - Email or password missing",
        details: { email },
        responseTime,
        req,
      });

      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: ERROR_MESSAGES.EMAIL_PASSWORD_REQUIRED, error: error.message });
    }

    /* ================= INPUT FORMAT VALIDATION ================= */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    email = email?.trim().toLowerCase();
    password = password?.trim();
    role = role?.trim().toLowerCase();

    if (!emailRegex.test(email)) {
      const responseTime = Date.now() - startTime;

      logApplicationEvent({
        logLevel: "WARNING",
        logType: "auth",
        method: req.method,
        endpoint: req.originalUrl,
        userId: null,
        adminId: null,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Login failed - Invalid email format",
        details: { email },
        responseTime,
        req,
      });

      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Invalid email format"});
    }


    if(!passwordRegex.test(password)) {
      const responseTime = Date.now() - startTime;

      logApplicationEvent({
        logLevel: "WARNING",
        logType: "auth",
        method: req.method,
        endpoint: req.originalUrl,
        userId: null,
        adminId: null,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Login failed - Invalid password format",
        details: { email },
        responseTime,
        req,
      });

      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Invalid password format"});
    }
    

    /* ================= CHECK ROLE EXISTS ================= */
    const roleCheck = await findRole(role);
    if (!roleCheck.exists) {
      logApplicationEvent({
        logLevel: "WARNING",
        logType: "auth",
        method: req.method,
        endpoint: req.originalUrl,
        userId: null,
        adminId: null,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Login failed - Invalid role",
        details: { role },
        responseTime: Date.now() - startTime,
        req,
      });
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Invalid role"});
    }


    /* ================= FIND ADMIN ================= */
    const admin = await findAdminByEmail(email);

    if (!admin) {
      logApplicationEvent({
        logLevel: "WARNING",
        logType: "auth",
        method: req.method,
        endpoint: req.originalUrl,
        userId: null,
        adminId: null,
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: "Login failed - Admin not found",
        details: { email },
        responseTime: Date.now() - startTime,
        req,
      });
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS, error: error.message });
    }


    /* ================= ACCOUNT LOCK CHECK ================= */
    if (admin.lock_until && new Date(admin.lock_until) > new Date()) {
      logApplicationEvent({
        logLevel: "WARNING",
        logType: "auth",
        method: req.method,
        endpoint: req.originalUrl,
        userId: null,
        adminId: admin.id,
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: "Login failed - Account locked",
        details: { email },
        responseTime: Date.now() - startTime,
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

      await updateLoginAttempts(admin.id, attempts);

      if (attempts >= SECURITY_CONSTANTS.DEFAULT_MAX_LOGIN_ATTEMPTS) {
        const lockUntil = new Date(
          Date.now() +
          SECURITY_CONSTANTS.DEFAULT_LOCK_TIME_MINUTES * 60000
        );

        logApplicationEvent({
          logLevel: "WARNING",
          logType: "auth",
          method: req.method,
          endpoint: req.originalUrl,
          userId: null,
          adminId: admin.id,
          statusCode: HTTP_STATUS.FORBIDDEN,
          message: "Login failed - Account locked due to max attempts",
          details: { email },
          responseTime: Date.now() - startTime,
          req,
        });

        await lockAdminAccount(admin.id, lockUntil);
      }

      logApplicationEvent({
        logLevel: "WARNING",
        logType: "auth",
        method: req.method,
        endpoint: req.originalUrl,
        userId: null,
        adminId: admin.id,
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: "Login failed - Invalid credentials",
        details: { email },
        responseTime: Date.now() - startTime,
        req,
      });
      
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
    }

    /* ================= SUCCESS LOGIN ================= */
    await resetLoginAttempts(admin.id);

    const token = generateAdminToken(admin);

    if (!token) {
      logApplicationEvent({
        logLevel: "ERROR",
        logType: "auth",
        method: req.method,
        endpoint: req.originalUrl,
        userId: null,
        adminId: admin.id,
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: "Login failed - Token generation failed",
        details: { email },
        responseTime: Date.now() - startTime,
        req,
      });
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error: error.message });
    }

    res.cookie("token", token, SECURITY_CONSTANTS.COOKIE_OPTIONS);

    logApplicationEvent({
      logLevel: "INFO",
      logType: "auth",
      method: req.method,
      endpoint: req.originalUrl,
      userId: null,
      adminId: admin.id,
      statusCode: HTTP_STATUS.OK,
      message: "Login successful",
      details: { email },
      responseTime: Date.now() - startTime,
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
  } catch (error) {
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "auth",
      method: req.method,
      endpoint: req.originalUrl,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Login failed with error",
      details: { error: error.message, email: req.body?.email },
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
  res.clearCookie("token", SECURITY_CONSTANTS.COOKIE_OPTIONS);

  return res
    .status(HTTP_STATUS.OK)
    .json({ message: SUCCESS_MESSAGES.LOGOUT_SUCCESSFUL });
};