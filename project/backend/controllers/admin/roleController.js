import {
  insertRole,
  fetchRoles,
  modifyRole,
} from "../../models/admin/roleController.model.js";

import { logApplicationEvent } from "../../utils/logger.js";

/* ================= CREATE ROLE ================= */
export const createRole = async (req, res) => {
  const startTime = Date.now();

  try {
    let { role_name, description } = req.body;

    if (!role_name || !role_name.trim()) {
      const responseTime = Date.now() - startTime;

      logApplicationEvent({
        logLevel: "WARNING",
        logType: "role_management",
        method: req.method,
        endpoint: req.originalUrl,
        adminId: req.user?.id || null,
        statusCode: 400,
        message: "Create role failed - Role name required",
        responseTime,
        req,
      });

      return res.status(400).json({
        success: false,
        message: "Role name is required",
      });
    }

    role_name = role_name.trim();

    const results = await insertRole(role_name, description);
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "role_management",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: 201,
      message: "Role created successfully",
      details: { roleId: results.insertId, role_name },
      responseTime,
      req,
    });

    return res.status(201).json({
      success: true,
      message: "Role created successfully",
      role: {
        id: results.insertId,
        role_name,
        description,
      },
    });
  } catch (err) {
    const responseTime = Date.now() - startTime;

    if (err.code === "ER_DUP_ENTRY") {
      logApplicationEvent({
        logLevel: "WARNING",
        logType: "role_management",
        method: req.method,
        endpoint: req.originalUrl,
        adminId: req.user?.id || null,
        statusCode: 409,
        message: "Duplicate role creation attempt",
        details: { role_name: req.body.role_name },
        responseTime,
        req,
      });

      return res.status(409).json({
        success: false,
        message: "Role already exists",
      });
    }

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "database",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: 500,
      message: "Create role DB error",
      stackTrace: err.stack,
      responseTime,
      req,
    });

    return res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
};

/* ================= GET ROLES ================= */
export const getRoles = async (req, res) => {
  const startTime = Date.now();

  try {
    const roles = await fetchRoles();
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "INFO",
      logType: "role_management",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: 200,
      message: "Roles fetched successfully",
      details: { count: roles.length },
      responseTime,
      req,
    });

    return res.status(200).json({
      success: true,
      count: roles.length,
      roles,
    });
  } catch (err) {
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "database",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: 500,
      message: "Get roles DB error",
      stackTrace: err.stack,
      responseTime,
      req,
    });

    return res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
};

/* ================= UPDATE ROLE ================= */
export const updateRole = async (req, res) => {
  const startTime = Date.now();

  try {
    let { id, role_name, description } = req.body;

    if (!id || !role_name || !role_name.trim()) {
      const responseTime = Date.now() - startTime;

      logApplicationEvent({
        logLevel: "WARNING",
        logType: "role_management",
        method: req.method,
        endpoint: req.originalUrl,
        adminId: req.user?.id || null,
        statusCode: 400,
        message: "Update role failed - ID or name missing",
        responseTime,
        req,
      });

      return res.status(400).json({
        success: false,
        message: "Role ID and name are required",
      });
    }

    role_name = role_name.trim();

    const results = await modifyRole(id, role_name, description);
    const responseTime = Date.now() - startTime;

    if (results.affectedRows === 0) {
      logApplicationEvent({
        logLevel: "WARNING",
        logType: "role_management",
        method: req.method,
        endpoint: req.originalUrl,
        adminId: req.user?.id || null,
        statusCode: 404,
        message: "Role not found for update",
        details: { id },
        responseTime,
        req,
      });

      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "role_management",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: 200,
      message: "Role updated successfully",
      details: { id, role_name },
      responseTime,
      req,
    });

    return res.status(200).json({
      success: true,
      message: "Role updated successfully",
    });
  } catch (err) {
    const responseTime = Date.now() - startTime;

    if (err.code === "ER_DUP_ENTRY") {
      logApplicationEvent({
        logLevel: "WARNING",
        logType: "role_management",
        method: req.method,
        endpoint: req.originalUrl,
        adminId: req.user?.id || null,
        statusCode: 409,
        message: "Duplicate role update attempt",
        details: { id: req.body.id, role_name: req.body.role_name },
        responseTime,
        req,
      });

      return res.status(409).json({
        success: false,
        message: "Role name already exists",
      });
    }

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "database",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: 500,
      message: "Update role DB error",
      stackTrace: err.stack,
      responseTime,
      req,
    });

    return res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
};