import {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} from "../controllers/admin/userController.js";

import db from "../config/db.js";
import bcrypt from "bcrypt";

/* ================= MOCKS ================= */
jest.mock("../config/db.js");
jest.mock("bcrypt");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("User Controller", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* ================= CREATE USER ================= */

  test("createUser - missing fields → 400", async () => {
    const req = { body: {} };
    const res = mockResponse();

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("createUser - duplicate email → 409", async () => {
    bcrypt.hash.mockResolvedValue("hashed");

    db.query.mockImplementation((q, v, cb) => {
      cb({ code: "ER_DUP_ENTRY" }, null);
    });

    const req = {
      body: { email: "Test@Email.com", password: "123", role_id: 1 }
    };
    const res = mockResponse();

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
  });

  test("createUser - success → 201", async () => {
    bcrypt.hash.mockResolvedValue("hashed");

    db.query.mockImplementation((q, v, cb) => {
      cb(null, { insertId: 5 });
    });

    const req = {
      body: { email: "Test@Email.com", password: "123", role_id: 1 }
    };
    const res = mockResponse();

    await createUser(req, res);

    expect(bcrypt.hash).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });

  /* ================= GET USERS ================= */

  test("getUsers - DB error → 500", async () => {
    db.query.mockImplementation((q, cb) => {
      cb(new Error("DB error"), null);
    });

    const req = {};
    const res = mockResponse();

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("getUsers - success → 200", async () => {
    const users = [{ id: 1, email: "test@test.com" }];

    db.query.mockImplementation((q, cb) => {
      cb(null, users);
    });

    const req = {};
    const res = mockResponse();

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        count: users.length
      })
    );
  });

  /* ================= UPDATE USER ================= */

  test("updateUser - missing id → 400", async () => {
    const req = { body: {} };
    const res = mockResponse();

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("updateUser - duplicate email → 409", async () => {
    db.query.mockImplementation((q, v, cb) => {
      cb({ code: "ER_DUP_ENTRY" }, null);
    });

    const req = { body: { id: 1, email: "test@test.com" } };
    const res = mockResponse();

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
  });

  test("updateUser - user not found → 404", async () => {
    db.query.mockImplementation((q, v, cb) => {
      cb(null, { affectedRows: 0 });
    });

    const req = { body: { id: 1, email: "test@test.com" } };
    const res = mockResponse();

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test("updateUser - success → 200", async () => {
    db.query.mockImplementation((q, v, cb) => {
      cb(null, { affectedRows: 1 });
    });

    const req = { body: { id: 1, email: "test@test.com" } };
    const res = mockResponse();

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  /* ================= DELETE USER ================= */

  test("deleteUser - missing id → 400", async () => {
    const req = { params: {} };
    const res = mockResponse();

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("deleteUser - user not found → 404", async () => {
    db.query.mockImplementation((q, v, cb) => {
      cb(null, { affectedRows: 0 });
    });

    const req = { params: { id: 1 } };
    const res = mockResponse();

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test("deleteUser - success → 200", async () => {
    db.query.mockImplementation((q, v, cb) => {
      cb(null, { affectedRows: 1 });
    });

    const req = { params: { id: 1 } };
    const res = mockResponse();

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

});