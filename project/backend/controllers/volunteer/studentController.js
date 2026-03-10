import validator from "validator";

import { logApplicationEvent } from "../../utils/logger.js";
import {
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  DATABASE_CONSTANTS,
} from "../../constants/index.js";
import {
  insertStudent,
  findAllStudents,
  filterStudents,
  patchStudent,
  fetchStudentStats,
  fetchStudentsByPendingApproval,
  findStudentById,
  fetchSportsList,
  fetchMembershipPlans,
} from "../../models/volunteer/studentController.model.js";

const validateCreateStudent = (body) => {
  const errors = {};

  if (!Object.keys(body).length) {
    errors.body = "data is required";
    return { error: errors, value: body };
  }

  if (!body.full_name) {
    errors.full_name = "Full name is required";
  }

  if (!body.email || !validator.isEmail(body.email)) {
    errors.email = "Valid email is required";
  }

  if (
    !body.contact_number ||
    !validator.isMobilePhone(body.contact_number + "", "en-IN")
  ) {
    errors.contact_number = "Valid contact number required";
  }

  if (!body.date_of_birth || !validator.isDate(body.date_of_birth)) {
    errors.date_of_birth = "Invalid date of birth";
  }

  if (!body.gender || !["male", "female", "others"].includes(body.gender)) {
    errors.gender = "Invalid gender";
  }

  if (!body.guardian_name || validator.isEmpty(body.guardian_name)) {
    errors.guardian_name = "Guardian name required";
  }

  if (!body.address || validator.isEmpty(body.address)) {
    errors.address = "Address required";
  }

  if (body.sport_interested_id === undefined) {
    errors.sport_interested_id = "please select a sport interested";
  }

  return {
    error: Object.keys(errors).length ? errors : null,
    value: body,
  };
};

export const createStudent = async (req, res) => {
  const startTime = Date.now();

  const { error, value } = validateCreateStudent(req.body);

  if (error) {
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "student_management",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Create Student failed - Invalid input",
      details: error,
      responseTime,
      req,
    });
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: ERROR_MESSAGES.INVALID_INPUT,
      details: error,
    });
  }

  try {
    const responseTime = Date.now() - startTime;

    const result = await insertStudent(value);
    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "student_registration",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.OK,
      message: "Student registered successfully",
      details: { student_id: result.insertId },
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.CREATED).json({
      message: SUCCESS_MESSAGES.CREATED,
      data: {
        student_id: result.insertId,
        ...value,
      },
    });
  } catch (err) {
    const responseTime = Date.now() - startTime;

    if (err.code === DATABASE_CONSTANTS.ERROR_DUPLICATE_ENTRY) {
      logApplicationEvent({
        logLevel: "WARNING",
        logType: "student_registration",
        method: req.method,
        endpoint: req.originalUrl,
        adminId: req.user?.id || null,
        statusCode: HTTP_STATUS.CONFLICT,
        message: "Student already exists with these details",
        details: { ...value },
        responseTime,
        req,
      });

      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: ERROR_MESSAGES.STUDENT_ALREADY_EXISTS,
        error: err.message,
        details: {
          full_name: value.full_name,
          email: value.email,
          contact_number: value.contact_number,
        },
      });
    }

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "database",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Create student DB error",
      stackTrace: err.stack,
      responseTime,
      details: err.message,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
      error: err.message,
    });
  }
};

export const getStudents = async (req, res) => {
  const startTime = Date.now();
  const { page, limit } = req.query;

  try {
    const results = await findAllStudents({
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 30,
    });
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "students_get",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.OK,
      message: "get students successful",
      responseTime,
      req,
    });
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      ...results,
    });
  } catch (err) {
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "students_get",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Get students DB error",
      stackTrace: err.stack,
      details: err.message,
      responseTime,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
      details: err.message,
    });
  }
};

export const getStudent = async (req, res) => {
  const startTime = Date.now();
  try {
    const { id } = req.params;
    const student = await findStudentById(parseInt(id));

    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "student_get",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.OK,
      message: "get students successful",
      responseTime,
      req,
    });
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      student,
    });
  } catch (err) {
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "get_student",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Get student DB error",
      stackTrace: err.stack,
      responseTime,
      details: err.message,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
      details: err.message,
    });
  }
};

export const searchStudents = async (req, res) => {
  const startTime = Date.now();
  try {
    const {
      page,
      limit,
      id,
      name,
      email,
      phone,
      membership_id,
      mem_status,
      sport_id,
      sort_by,
      order,
    } = req.query;

    const result = await filterStudents({
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 30,
      id,
      name,
      email,
      phone,
      membership_id,
      mem_status,
      sport_id,
      sort_by,
      order,
    });
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "student_searching",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.OK,
      message: "Student searching successful",
      responseTime,
      req,
    });

    res.status(HTTP_STATUS.OK).json({ success: true, ...result });
  } catch (err) {
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "student_searching",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "searching students DB error",
      stackTrace: err.stack,
      responseTime,
      details: err.message,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
      details: err.message,
    });
  }
};

