import { verifyToken } from "../controllers/admin/authController.js";
import jwt from "jsonwebtoken";

/* ================= MOCK JWT ================= */
jest.mock("jsonwebtoken");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Auth Controller - verifyToken", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should return 401 if no token provided", () => {
    const req = { cookies: {}, headers: {} };
    const res = mockResponse();

    verifyToken(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "No token provided",
      })
    );
  });

  test("Should verify token from cookie", () => {
    jwt.verify.mockReturnValue({ id: 1, role: "admin" });

    const req = {
      cookies: { token: "validToken" },
      headers: {}
    };
    const res = mockResponse();

    verifyToken(req, res);

    expect(jwt.verify).toHaveBeenCalledWith("validToken", process.env.JWT_SECRET);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Should verify token from Authorization header", () => {
    jwt.verify.mockReturnValue({ id: 1, role: "admin" });

    const req = {
      cookies: {},
      headers: { authorization: "Bearer validToken" }
    };
    const res = mockResponse();

    verifyToken(req, res);

    expect(jwt.verify).toHaveBeenCalledWith("validToken", process.env.JWT_SECRET);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Should return 401 if token expired", () => {
    jwt.verify.mockImplementation(() => {
      const error = new Error("Token expired");
      error.name = "TokenExpiredError";
      throw error;
    });

    const req = {
      cookies: { token: "expiredToken" },
      headers: {}
    };
    const res = mockResponse();

    verifyToken(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "Token expired",
      })
    );
  });

  test("Should return 401 if token invalid", () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    const req = {
      cookies: { token: "invalidToken" },
      headers: {}
    };
    const res = mockResponse();

    verifyToken(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "Invalid token",
      })
    );
  });

});