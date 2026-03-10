import { getRolesController } from "../../controllers/admin/adminController.js";
import { getRoles } from "../../models/admin/adminController.model.js";
import { logApplicationEvent } from "../../utils/logger.js";
import { HTTP_STATUS } from "../../constants/httpStatus.js";

jest.mock("../../models/admin/adminController.model.js");
jest.mock("../../utils/logger.js");

describe("getRolesController", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      method: "GET",
      originalUrl: "/admin/roles",
      userId: "user123",
      adminId: "admin123",
      startTime: Date.now() - 50
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
    process.env.NODE_ENV = "production";
  });

  // TC01
  test("TC01 - Successful role retrieval", async () => {
    const roles = [{ id: 1, name: "admin" }];
    getRoles.mockResolvedValue(roles);

    console.log(" TC01 Input:", { req, res });
    console.log(" Mocked getRoles return:", roles);

    await getRolesController(req, res);

    console.log(" TC01 Output - Status called with:", res.status.mock.calls);
    console.log(" TC01 Output - JSON called with:", res.json.mock.calls);
    console.log(" TC01 Output - Logger called with:", logApplicationEvent.mock.calls);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: roles,
      message: "Roles retrieved successfully"
    });
    expect(logApplicationEvent).toHaveBeenCalledWith(
      expect.objectContaining({ logLevel: "INFO" })
    );
  });

  // TC02
  test("TC02 - Successful retrieval with empty roles", async () => {
    getRoles.mockResolvedValue([]);

    console.log(" TC02 Input:", { req, res });
    console.log(" Mocked getRoles return:", []);

    await getRolesController(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: [],
      message: "Roles retrieved successfully"
    });
  });

  // TC03
  test("TC03 - Successful retrieval with null userId", async () => {
    req.userId = undefined;
    getRoles.mockResolvedValue([{ id: 1 }]);

    await getRolesController(req, res);

    expect(logApplicationEvent).toHaveBeenCalledWith(
      expect.objectContaining({ userId: null })
    );
  });

  // TC04
  test("TC04 - Successful retrieval with null adminId", async () => {
    req.adminId = undefined;
    getRoles.mockResolvedValue([{ id: 1 }]);

    await getRolesController(req, res);

    expect(logApplicationEvent).toHaveBeenCalledWith(
      expect.objectContaining({ adminId: null })
    );
  });

  // TC05
  test("TC05 - Successful retrieval with both IDs missing", async () => {
    req.userId = undefined;
    req.adminId = undefined;
    getRoles.mockResolvedValue([{ id: 1 }]);

    await getRolesController(req, res);

    expect(logApplicationEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: null,
        adminId: null
      })
    );
  });

  // TC06
  test("TC06 - Database error", async () => {
    getRoles.mockRejectedValue(new Error("Database error"));

    console.log(" TC06 Input - Error case:", { req, error: "Database error" });

    await getRolesController(req, res);

    console.log(" TC06 Output - Status called with:", res.status.mock.calls);
    console.log(" TC06 Output - JSON called with:", res.json.mock.calls);
    console.log(" TC06 Output - Logger called with:", logApplicationEvent.mock.calls);

    expect(res.status).toHaveBeenCalledWith(
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Failed to retrieve roles",
      error: "Internal server error"
    });

    expect(logApplicationEvent).toHaveBeenCalledWith(
      expect.objectContaining({ logLevel: "ERROR" })
    );
  });

  // TC07
  test("TC07 - Database error in development mode", async () => {
    process.env.NODE_ENV = "development";

    getRoles.mockRejectedValue(new Error("Database error"));

    await getRolesController(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Failed to retrieve roles",
      error: "Database error"
    });
  });

  // TC08
  test("TC08 - Response time calculation", async () => {
    getRoles.mockResolvedValue([{ id: 1 }]);

    await getRolesController(req, res);

    expect(logApplicationEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        responseTime: expect.any(Number)
      })
    );
  });

  // TC09
  test("TC09 - Logger receives correct metadata", async () => {
    req.method = "POST";
    req.originalUrl = "/admin/test";

    getRoles.mockResolvedValue([{ id: 1 }]);

    await getRolesController(req, res);

    expect(logApplicationEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        endpoint: "/admin/test"
      })
    );
  });

  // TC10
  test("TC10 - getRoles returns unexpected structure", async () => {
    getRoles.mockResolvedValue({});

    await getRolesController(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: {},
      message: "Roles retrieved successfully"
    });
  });

  // TC11
  test("TC11 - getRoles returns null", async () => {
    getRoles.mockResolvedValue(null);

    await getRolesController(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: null,
      message: "Roles retrieved successfully"
    });
  });

  // TC12
  test("TC12 - getRoles throws non-error object", async () => {
    getRoles.mockRejectedValue("DB down");

    await getRolesController(req, res);

    expect(res.status).toHaveBeenCalledWith(
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
    expect(logApplicationEvent).toHaveBeenCalledWith(
      expect.objectContaining({ logLevel: "ERROR" })
    );
  });
});