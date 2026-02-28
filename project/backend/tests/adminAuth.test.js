import { authenticateAdmin } from "../middleware/adminAuth.js";
import jwt from "jsonwebtoken";

/* ================= MOCK JWT ================= */
jest.mock("jsonwebtoken");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Admin Middleware - authenticateAdmin", () => {

  let next;

  beforeEach(() => {
    jest.clearAllMocks();
    next = jest.fn();
  });

  test("Should return 401 if no token provided", () => {
    const req = { cookies: {}, headers: {} };
    const res = mockResponse();

    authenticateAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test("Should verify token from cookie", () => {
    jwt.verify.mockReturnValue({ id: 1, role: "admin" });

    const req = { cookies: { token: "validToken" }, headers: {} };
    const res = mockResponse();

    authenticateAdmin(req, res, next);

    expect(jwt.verify).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test("Should verify token from Authorization header", () => {
    jwt.verify.mockReturnValue({ id: 1, role: "admin" });

    const req = {
      cookies: {},
      headers: { authorization: "Bearer validToken" }
    };
    const res = mockResponse();

    authenticateAdmin(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith("validToken", process.env.JWT_SECRET);
    expect(next).toHaveBeenCalled();
  });

  test("Should return 403 if role is not admin", () => {
    jwt.verify.mockReturnValue({ id: 1, role: "user" });

    const req = { cookies: { token: "validToken" }, headers: {} };
    const res = mockResponse();

    authenticateAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  test("Should allow super_admin role", () => {
    jwt.verify.mockReturnValue({ id: 1, role: "super_admin" });

    const req = { cookies: { token: "validToken" }, headers: {} };
    const res = mockResponse();

    authenticateAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("Should return 401 if token expired", () => {
    jwt.verify.mockImplementation(() => {
      const error = new Error("Expired");
      error.name = "TokenExpiredError";
      throw error;
    });

    const req = { cookies: { token: "expiredToken" }, headers: {} };
    const res = mockResponse();

    authenticateAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test("Should return 401 if token invalid", () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid");
    });

    const req = { cookies: { token: "invalidToken" }, headers: {} };
    const res = mockResponse();

    authenticateAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

});