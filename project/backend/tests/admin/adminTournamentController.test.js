import {
  createTournamentController
} from "../../controllers/admin/adminTournamentController.js";

import { createTournament } from "../../models/admin/adminTournamentController.model.js";
import { logApplicationEvent } from "../../utils/logger.js";

jest.mock("../../models/admin/adminTournamentController.model.js");
jest.mock("../../utils/logger.js");

describe("createTournamentController", () => {

  let req;
  let res;

  beforeEach(() => {

    req = {
      body: {
        tournament_code: "TRN001",
        tournament_name: "District Cricket",
        sport_id: 1,
        tournament_level_id: 1,
        tournament_date: "2026-03-10",
        tournament_status_id: 1,
        contact_number: "9876543210",
        participation_fee: 100,
        max_students_allowed: 50,
        created_by: 1
      },
      admin: { id: 1 }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();

  });

  /* TC01 - Successful Tournament Creation */
  test("TC01 - Successful tournament creation", async () => {

    createTournament.mockResolvedValue(10);

    await createTournamentController(req, res);

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith({
      message: "Tournament created successfully",
      tournamentId: 10
    });

    expect(logApplicationEvent).toHaveBeenCalled();

  });

  /* TC02 - Missing Tournament Name */
  test("TC02 - Tournament name missing", async () => {

    req.body.tournament_name = "";

    await createTournamentController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Tournament name is required"
    });

  });

  /* TC03 - Missing Sport ID */
  test("TC03 - Sport ID missing", async () => {

    req.body.sport_id = null;

    await createTournamentController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Sport ID is required"
    });

  });

  /* TC04 - Missing Tournament Level */
  test("TC04 - Tournament level missing", async () => {

    req.body.tournament_level_id = null;

    await createTournamentController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Tournament level is required"
    });

  });

  /* TC05 - Missing Tournament Date */
  test("TC05 - Tournament date missing", async () => {

    req.body.tournament_date = null;

    await createTournamentController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Tournament date is required"
    });

  });

  /* TC06 - Invalid Contact Number */
  test("TC06 - Invalid contact number", async () => {

    req.body.contact_number = "123";

    await createTournamentController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Contact number must be 10 digits"
    });

  });

  /* TC07 - Negative Participation Fee */
  test("TC07 - Negative participation fee", async () => {

    req.body.participation_fee = -10;

    await createTournamentController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Participation fee cannot be negative"
    });

  });

  /* TC08 - Invalid Max Students */
  test("TC08 - Max students less than zero", async () => {

    req.body.max_students_allowed = 0;

    await createTournamentController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Max students allowed must be greater than 0"
    });

  });

  /* TC09 - Database Error */
  test("TC09 - Database error", async () => {

    createTournament.mockRejectedValue(new Error("Database error"));

    await createTournamentController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith({
      message: "Internal server error",
      error: "Database error"
    });

    expect(logApplicationEvent).toHaveBeenCalled();

  });

  /* TC10 - Admin ID missing */
  test("TC10 - Admin ID missing", async () => {

    req.admin = undefined;

    createTournament.mockResolvedValue(12);

    await createTournamentController(req, res);

    expect(logApplicationEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        adminId: null
      })
    );

  });

});