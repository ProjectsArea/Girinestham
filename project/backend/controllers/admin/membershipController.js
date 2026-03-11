import {
  insertMembership,
  fetchMemberships,
  fetchMembershipById,
  modifyMembership,
  removeMembership,
  checkMembershipNameExists,
  checkStudentsRegistered,
  fetchMembershipDashboard,
  activateMembership,
  deactivateMembership,
} from "../../models/admin/membershipController.model.js";

import { logApplicationEvent } from "../../utils/logger.js";

/* ===================== INLINE VALIDATION ===================== */
const validateMembership = (data) => {
  if (!data.membership_name) return "Membership name required";

  if (data.price < 0 || data.registration_fee < 0 || data.discount < 0)
    return "Negative values not allowed";

  if (data.max_students_allowed <= 0) return "Max students must be > 0";

  if (data.start_date && data.end_date && new Date(data.start_date) > new Date(data.end_date))
    return "Start date must be before end date";

  return null;
};

/* ================= CREATE MEMBERSHIP ================= */
export const createMembership = async (req, res) => {
  const data = req.body;

  try {

    logApplicationEvent({
      logLevel: "INFO",
      logType: "admin",
      method: req.method || null,
      endpoint: req.originalUrl || null,
      userId: req.userId || null,
      adminId: req.adminId || null,
      statusCode: null,
      message: "Create membership request received",
      responseTime: req.startTime ? Date.now() - req.startTime : null
    });

    const validationError = validateMembership(data);

    if (validationError) {

      logApplicationEvent({
        logLevel: "WARN",
        logType: "admin",
        method: req.method || null,
        endpoint: req.originalUrl || null,
        userId: req.userId || null,
        adminId: req.adminId || null,
        statusCode: 400,
        message: validationError,
        responseTime: req.startTime ? Date.now() - req.startTime : null
      });

      return res.status(400).json({ message: validationError });
    }

    const [duplicate] = await checkMembershipNameExists(data.membership_name);

    if (duplicate.length > 0) {

      logApplicationEvent({
        logLevel: "WARN",
        logType: "admin",
        method: req.method || null,
        endpoint: req.originalUrl || null,
        userId: req.userId || null,
        adminId: req.adminId || null,
        statusCode: 409,
        message: "Membership already exists",
        responseTime: req.startTime ? Date.now() - req.startTime : null
      });

      return res.status(409).json({ message: "Membership already exists" });
    }

    const [result] = await insertMembership(data);

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "admin",
      method: req.method || null,
      endpoint: req.originalUrl || null,
      userId: req.userId || null,
      adminId: req.adminId || null,
      statusCode: 201,
      message: "Membership created successfully",
      responseTime: req.startTime ? Date.now() - req.startTime : null
    });

    res.status(201).json({ success: true, membership_id: result.insertId });

  } catch (err) {

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "admin",
      method: req.method || null,
      endpoint: req.originalUrl || null,
      userId: req.userId || null,
      adminId: req.adminId || null,
      statusCode: 500,
      message: "Database error on createMembership",
      responseTime: req.startTime ? Date.now() - req.startTime : null
    });

    res.status(500).json({ message: "Database error", error: err.message });
  }
};

/* ================= LIST MEMBERSHIPS ================= */
export const getMemberships = async (req, res) => {
  try {

    const filters = {
      name: req.query.name,
      type: req.query.type,
      status: req.query.status,
      limit: parseInt(req.query.limit) || 10,
      offset: parseInt(req.query.offset) || 0,
    };

    const [rows] = await fetchMemberships(filters);

    logApplicationEvent({
      logLevel: "INFO",
      logType: "admin",
      method: req.method || null,
      endpoint: req.originalUrl || null,
      userId: req.userId || null,
      adminId: req.adminId || null,
      statusCode: 200,
      message: "Fetched memberships",
      responseTime: req.startTime ? Date.now() - req.startTime : null
    });

    res.json(rows);

  } catch (err) {

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "admin",
      method: req.method || null,
      endpoint: req.originalUrl || null,
      userId: req.userId || null,
      adminId: req.adminId || null,
      statusCode: 500,
      message: "Database error on getMemberships",
      responseTime: req.startTime ? Date.now() - req.startTime : null
    });

    res.status(500).json({ message: "Database error" });
  }
};

/* ================= GET BY ID ================= */
export const getMembershipById = async (req, res) => {
  try {

    const [rows] = await fetchMembershipById(req.params.id);

    if (!rows.length) {

      logApplicationEvent({
        logLevel: "WARN",
        logType: "admin",
        method: req.method || null,
        endpoint: req.originalUrl || null,
        userId: req.userId || null,
        adminId: req.adminId || null,
        statusCode: 404,
        message: "Membership not found",
        responseTime: req.startTime ? Date.now() - req.startTime : null
      });

      return res.status(404).json({ message: "Membership not found" });
    }

    res.json(rows[0]);

  } catch (err) {

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "admin",
      method: req.method || null,
      endpoint: req.originalUrl || null,
      userId: req.userId || null,
      adminId: req.adminId || null,
      statusCode: 500,
      message: "Database error on getMembershipById",
      responseTime: req.startTime ? Date.now() - req.startTime : null
    });

    res.status(500).json({ message: "Database error" });
  }
};