const validateStudentUpdate = (body) => {
  const errors = {};

  if (!Object.keys(body).length) {
    errors.body = "At least one field is required to update the student";
    return { error: errors, value: body };
  }

  if (body.email && !validator.isEmail(body.email)) {
    errors.email = "Invalid email";
  }

  if (
    body.contact_number &&
    !validator.isMobilePhone(body.contact_number + "", "any")
  ) {
    errors.contact_number = "Invalid phone number";
  }

  if (body.gender && !["male", "female", "others"].includes(body.gender)) {
    errors.gender = "Invalid gender";
  }

  if (body.status && !["active", "inactive"].includes(body.status)) {
    errors.status = "Invalid status";
  }

  if (body.date_of_birth && !validator.isDate(body.date_of_birth)) {
    errors.date_of_birth = "Invalid date";
  }

  return {
    error: Object.keys(errors).length ? errors : null,
    value: body,
  };
};

export const updateStudent = async (req, res) => {
  const startTime = Date.now();

  const { error, value } = validateStudentUpdate(req.body);
  if (error) {
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "student_management",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Update Student failed - Invalid input",
      responseTime,
      details: error,
      req,
    });
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: ERROR_MESSAGES.INVALID_INPUT,
      details: error,
    });
  }

  try {
    //TODO: validate the request body.
    await patchStudent(req.params.id, value);
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "student_update",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.OK,
      message: "Student updated successfully",
      responseTime,
      req,
    });
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "Student updated successfully" });
  } catch (err) {
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "student_update",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "updated students DB error",
      stackTrace: err.stack,
      responseTime,
      details: err.message,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
      details: err.message,
    });
  }
};

export const getStudentStats = async (req, res) => {
  const startTime = Date.now();

  try {
    const { date } = req.query;
    const stats = await fetchStudentStats({ date });
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "student_stats",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.OK,
      message: "Student stats fetched successfully",
      responseTime,
      req,
    });

    res.status(200).json({ success: true, ...stats });
  } catch (error) {
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "student_stats",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Student stats fetch error",
      stackTrace: error.stack,
      responseTime,
      details: error.message,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
      details: error.message,
    });
  }
};

export const getPendingApprovalStatus = async (req, res) => {
  const startTime = Date.now();

  try {
    const students = await fetchStudentsByPendingApproval();
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "student_pending_approval_list",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.OK,
      message: "Students fetched successfully",
      responseTime,
      req,
    });

    res.status(200).json({ success: true, students });
  } catch (error) {
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "student_pending_approval_list",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Student pending approval fetch error",
      stackTrace: error.stack,
      responseTime,
      details: error.message,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
      details: error.message,
    });
  }
};

export const deactiveStudent = async (req, res) => {
  const startTime = Date.now();
  try {
    await patchStudent(req.params.id, { status: "inactive" });
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "student_deactivate",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.OK,
      message: "Student deactivated successfully",
      responseTime,
      req,
    });
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "Student deactivated successfully" });
  } catch (err) {
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "student_deactivate",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "deactivated students DB error",
      stackTrace: err.stack,
      responseTime,
      details: err.message,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
      details: err.message,
    });
  }
};

export const getSportsList = async (req, res) => {
  const startTime = Date.now();

  try {
    const sports = await fetchSportsList();
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "student_deactivate",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.OK,
      message: "Student deactivated successfully",
      responseTime,
      req,
    });
    res.status(HTTP_STATUS.OK).json({ success: true, sports });
  } catch (err) {
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "sports_list",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "sports list DB error",
      stackTrace: err.stack,
      responseTime,
      details: err.message,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
      details: err.message,
    });
  }
};

export const getMemberShipPlans = async (req, res) => {
  const startTime = Date.now();

  try {
    const membershipPlans = await fetchMembershipPlans();
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "SUCCESS",
      logType: "student_membership_plans",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.OK,
      message: "Student deactivated successfully",
      responseTime,
      req,
    });
    res.status(HTTP_STATUS.OK).json({ success: true, membershipPlans });
  } catch (err) {
    const responseTime = Date.now() - startTime;

    logApplicationEvent({
      logLevel: "ERROR",
      logType: "student_membership_plans",
      method: req.method,
      endpoint: req.originalUrl,
      adminId: req.user?.id || null,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "membership plans DB error",
      stackTrace: err.stack,
      responseTime,
      details: err.message,
      req,
    });

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.DATABASE_ERROR,
      details: err.message,
    });
  }
};
