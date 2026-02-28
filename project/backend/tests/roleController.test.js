import { createRole, getRoles, updateRole } from "../controllers/admin/roleController.js";
import db from "../config/db.js";

/* ================= MOCK DB ================= */
jest.mock("../config/db.js");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Role Controller", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* ================= CREATE ROLE ================= */

  test("createRole - should return 400 if role_name missing", async () => {
    const req = { body: {} };
    const res = mockResponse();

    await createRole(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("createRole - should handle duplicate role", async () => {
    db.query.mockImplementation((q, v, cb) => {
      cb({ code: "ER_DUP_ENTRY" }, null);
    });

    const req = { body: { role_name: "admin" } };
    const res = mockResponse();

    await createRole(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
  });

  test("createRole - should handle DB error", async () => {
    db.query.mockImplementation((q, v, cb) => {
      cb(new Error("DB error"), null);
    });

    const req = { body: { role_name: "admin" } };
    const res = mockResponse();

    await createRole(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("createRole - should create role successfully", async () => {
    db.query.mockImplementation((q, v, cb) => {
      cb(null, { insertId: 1 });
    });

    const req = { body: { role_name: "admin", description: "desc" } };
    const res = mockResponse();

    await createRole(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  /* ================= GET ROLES ================= */

  test("getRoles - should handle DB error", async () => {
    db.query.mockImplementation((q, cb) => {
      cb(new Error("DB error"), null);
    });

    const req = {};
    const res = mockResponse();

    await getRoles(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("getRoles - should return roles successfully", async () => {
    const roles = [{ id: 1, role_name: "admin" }];

    db.query.mockImplementation((q, cb) => {
      cb(null, roles);
    });

    const req = {};
    const res = mockResponse();

    await getRoles(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        count: roles.length
      })
    );
  });

  /* ================= UPDATE ROLE ================= */

  test("updateRole - should return 400 if missing id or role_name", async () => {
    const req = { body: {} };
    const res = mockResponse();

    await updateRole(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("updateRole - should handle duplicate role", async () => {
    db.query.mockImplementation((q, v, cb) => {
      cb({ code: "ER_DUP_ENTRY" }, null);
    });

    const req = { body: { id: 1, role_name: "admin" } };
    const res = mockResponse();

    await updateRole(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
  });

  test("updateRole - should return 404 if role not found", async () => {
    db.query.mockImplementation((q, v, cb) => {
      cb(null, { affectedRows: 0 });
    });

    const req = { body: { id: 1, role_name: "admin" } };
    const res = mockResponse();

    await updateRole(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test("updateRole - should update successfully", async () => {
    db.query.mockImplementation((q, v, cb) => {
      cb(null, { affectedRows: 1 });
    });

    const req = { body: { id: 1, role_name: "admin" } };
    const res = mockResponse();

    await updateRole(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

});