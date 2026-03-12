import {
  getPaymentMeta,
  getPaymentSubTypesByMode,
  getPaymentsDashboard,
  listPayments,
  getPayment,
  collectOnlinePayment,
  collectOfflinePayment,
} from "../../controllers/volunteer/paymentController.js";

import {
  fetchPaymentMeta,
  fetchPaymentSubTypes,
  fetchPaymentsDashboard,
  getPaymentById,
  insertPayment,
  generateReceiptNumber,
  getPaymentStatusMap,
  getPaymentDecisionMap,
  isTransactionIdDuplicate,
  fetchPayments,
} from "../../models/volunteer/paymentController.model.js";

import { ERROR_MESSAGES } from "../../constants/index.js";

jest.mock("../../models/volunteer/paymentController.model.js");
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
  originalUrl: "/api/volunteer/payments",
  user: { id: 11 },
  body: {},
  params: {},
  query: {},
  ...overrides,
});

const validPaymentPayload = {
  student_id: 1,
  purpose_id: 2,
  payment_mode_id: 3,
  payment_sub_type_id: 4,
  collected_by_id: 5,
  amount: 1200,
  remarks: "Paid",
  reference_id: 7,
};

describe("Volunteer Payment Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getPaymentMeta - success returns 200", async () => {
    fetchPaymentMeta.mockResolvedValue({
      paymentModes: [{ id: 1, mode_name: "Online" }],
    });
    const req = buildReq();
    const res = mockResponse();

    await getPaymentMeta(req, res);

    expect(fetchPaymentMeta).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
      }),
    );
  });

  test("getPaymentMeta - error returns 500", async () => {
    fetchPaymentMeta.mockRejectedValue(new Error("DB error"));
    const req = buildReq();
    const res = mockResponse();

    await getPaymentMeta(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: ERROR_MESSAGES.DATABASE_ERROR,
      }),
    );
  });

  test("getPaymentSubTypesByMode - invalid payment_mode_id returns 400", async () => {
    const req = buildReq({ query: { payment_mode_id: "abc" } });
    const res = mockResponse();

    await getPaymentSubTypesByMode(req, res);

    expect(fetchPaymentSubTypes).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("getPaymentSubTypesByMode - success returns 200", async () => {
    fetchPaymentSubTypes.mockResolvedValue([{ id: 2, sub_type_name: "UPI" }]);
    const req = buildReq({ query: { payment_mode_id: "3" } });
    const res = mockResponse();

    await getPaymentSubTypesByMode(req, res);

    expect(fetchPaymentSubTypes).toHaveBeenCalledWith(3);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("getPaymentSubTypesByMode - error returns 500", async () => {
    fetchPaymentSubTypes.mockRejectedValue(new Error("DB error"));
    const req = buildReq({ query: { payment_mode_id: "3" } });
    const res = mockResponse();

    await getPaymentSubTypesByMode(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("getPaymentsDashboard - success returns 200", async () => {
    fetchPaymentsDashboard.mockResolvedValue({ total_collections: 3 });
    const req = buildReq();
    const res = mockResponse();

    await getPaymentsDashboard(req, res);

    expect(fetchPaymentsDashboard).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("getPaymentsDashboard - error returns 500", async () => {
    fetchPaymentsDashboard.mockRejectedValue(new Error("DB error"));
    const req = buildReq();
    const res = mockResponse();

    await getPaymentsDashboard(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("listPayments - success returns 200 with parsed filters", async () => {
    fetchPayments.mockResolvedValue({
      payments: [{ payment_id: 1 }],
      meta: { total: 1, page: 2, limit: 5, totalPages: 1 },
    });
    const req = buildReq({
      query: {
        page: "2",
        limit: "5",
        student_name: "Test",
        receipt_no: "R001",
        transaction_id: "TXN1",
        purpose_id: "4",
        payment_mode_id: "1",
        payment_status_id: "2",
        date_from: "2026-01-01",
        date_to: "2026-01-31",
      },
    });
    const res = mockResponse();

    await listPayments(req, res);

    expect(fetchPayments).toHaveBeenCalledWith({
      page: 2,
      limit: 5,
      student_name: "Test",
      receipt_no: "R001",
      transaction_id: "TXN1",
      purpose_id: "4",
      payment_mode_id: "1",
      payment_status_id: "2",
      date_from: "2026-01-01",
      date_to: "2026-01-31",
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("listPayments - error returns 500", async () => {
    fetchPayments.mockRejectedValue(new Error("DB error"));
    const req = buildReq();
    const res = mockResponse();

    await listPayments(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("getPayment - invalid id returns 400", async () => {
    const req = buildReq({ params: { id: "x" } });
    const res = mockResponse();

    await getPayment(req, res);

    expect(getPaymentById).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("getPayment - not found returns 404", async () => {
    getPaymentById.mockResolvedValue(null);
    const req = buildReq({ params: { id: "9" } });
    const res = mockResponse();

    await getPayment(req, res);

    expect(getPaymentById).toHaveBeenCalledWith(9);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  test("getPayment - success returns 200", async () => {
    getPaymentById.mockResolvedValue({ payment_id: 9 });
    const req = buildReq({ params: { id: "9" } });
    const res = mockResponse();

    await getPayment(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("getPayment - error returns 500", async () => {
    getPaymentById.mockRejectedValue(new Error("DB error"));
    const req = buildReq({ params: { id: "9" } });
    const res = mockResponse();

    await getPayment(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("collectOnlinePayment - invalid payload returns 400", async () => {
    const req = buildReq({ method: "POST", body: {} });
    const res = mockResponse();

    await collectOnlinePayment(req, res);

    expect(isTransactionIdDuplicate).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("collectOnlinePayment - missing transaction id returns 400", async () => {
    const req = buildReq({
      method: "POST",
      body: { ...validPaymentPayload },
    });
    const res = mockResponse();

    await collectOnlinePayment(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("collectOnlinePayment - duplicate transaction id returns 409", async () => {
    isTransactionIdDuplicate.mockResolvedValue(true);
    const req = buildReq({
      method: "POST",
      body: { ...validPaymentPayload, transaction_id: "TXN-101" },
    });
    const res = mockResponse();

    await collectOnlinePayment(req, res);

    expect(isTransactionIdDuplicate).toHaveBeenCalledWith("TXN-101");
    expect(res.status).toHaveBeenCalledWith(409);
  });

  test("collectOnlinePayment - success returns 201", async () => {
    isTransactionIdDuplicate.mockResolvedValue(false);
    getPaymentStatusMap.mockResolvedValue({ success: 2 });
    getPaymentDecisionMap.mockResolvedValue({ approved: 6 });
    insertPayment.mockResolvedValue({ insertId: 45 });
    const req = buildReq({
      method: "POST",
      body: { ...validPaymentPayload, transaction_id: "TXN-102" },
    });
    const res = mockResponse();

    await collectOnlinePayment(req, res);

    expect(insertPayment).toHaveBeenCalledWith(
      expect.objectContaining({
        student_id: 1,
        amount: 1200,
        transaction_id: "TXN-102",
        payment_status_id: 2,
        payment_decision_id: 6,
      }),
    );
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test("collectOnlinePayment - duplicate insert error returns 409", async () => {
    isTransactionIdDuplicate.mockResolvedValue(false);
    getPaymentStatusMap.mockResolvedValue({ success: 2 });
    getPaymentDecisionMap.mockResolvedValue({ approved: 6 });
    insertPayment.mockRejectedValue({ code: "ER_DUP_ENTRY", message: "dup" });
    const req = buildReq({
      method: "POST",
      body: { ...validPaymentPayload, transaction_id: "TXN-103" },
    });
    const res = mockResponse();

    await collectOnlinePayment(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
  });

  test("collectOnlinePayment - db error returns 500", async () => {
    isTransactionIdDuplicate.mockResolvedValue(false);
    getPaymentStatusMap.mockResolvedValue({ success: 2 });
    getPaymentDecisionMap.mockResolvedValue({ approved: 6 });
    insertPayment.mockRejectedValue(new Error("DB error"));
    const req = buildReq({
      method: "POST",
      body: { ...validPaymentPayload, transaction_id: "TXN-104" },
    });
    const res = mockResponse();

    await collectOnlinePayment(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("collectOfflinePayment - invalid payload returns 400", async () => {
    const req = buildReq({ method: "POST", body: {} });
    const res = mockResponse();

    await collectOfflinePayment(req, res);

    expect(generateReceiptNumber).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("collectOfflinePayment - missing proof returns 400", async () => {
    const req = buildReq({
      method: "POST",
      body: { ...validPaymentPayload },
    });
    const res = mockResponse();

    await collectOfflinePayment(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("collectOfflinePayment - success with generated receipt returns 201", async () => {
    getPaymentStatusMap.mockResolvedValue({ pending: 3 });
    generateReceiptNumber.mockResolvedValue("RCPT-001");
    insertPayment.mockResolvedValue({ insertId: 70 });
    const req = buildReq({
      method: "POST",
      body: { ...validPaymentPayload, proof: "proof-url" },
    });
    const res = mockResponse();

    await collectOfflinePayment(req, res);

    expect(generateReceiptNumber).toHaveBeenCalled();
    expect(insertPayment).toHaveBeenCalledWith(
      expect.objectContaining({
        proof: "proof-url",
        payment_status_id: 3,
        receipt_no: "RCPT-001",
      }),
    );
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test("collectOfflinePayment - success with provided receipt returns 201", async () => {
    getPaymentStatusMap.mockResolvedValue({ pending: 3 });
    insertPayment.mockResolvedValue({ insertId: 71 });
    const req = buildReq({
      method: "POST",
      body: {
        ...validPaymentPayload,
        proof: "proof-url",
        receipt_no: "MANUAL-1001",
      },
    });
    const res = mockResponse();

    await collectOfflinePayment(req, res);

    expect(generateReceiptNumber).not.toHaveBeenCalled();
    expect(insertPayment).toHaveBeenCalledWith(
      expect.objectContaining({
        receipt_no: "MANUAL-1001",
      }),
    );
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test("collectOfflinePayment - db error returns 500", async () => {
    getPaymentStatusMap.mockResolvedValue({ pending: 3 });
    generateReceiptNumber.mockResolvedValue("RCPT-002");
    insertPayment.mockRejectedValue(new Error("DB error"));
    const req = buildReq({
      method: "POST",
      body: { ...validPaymentPayload, proof: "proof-url" },
    });
    const res = mockResponse();

    await collectOfflinePayment(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
