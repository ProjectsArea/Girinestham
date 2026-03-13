import {
  createTournament,
  getAllTournaments,
  getTournamentById,
  getTournamentRegistrations,
  updateTournament,
  deleteTournament,
} from "../../models/admin/adminTournamentController.model.js";

import { logApplicationEvent } from "../../utils/logger.js";

/* ================= CREATE TOURNAMENT ================= */
export const createTournamentController = async (req, res) => {
  const startTime = Date.now();

  try {

    const {
      tournament_name,
      sport_id,
      tournament_level_id,
      tournament_date,
      tournament_status_id,
      contact_number,
      participation_fee,
      max_students_allowed,
      created_by
    } = req.body;

    /* ===== VALIDATIONS ===== */

    if (!tournament_name) {
      return res.status(400).json({ message: "Tournament name is required" });
    }

    if (!sport_id) {
      return res.status(400).json({ message: "Sport ID is required" });
    }

    if (!tournament_level_id) {
      return res.status(400).json({ message: "Tournament level is required" });
    }

    if (!tournament_date) {
      return res.status(400).json({ message: "Tournament date is required" });
    }

    if (!tournament_status_id) {
      return res.status(400).json({ message: "Tournament status is required" });
    }

    if (!created_by) {
      return res.status(400).json({ message: "Created by is required" });
    }

    if (contact_number && !/^[0-9]{10}$/.test(contact_number)) {
      return res.status(400).json({
        message: "Contact number must be 10 digits"
      });
    }

    if (participation_fee && participation_fee < 0) {
      return res.status(400).json({
        message: "Participation fee cannot be negative"
      });
    }

    if (max_students_allowed !== undefined && max_students_allowed <= 0) {
      return res.status(400).json({
        message: "Max students allowed must be greater than 0"
      });
    }

    /* ===== CREATE ===== */

    const tournamentId = await createTournament(req.body);

    logApplicationEvent({
      logType: "api_request",
      method: "POST",
      endpoint: "/api/admin/tournaments",
      adminId: req.admin?.id || null,
      statusCode: 201,
      responseTime: Date.now() - startTime
    });

    return res.status(201).json({
      message: "Tournament created successfully",
      tournamentId
    });

  } catch (error) {

    console.error("Create Tournament Error:", error);

    logApplicationEvent({
      logType: "api_request",
      method: "POST",
      endpoint: "/api/admin/tournaments",
      adminId: req.admin?.id || null,
      statusCode: 500,
      details: error.message,
      responseTime: Date.now() - startTime
    });

    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};


/* ================= UPDATE TOURNAMENT ================= */
export const updateTournamentController = async (req, res) => {
  const startTime = Date.now();

  try {

    const { id } = req.params;

    /* ===== NEW VALIDATIONS ===== */

    if (!id) {
      return res.status(400).json({ message: "Tournament ID is required" });
    }

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid tournament ID" });
    }

    if (!req.body.tournament_name) {
      return res.status(400).json({ message: "Tournament name is required" });
    }

    if (req.body.contact_number && !/^[0-9]{10}$/.test(req.body.contact_number)) {
      return res.status(400).json({
        message: "Contact number must be 10 digits"
      });
    }

    if (req.body.participation_fee && req.body.participation_fee < 0) {
      return res.status(400).json({
        message: "Participation fee cannot be negative"
      });
    }

    if (req.body.max_students_allowed !== undefined && req.body.max_students_allowed <= 0) {
      return res.status(400).json({
        message: "Max students allowed must be greater than 0"
      });
    }

    const updated = await updateTournament(id, req.body);

    if (!updated) {

      logApplicationEvent({
        logType: "api_request",
        method: "PUT",
        endpoint: `/api/admin/tournaments/${id}`,
        adminId: req.admin?.id || null,
        statusCode: 404,
        responseTime: Date.now() - startTime
      });

      return res.status(404).json({
        message: "Tournament not found",
      });
    }

    logApplicationEvent({
      logType: "api_request",
      method: "PUT",
      endpoint: `/api/admin/tournaments/${id}`,
      adminId: req.admin?.id || null,
      statusCode: 200,
      responseTime: Date.now() - startTime
    });

    res.status(200).json({
      message: "Tournament updated successfully",
    });

  } catch (error) {

    console.error("Update Tournament Error:", error);

    logApplicationEvent({
      logType: "api_request",
      method: "PUT",
      endpoint: "/api/admin/tournaments/:id",
      adminId: req.admin?.id || null,
      statusCode: 500,
      details: error.message,
      responseTime: Date.now() - startTime
    });

    res.status(500).json({
      message: "Internal server error",
    });
  }
};


