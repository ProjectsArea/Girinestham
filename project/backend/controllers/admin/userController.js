import bcrypt from "bcrypt";
import {
  SECURITY_CONSTANTS,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  DATABASE_CONSTANTS,
} from "../../constants/index.js";

import {
  insertUser,
  fetchUsers,
  modifyUser,
  softDeleteUser,
} from "../../models/admin/userController.model.js";

import { logApplicationEvent } from "../../utils/logger.js";

/* ================= CREATE USER ================= */
export const createUser = async (req, res) => {
  const startTime = Date.now();

  try {
    let { email, password, role_id } = req.body;

    if (!email || !password || !role_id) {
      const responseTime = Date.now() - startTime;

      logApplicationEvent({
        logLevel: "WARNING",
        logType: "user_management",
        method: req.method,
        endpoint: req.originalUrl,
        adminId: req.user?.id || null,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Create user failed - Missing required fields",
        responseTime,
        req,
      });

      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: ERROR_MESSAGES.EMAIL_PASSWORD_ROLE_REQUIRED,
      });
    }

    email = email.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(
      password,
      SECURITY_CONSTANTS.SALT_ROUNDS
    );

    const results = await insertUser(email, hashedPassword, role_id);
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "user_management",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.CREATED,
      message: "User created successfully",
      details: { userId: results.insertId, email },
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: SUCCESS_MESSAGES.USER_CREATED,
      user: {
        id: results.insertId,
        email,
        role_id,
      },
    });
  } catch (err) {
    const responseTime = Date.now() - startTime;

    if (err.code === DATABASE_CONSTANTS.ERROR_DUPLICATE_ENTRY) {
      logApplicationEvent({
        logLevel: "WARNING",
        logType: "user_management",
        method: req.method,
        endpoint: req.originalUrl,
        adminId: req.user?.id || null,
        statusCode: HTTP_STATUS.CONFLICT,
        message: "Duplicate email during user creation",
        details: { email: req.body.email },
        responseTime,
        req,
      });

      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
      });
    }

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "database",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Create user DB error",
      stackTrace: err.stack,
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
    });
  }
};

/* ================= GET USERS ================= */
export const getUsers = async (req, res) => {
  const startTime = Date.now();

  try {
    const results = await fetchUsers();
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "INFO",
      logType: "user_management",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.OK,
      message: "Users fetched successfully",
      details: { count: results.length },
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      count: results.length,
      users: results,
    });
  } catch (err) {
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "database",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Get users DB error",
      stackTrace: err.stack,
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
    });
  }
};

/* ================= UPDATE USER ================= */
export const updateUser = async (req, res) => {
  const startTime = Date.now();

  try {
    let { id, email, password, role_id } = req.body;

    if (!id) {
      const responseTime = Date.now() - startTime;

      logApplicationEvent({
        logLevel: "WARNING",
        logType: "user_management",
        method: req.method,
        endpoint: req.originalUrl,
        adminId: req.user?.id || null,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Update user failed - Missing user ID",
        responseTime,
        req,
      });

      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    email = email?.trim().toLowerCase();

    let query;
    let params;

    if (password) {
      const hashedPassword = await bcrypt.hash(
        password,
        SECURITY_CONSTANTS.SALT_ROUNDS
      );

      query = `
        UPDATE users 
        SET email = ?, password = ?, role_id = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `;
      params = [email, hashedPassword, role_id, id];
    } else {
      query = `
        UPDATE users 
        SET email = ?, role_id = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `;
      params = [email, role_id, id];
    }

    const results = await modifyUser(query, params);
    const responseTime = Date.now() - startTime;

    if (results.affectedRows === 0) {
      logApplicationEvent({
        logLevel: "WARNING",
        logType: "user_management",
        method: req.method,
        endpoint: req.originalUrl,
        adminId: req.user?.id || null,
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: "User not found for update",
        details: { id },
        responseTime,
        req,
      });

      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGES.USER_NOT_FOUND,
      });
    }

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "user_management",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.OK,
      message: "User updated successfully",
      details: { id },
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.USER_UPDATED,
    });
  } catch (err) {
    const responseTime = Date.now() - startTime;

    if (err.code === DATABASE_CONSTANTS.ERROR_DUPLICATE_ENTRY) {
      logApplicationEvent({
        logLevel: "WARNING",
        logType: "user_management",
        method: req.method,
        endpoint: req.originalUrl,
        adminId: req.user?.id || null,
        statusCode: HTTP_STATUS.CONFLICT,
        message: "Duplicate email during user update",
        details: { id: req.body.id, email: req.body.email },
        responseTime,
        req,
      });

      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
      });
    }

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "database",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Update user DB error",
      stackTrace: err.stack,
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
    });
  }
};

/* ================= DELETE USER ================= */
export const deleteUser = async (req, res) => {
  const startTime = Date.now();

  try {
    const { id } = req.params;

    if (!id) {
      const responseTime = Date.now() - startTime;

      logApplicationEvent({
        logLevel: "WARNING",
        logType: "user_management",
        method: req.method,
        endpoint: req.originalUrl,
        adminId: req.user?.id || null,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Delete user failed - Missing user ID",
        responseTime,
        req,
      });

      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: ERROR_MESSAGES.USER_ID_REQUIRED,
      });
    }

    const results = await softDeleteUser(id);
    const responseTime = Date.now() - startTime;

    if (results.affectedRows === 0) {
      logApplicationEvent({
        logLevel: "WARNING",
        logType: "user_management",
        method: req.method,
        endpoint: req.originalUrl,
        adminId: req.user?.id || null,
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: "User not found for delete",
        details: { id },
        responseTime,
        req,
      });

      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGES.USER_NOT_FOUND,
      });
    }

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "user_management",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.OK,
      message: "User soft-deleted successfully",
      details: { id },
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.USER_DELETED,
    });
  } catch (err) {
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "database",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Delete user DB error",
      stackTrace: err.stack,
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
    });
  }
};