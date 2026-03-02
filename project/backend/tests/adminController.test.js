import { login, logout } from "../controllers/admin/adminController.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

/* ================= MOCKS ================= */

jest.mock("../config/db.js");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  return res;
};

describe("Admin Controller - login", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should return 400 if email or password missing", async () => {
    const req = { body: {} };
    const res = mockResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("Should return 401 if user not found", async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(null, []);
    });

    const req = { body: { email: "test@test.com", password: "123456" } };
    const res = mockResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  test("Should return 403 if account locked", async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(null, [{
        id: 1,
        password: "hashed",
        role: "admin",
        login_attempts: 2,
        lock_until: new Date(Date.now() + 10000)
      }]);
    });

    const req = { body: { email: "test@test.com", password: "123456" } };
    const res = mockResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  test("Should return 401 if password invalid", async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(null, [{
        id: 1,
        password: "hashed",
        role: "admin",
        login_attempts: 0,
        lock_until: null
      }]);
    });

    bcrypt.compare.mockResolvedValue(false);

    const req = { body: { email: "test@test.com", password: "wrong" } };
    const res = mockResponse();

    await login(req, res);

    expect(bcrypt.compare).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test("Should login successfully and set secure cookie", async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(null, [{
        id: 1,
        email: "admin@test.com",
        password: "hashed",
        role: "admin",
        login_attempts: 0,
        lock_until: null
      }]);
    });

    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mockedToken");

    const req = { body: { email: "admin@test.com", password: "correct" } };
    const res = mockResponse();

    await login(req, res);

    expect(jwt.sign).toHaveBeenCalled();
    expect(res.cookie).toHaveBeenCalledWith(
      "token",
      "mockedToken",
      expect.objectContaining({
        httpOnly: true,
        sameSite: "strict"
      })
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

});

describe("Admin Controller - logout", () => {

  test("Should clear cookie securely", () => {
    const req = {};
    const res = mockResponse();

    logout(req, res);

    expect(res.clearCookie).toHaveBeenCalledWith(
      "token",
      expect.objectContaining({
        httpOnly: true,
        sameSite: "strict"
      })
    );

    expect(res.status).toHaveBeenCalledWith(200);
  });

});