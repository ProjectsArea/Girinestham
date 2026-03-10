import {
  createStudent,
  getStudents,
  getStudent,
  searchStudents,
  updateStudent,
  getStudentStats,
  getPendingApprovalStatus,
  deactiveStudent,
  getSportsList,
  getMemberShipPlans,
} from "../../controllers/volunteer/studentController.js";

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

jest.mock("../../models/volunteer/studentController.model.js");
jest.mock("../../utils/logger.js", () => ({
  logApplicationEvent: jest.fn(),
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const buildReq = (overrides = {}) => ({
  method: "GET",
  originalUrl: "/api/volunteer/students",
  user: { id: 1 },
  body: {},
  params: {},
  query: {},
  ...overrides,
});

const validStudentPayload = {
  full_name: "Test Student",
  date_of_birth: "2010-01-01",
  gender: "male",
  contact_number: "9999999999",
  email: "student@test.com",
  address: "Address",
  guardian_name: "Guardian",
  sport_interested_id: 1,
};

describe("Volunteer Student Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createStudent - invalid payload returns 400", async () => {
    const req = buildReq({ method: "POST", body: {} });
    const res = mockResponse();

    await createStudent(req, res);

    expect(insertStudent).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("createStudent - duplicate entry returns 409", async () => {
    insertStudent.mockRejectedValue({ code: "ER_DUP_ENTRY" });

    const req = buildReq({ method: "POST", body: validStudentPayload });
    const res = mockResponse();

    await createStudent(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
  });

  test("createStudent - success returns 201", async () => {
    insertStudent.mockResolvedValue({ insertId: 7 });

    const req = buildReq({ method: "POST", body: validStudentPayload });
    const res = mockResponse();

    await createStudent(req, res);

    expect(insertStudent).toHaveBeenCalledWith(
      expect.objectContaining({ ...validStudentPayload }),
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          student_id: 7,
          ...validStudentPayload,
        }),
      }),
    );
  });

  test("createStudent - db error returns 500", async () => {
    insertStudent.mockRejectedValue(new Error("DB error"));

    const req = buildReq({ method: "POST", body: validStudentPayload });
    const res = mockResponse();

    await createStudent(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("getStudents - success returns 200", async () => {
    findAllStudents.mockResolvedValue({
      students: [{ id: 1, full_name: "A" }],
      meta: { total: 1, page: 1, limit: 30, totalPages: 1 },
    });

    const req = buildReq({ query: { page: "2", limit: "5" } });
    const res = mockResponse();

    await getStudents(req, res);

    expect(findAllStudents).toHaveBeenCalledWith({ page: 2, limit: 5 });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("getStudents - error returns 500", async () => {
    findAllStudents.mockRejectedValue(new Error("DB error"));

    const req = buildReq();
    const res = mockResponse();

    await getStudents(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("getStudent - success returns 200", async () => {
    findStudentById.mockResolvedValue([{ id: 2, full_name: "Student" }]);

    const req = buildReq({ params: { id: "2" } });
    const res = mockResponse();

    await getStudent(req, res);

    expect(findStudentById).toHaveBeenCalledWith(2);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("getStudent - error returns 500", async () => {
    findStudentById.mockRejectedValue(new Error("DB error"));

    const req = buildReq({ params: { id: "2" } });
    const res = mockResponse();

    await getStudent(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("searchStudents - success returns 200", async () => {
    filterStudents.mockResolvedValue({
      students: [{ id: 1 }],
      meta: { total: 1, page: 1, limit: 30, totalPages: 1 },
    });

    const req = buildReq({
      query: { page: "1", limit: "10", name: "test", order: "DESC" },
    });
    const res = mockResponse();

    await searchStudents(req, res);

    expect(filterStudents).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 1,
        limit: 10,
        name: "test",
        order: "DESC",
      }),
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("searchStudents - error returns 500", async () => {
    filterStudents.mockRejectedValue(new Error("DB error"));

    const req = buildReq();
    const res = mockResponse();

    await searchStudents(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("updateStudent - invalid payload returns 400", async () => {
    const req = buildReq({ method: "PUT", params: { id: "3" }, body: {} });
    const res = mockResponse();

    await updateStudent(req, res);

    expect(patchStudent).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("updateStudent - success returns 200", async () => {
    patchStudent.mockResolvedValue({ affectedRows: 1 });

    const req = buildReq({
      method: "PUT",
      params: { id: "3" },
      body: { full_name: "Updated Name" },
    });
    const res = mockResponse();

    await updateStudent(req, res);

    expect(patchStudent).toHaveBeenCalledWith("3", {
      full_name: "Updated Name",
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("updateStudent - error returns 500", async () => {
    patchStudent.mockRejectedValue(new Error("DB error"));

    const req = buildReq({
      method: "PUT",
      params: { id: "3" },
      body: { full_name: "Updated Name" },
    });
    const res = mockResponse();

    await updateStudent(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("getStudentStats - success returns 200", async () => {
    fetchStudentStats.mockResolvedValue({
      total_registered: 10,
      registered_today: 2,
      pending_count: 1,
      date: "1/1/2026",
    });

    const req = buildReq({ query: { date: "2026-01-01" } });
    const res = mockResponse();

    await getStudentStats(req, res);

    expect(fetchStudentStats).toHaveBeenCalledWith({ date: "2026-01-01" });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("getStudentStats - error returns 500", async () => {
    fetchStudentStats.mockRejectedValue(new Error("DB error"));

    const req = buildReq();
    const res = mockResponse();

    await getStudentStats(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("getPendingApprovalStatus - success returns 200", async () => {
    fetchStudentsByPendingApproval.mockResolvedValue([{ id: 1 }]);

    const req = buildReq();
    const res = mockResponse();

    await getPendingApprovalStatus(req, res);

    expect(fetchStudentsByPendingApproval).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("getPendingApprovalStatus - error returns 500", async () => {
    fetchStudentsByPendingApproval.mockRejectedValue(new Error("DB error"));

    const req = buildReq();
    const res = mockResponse();

    await getPendingApprovalStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("deactiveStudent - success returns 200", async () => {
    patchStudent.mockResolvedValue({ affectedRows: 1 });

    const req = buildReq({ params: { id: "10" } });
    const res = mockResponse();

    await deactiveStudent(req, res);

    expect(patchStudent).toHaveBeenCalledWith("10", { status: "inactive" });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("deactiveStudent - error returns 500", async () => {
    patchStudent.mockRejectedValue(new Error("DB error"));

    const req = buildReq({ params: { id: "10" } });
    const res = mockResponse();

    await deactiveStudent(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("getSportsList - success returns 200", async () => {
    fetchSportsList.mockResolvedValue([{ id: 1, sport_name: "Cricket" }]);

    const req = buildReq();
    const res = mockResponse();

    await getSportsList(req, res);

    expect(fetchSportsList).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("getSportsList - error returns 500", async () => {
    fetchSportsList.mockRejectedValue(new Error("DB error"));

    const req = buildReq();
    const res = mockResponse();

    await getSportsList(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("getMemberShipPlans - success returns 200", async () => {
    fetchMembershipPlans.mockResolvedValue([
      { id: 1, membership_name: "Monthly" },
    ]);

    const req = buildReq();
    const res = mockResponse();

    await getMemberShipPlans(req, res);

    expect(fetchMembershipPlans).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("getMemberShipPlans - error returns 500", async () => {
    fetchMembershipPlans.mockRejectedValue(new Error("DB error"));

    const req = buildReq();
    const res = mockResponse();

    await getMemberShipPlans(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
