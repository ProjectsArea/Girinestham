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
} from "../../models/admin/adminAuth.model.js";

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

    /* ================= FIND ADMIN ================= */
    const admin = await findAdminByEmail(email);

    if (!admin) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
    }

    /* ================= ACCOUNT LOCK CHECK ================= */
    if (admin.lock_until && new Date(admin.lock_until) > new Date()) {
      return res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: ERROR_MESSAGES.ACCOUNT_LOCKED });
    }

    /* ================= PASSWORD CHECK ================= */
    console.log("Comparing password for email:", email);
    console.log("Stored hash:", admin.password ? "Hash present" : "No hash found");
    
    const valid = await bcrypt.compare(password, admin.password);
    
    console.log("Password valid:", valid);

    if (!valid) {
      const attempts = admin.login_attempts + 1;

      await updateLoginAttempts(admin.id, attempts);

      if (attempts >= SECURITY_CONSTANTS.DEFAULT_MAX_LOGIN_ATTEMPTS) {
        const lockUntil = new Date(
          Date.now() +
            SECURITY_CONSTANTS.DEFAULT_LOCK_TIME_MINUTES * 60000
        );

        await lockAdminAccount(admin.id, lockUntil);
      }

      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
    }

    /* ================= SUCCESS LOGIN ================= */
    await resetLoginAttempts(admin.id);

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: SECURITY_CONSTANTS.JWT_EXPIRES_IN }
    );

    res.cookie("token", token, SECURITY_CONSTANTS.COOKIE_OPTIONS);

    return res.status(HTTP_STATUS.OK).json({
      message: SUCCESS_MESSAGES.LOGIN_SUCCESSFUL,
      token: token,
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