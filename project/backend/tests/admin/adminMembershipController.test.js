import {
  createMembership,
  getMemberships,
  getMembershipById,
  updateMembership,
  deleteMembership,
  getMembershipDashboard,
  activateMembershipController,
  deactivateMembershipController
} from "../../controllers/admin/membershipController.js";

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
  deactivateMembership
} from "../../models/admin/membershipController.model.js";

import { logApplicationEvent } from "../../utils/logger.js";

jest.mock("../../models/admin/membershipController.model.js");
jest.mock("../../utils/logger.js");

describe("Membership Controller Tests", () => {

  let req;
  let res;

  beforeEach(() => {

    req = {
      body: {
        membership_name: "Gold",
        price: 1000,
        registration_fee: 100,
        discount: 50,
        max_students_allowed: 50,
        start_date: "2026-01-01",
        end_date: "2026-12-31"
      },
      params: { id: 1 },
      query: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();

  });

  /* TC01 - Create membership success */
  test("TC01 - Successful membership creation", async () => {

    checkMembershipNameExists.mockResolvedValue([[]]);
    insertMembership.mockResolvedValue([{ insertId: 5 }]);

    await createMembership(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      membership_id: 5
    });

  });

  /* TC02 - Membership name missing */
  test("TC02 - Membership name required", async () => {

    req.body.membership_name = "";

    await createMembership(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Membership name required"
    });

  });

  /* TC03 - Duplicate membership */
  test("TC03 - Duplicate membership", async () => {

    checkMembershipNameExists.mockResolvedValue([[{ id: 1 }]]);

    await createMembership(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: "Membership already exists"
    });

  });

  /* TC04 - Fetch memberships list */
  test("TC04 - Fetch memberships", async () => {

    fetchMemberships.mockResolvedValue([[{ id: 1, membership_name: "Gold" }]]);

    await getMemberships(req, res);

    expect(res.json).toHaveBeenCalledWith([
      { id: 1, membership_name: "Gold" }
    ]);

  });

  /* TC05 - Get membership by ID */
  test("TC05 - Membership found", async () => {

    fetchMembershipById.mockResolvedValue([[{ id: 1, membership_name: "Gold" }]]);

    await getMembershipById(req, res);

    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      membership_name: "Gold"
    });

  });

  /* TC06 - Membership not found */
  test("TC06 - Membership not found", async () => {

    fetchMembershipById.mockResolvedValue([[]]);

    await getMembershipById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Membership not found"
    });

  });

  /* TC07 - Update membership */
  test("TC07 - Membership updated", async () => {

    modifyMembership.mockResolvedValue(true);

    await updateMembership(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Membership updated"
    });

  });

  /* TC08 - Delete membership success */
  test("TC08 - Delete membership", async () => {

    checkStudentsRegistered.mockResolvedValue([[{ total: 0 }]]);
    removeMembership.mockResolvedValue(true);

    await deleteMembership(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Membership deleted"
    });

  });

  /* TC09 - Cannot delete with students */
  test("TC09 - Cannot delete membership with students", async () => {

    checkStudentsRegistered.mockResolvedValue([[{ total: 5 }]]);

    await deleteMembership(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Cannot delete membership with students"
    });

  });

  /* TC10 - Dashboard */
  test("TC10 - Membership dashboard", async () => {

    fetchMembershipDashboard.mockResolvedValue([[{ total_memberships: 10 }]]);

    await getMembershipDashboard(req, res);

    expect(res.json).toHaveBeenCalledWith({
      total_memberships: 10
    });

  });

  /* TC11 - Activate membership */
  test("TC11 - Activate membership", async () => {

    activateMembership.mockResolvedValue(true);

    await activateMembershipController(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Membership activated"
    });

  });

  /* TC12 - Deactivate membership */
  test("TC12 - Deactivate membership", async () => {

    deactivateMembership.mockResolvedValue(true);

    await deactivateMembershipController(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Membership deactivated"
    });

  });

});