/* ================= UPDATE ================= */
export const updateMembership = async (req, res) => {

  const id = req.params.id;
  const data = req.body;

  try {

    const validationError = validateMembership(data);

    if (validationError) {

      logApplicationEvent({
        logLevel: "WARN",
        logType: "admin",
        method: req.method || null,
        endpoint: req.originalUrl || null,
        userId: req.userId || null,
        adminId: req.adminId || null,
        statusCode: 400,
        message: validationError,
        responseTime: req.startTime ? Date.now() - req.startTime : null
      });

      return res.status(400).json({ message: validationError });
    }

    await modifyMembership(id, data);

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "admin",
      method: req.method || null,
      endpoint: req.originalUrl || null,
      userId: req.userId || null,
      adminId: req.adminId || null,
      statusCode: 200,
      message: "Membership updated successfully",
      responseTime: req.startTime ? Date.now() - req.startTime : null
    });

    res.json({ message: "Membership updated" });

  } catch (err) {

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "admin",
      method: req.method || null,
      endpoint: req.originalUrl || null,
      userId: req.userId || null,
      adminId: req.adminId || null,
      statusCode: 500,
      message: "Database error on updateMembership",
      responseTime: req.startTime ? Date.now() - req.startTime : null
    });

    res.status(500).json({ message: "Database error" });
  }
};

/* ================= DELETE ================= */
export const deleteMembership = async (req, res) => {

  const id = req.params.id;

  try {

    const [students] = await checkStudentsRegistered(id);

    if (students[0].total > 0) {

      logApplicationEvent({
        logLevel: "WARN",
        logType: "admin",
        method: req.method || null,
        endpoint: req.originalUrl || null,
        userId: req.userId || null,
        adminId: req.adminId || null,
        statusCode: 400,
        message: "Cannot delete membership with students registered",
        responseTime: req.startTime ? Date.now() - req.startTime : null
      });

      return res.status(400).json({ message: "Cannot delete membership with students" });
    }

    await removeMembership(id);

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "admin",
      method: req.method || null,
      endpoint: req.originalUrl || null,
      userId: req.userId || null,
      adminId: req.adminId || null,
      statusCode: 200,
      message: "Membership deleted successfully",
      responseTime: req.startTime ? Date.now() - req.startTime : null
    });

    res.json({ message: "Membership deleted" });

  } catch (err) {

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "admin",
      method: req.method || null,
      endpoint: req.originalUrl || null,
      userId: req.userId || null,
      adminId: req.adminId || null,
      statusCode: 500,
      message: "Database error on deleteMembership",
      responseTime: req.startTime ? Date.now() - req.startTime : null
    });

    res.status(500).json({ message: "Database error" });
  }
};

/* ================= DASHBOARD ================= */
export const getMembershipDashboard = async (req, res) => {
  try {

    const [rows] = await fetchMembershipDashboard();

    logApplicationEvent({
      logLevel: "INFO",
      logType: "admin",
      method: req.method || null,
      endpoint: req.originalUrl || null,
      userId: req.userId || null,
      adminId: req.adminId || null,
      statusCode: 200,
      message: "Fetched membership dashboard",
      responseTime: req.startTime ? Date.now() - req.startTime : null
    });

    res.json(rows[0]);

  } catch (err) {

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "admin",
      method: req.method || null,
      endpoint: req.originalUrl || null,
      userId: req.userId || null,
      adminId: req.adminId || null,
      statusCode: 500,
      message: "Database error on getMembershipDashboard",
      responseTime: req.startTime ? Date.now() - req.startTime : null
    });

    res.status(500).json({ message: "Database error" });
  }
};

/* ================= ACTIVATE ================= */
export const activateMembershipController = async (req, res) => {
  try {

    await activateMembership(req.params.id);

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "admin",
      method: req.method || null,
      endpoint: req.originalUrl || null,
      userId: req.userId || null,
      adminId: req.adminId || null,
      statusCode: 200,
      message: "Membership activated",
      responseTime: req.startTime ? Date.now() - req.startTime : null
    });

    res.json({ message: "Membership activated" });

  } catch (err) {

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "admin",
      method: req.method || null,
      endpoint: req.originalUrl || null,
      userId: req.userId || null,
      adminId: req.adminId || null,
      statusCode: 500,
      message: "Database error on activateMembershipController",
      responseTime: req.startTime ? Date.now() - req.startTime : null
    });

    res.status(500).json({ message: "Database error" });
  }
};

/* ================= DEACTIVATE ================= */
export const deactivateMembershipController = async (req, res) => {
  try {

    await deactivateMembership(req.params.id);

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "admin",
      method: req.method || null,
      endpoint: req.originalUrl || null,
      userId: req.userId || null,
      adminId: req.adminId || null,
      statusCode: 200,
      message: "Membership deactivated",
      responseTime: req.startTime ? Date.now() - req.startTime : null
    });

    res.json({ message: "Membership deactivated" });

  } catch (err) {

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "admin",
      method: req.method || null,
      endpoint: req.originalUrl || null,
      userId: req.userId || null,
      adminId: req.adminId || null,
      statusCode: 500,
      message: "Database error on deactivateMembershipController",
      responseTime: req.startTime ? Date.now() - req.startTime : null
    });

    res.status(500).json({ message: "Database error" });
  }
};