/* ================= GET ALL TOURNAMENTS ================= */
export const getAllTournamentsController = async (req, res) => {
  const startTime = Date.now();

  try {

    const tournaments = await getAllTournaments();

    logApplicationEvent({
      logType: "api_request",
      method: "GET",
      endpoint: "/api/admin/tournaments",
      adminId: req.admin?.id || null,
      statusCode: 200,
      responseTime: Date.now() - startTime
    });

    res.status(200).json({
      tournaments,
    });

  } catch (error) {

    console.error("Get Tournaments Error:", error);

    logApplicationEvent({
      logType: "api_request",
      method: "GET",
      endpoint: "/api/admin/tournaments",
      adminId: req.admin?.id || null,
      statusCode: 500,
      details: error.message,
      responseTime: Date.now() - startTime
    });

    res.status(500).json({
      message: "Internal server error",
    });
  }
};


/* ================= GET TOURNAMENT BY ID ================= */
export const getTournamentByIdController = async (req, res) => {
  const startTime = Date.now();

  try {

    const { id } = req.params;

    /* ===== NEW VALIDATION ===== */

    if (!id) {
      return res.status(400).json({ message: "Tournament ID is required" });
    }

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid tournament ID" });
    }

    const tournament = await getTournamentById(id);

    if (!tournament) {

      logApplicationEvent({
        logType: "api_request",
        method: "GET",
        endpoint: `/api/admin/tournaments/${id}`,
        adminId: req.admin?.id || null,
        statusCode: 404,
        responseTime: Date.now() - startTime
      });

      return res.status(404).json({
        message: "Tournament not found",
      });
    }

    logApplicationEvent({
      logType: "api_request",
      method: "GET",
      endpoint: `/api/admin/tournaments/${id}`,
      adminId: req.admin?.id || null,
      statusCode: 200,
      responseTime: Date.now() - startTime
    });

    res.status(200).json({
      tournament,
    });

  } catch (error) {

    console.error("Get Tournament Error:", error);

    logApplicationEvent({
      logType: "api_request",
      method: "GET",
      endpoint: "/api/admin/tournaments/:id",
      adminId: req.admin?.id || null,
      statusCode: 500,
      details: error.message,
      responseTime: Date.now() - startTime
    });

    res.status(500).json({
      message: "Internal server error",
    });
  }
};


/* ================= DELETE TOURNAMENT ================= */
export const deleteTournamentController = async (req, res) => {
  const startTime = Date.now();

  try {

    const { id } = req.params;

    /* ===== NEW VALIDATIONS ===== */

    if (!id) {
      return res.status(400).json({ message: "Tournament ID is required" });
    }

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid tournament ID" });
    }

    const deleted = await deleteTournament(id);

    if (!deleted) {

      logApplicationEvent({
        logType: "api_request",
        method: "DELETE",
        endpoint: `/api/admin/tournaments/${id}`,
        adminId: req.admin?.id || null,
        statusCode: 404,
        responseTime: Date.now() - startTime
      });

      return res.status(404).json({
        message: "Tournament not found",
      });
    }

    logApplicationEvent({
      logType: "api_request",
      method: "DELETE",
      endpoint: `/api/admin/tournaments/${id}`,
      adminId: req.admin?.id || null,
      statusCode: 200,
      responseTime: Date.now() - startTime
    });

    res.status(200).json({
      message: "Tournament deleted successfully",
    });

  } catch (error) {

    console.error("Delete Tournament Error:", error);

    logApplicationEvent({
      logType: "api_request",
      method: "DELETE",
      endpoint: "/api/admin/tournaments/:id",
      adminId: req.admin?.id || null,
      statusCode: 500,
      details: error.message,
      responseTime: Date.now() - startTime
    });

    res.status(500).json({
      message: "Internal server error",
    });
  }
};