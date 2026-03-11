import db from "../../config/db.js";

const executeQuery = (query, values = []) =>
  new Promise((resolve, reject) => {
    db.query(query, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });

export const fetchPaymentMeta = async () => {
  const [paymentPurposes, paymentModes, paymentStatuses, collectedByTypes] =
    await Promise.all([
      executeQuery(
        "SELECT id, purpose_name, created_at FROM mst_payment_purposes ORDER BY id ASC",
      ),
      executeQuery(
        "SELECT id, mode_name, created_at FROM mst_payment_modes ORDER BY id ASC",
      ),
      executeQuery(
        "SELECT id, status_name, created_at FROM mst_payment_statuses ORDER BY id ASC",
      ),
      executeQuery(
        "SELECT id, type_name, created_at FROM mst_collected_by_types ORDER BY id ASC",
      ),
    ]);

  return { paymentPurposes, paymentModes, paymentStatuses, collectedByTypes };
};

export const fetchPaymentSubTypes = (paymentModeId) =>
  executeQuery(
    `SELECT id, sub_type_name, payment_mode_id, created_at
     FROM mst_payment_sub_types
     WHERE payment_mode_id = ?
     ORDER BY id ASC`,
    [paymentModeId],
  );

//TODO: remove and import function from ./studentController.model.js
export const getStudentById = async (studentId) => {
  const rows = await executeQuery(
    `SELECT id, full_name, contact_number, approval_status, status
     FROM tbl_students
     WHERE id = ?`,
    [studentId],
  );
  return rows[0] || null;
};

export const getPurposeById = async (purposeId) => {
  const rows = await executeQuery(
    "SELECT id, purpose_name FROM mst_payment_purposes WHERE id = ?",
    [purposeId],
  );
  return rows[0] || null;
};

export const getPaymentModeById = async (paymentModeId) => {
  const rows = await executeQuery(
    "SELECT id, mode_name FROM mst_payment_modes WHERE id = ?",
    [paymentModeId],
  );
  return rows[0] || null;
};

export const getPaymentSubTypeById = async (paymentSubTypeId) => {
  const rows = await executeQuery(
    "SELECT id, sub_type_name, payment_mode_id FROM mst_payment_sub_types WHERE id = ?",
    [paymentSubTypeId],
  );
  return rows[0] || null;
};

export const getCollectedByTypeById = async (collectedById) => {
  const rows = await executeQuery(
    "SELECT id, type_name FROM mst_collected_by_types WHERE id = ?",
    [collectedById],
  );
  return rows[0] || null;
};

export const getPaymentStatusMap = async () => {
  const rows = await executeQuery(
    "SELECT id, status_name FROM mst_payment_statuses ORDER BY id ASC",
  );

  const map = {};
  rows.forEach((row) => {
    map[row.status_name.toLowerCase()] = row.id;
  });
  return map;
};

export const getPaymentDecisionMap = async () => {
  const rows = await executeQuery(
    "SELECT id, decision_name FROM mst_payment_decisions ORDER BY id ASC",
  );

  const map = {};
  rows.forEach((row) => {
    map[row.decision_name.toLowerCase()] = row.id;
  });
  return map;
};

export const isTransactionIdDuplicate = async (transactionId) => {
  const rows = await executeQuery(
    "SELECT id FROM tbl_payments WHERE transaction_id = ? LIMIT 1",
    [transactionId],
  );
  return rows.length > 0;
};

export const getMembershipById = async (membershipId) => {
  const rows = await executeQuery(
    `SELECT
      m.id,
      m.membership_name,
      m.price,
      m.registration_fee
    FROM tbl_memberships m
    WHERE m.id = ?`,
    [membershipId],
  );

  return rows[0] || null;
};

export const getTournamentById = async (tournamentId) => {
  const rows = await executeQuery(
    `SELECT
      t.id,
      t.tournament_name,
      t.participation_fee
    FROM tbl_tournaments t
    WHERE t.id = ?`,
    [tournamentId],
  );

  return rows[0] || null;
};

export const fetchPaymentsDashboard = async () => {
  const rows = await executeQuery(
    `SELECT
      (SELECT COUNT(*) FROM tbl_payments WHERE payment_date = CURDATE()) AS total_payments_today,
      (SELECT COUNT(*) FROM tbl_payments WHERE transaction_id IS NOT NULL AND payment_date = CURDATE()) AS total_online_payments_today,
      (SELECT COUNT(*) FROM tbl_payments WHERE transaction_id IS NULL AND payment_date = CURDATE()) AS total_offline_payments_today,
      (SELECT COUNT(*)
       FROM tbl_payments p
       INNER JOIN mst_payment_statuses ps ON ps.id = p.payment_status_id
       WHERE LOWER(ps.status_name) = 'pending') AS pending_approval_payments`,
  );
  return rows[0] || {};
};

export const fetchPayments = async ({
  page = 1,
  limit = 30,
  student_name = "",
  receipt_no = "",
  transaction_id = "",
  purpose_id = "",
  payment_mode_id = "",
  payment_status_id = "",
  date_from = "",
  date_to = "",
} = {}) => {
  const offset = (page - 1) * limit;
  const conditions = [];
  const values = [];

  if (student_name) {
    conditions.push("s.full_name LIKE ?");
    values.push(`%${student_name}%`);
  }
  if (receipt_no) {
    conditions.push("p.receipt_no LIKE ?");
    values.push(`%${receipt_no}%`);
  }
  if (transaction_id) {
    conditions.push("p.transaction_id LIKE ?");
    values.push(`%${transaction_id}%`);
  }
  if (purpose_id) {
    conditions.push("p.purpose_id = ?");
    values.push(purpose_id);
  }
  if (payment_mode_id) {
    conditions.push("p.payment_mode_id = ?");
    values.push(payment_mode_id);
  }
  if (payment_status_id) {
    conditions.push("p.payment_status_id = ?");
    values.push(payment_status_id);
  }
  if (date_from) {
    conditions.push("p.payment_date >= ?");
    values.push(date_from);
  }
  if (date_to) {
    conditions.push("p.payment_date <= ?");
    values.push(date_to);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  const baseQuery = `
    FROM tbl_payments p
    LEFT JOIN tbl_students s ON s.id = p.student_id
    LEFT JOIN mst_payment_purposes pp ON pp.id = p.purpose_id
    LEFT JOIN mst_payment_modes pm ON pm.id = p.payment_mode_id
    LEFT JOIN mst_payment_statuses ps ON ps.id = p.payment_status_id
    LEFT JOIN mst_collected_by_types cbt ON cbt.id = p.collected_by_id
    ${whereClause}
  `;

  const countRows = await executeQuery(
    `SELECT COUNT(*) AS total ${baseQuery}`,
    values,
  );
  const total = Number(countRows[0]?.total || 0);

  const dataRows = await executeQuery(
    `SELECT
      p.id,
      p.receipt_no,
      s.full_name AS student_name,
      pp.purpose_name,
      pm.mode_name AS payment_mode,
      p.amount,
      ps.status_name AS payment_status,
      p.payment_date,
      cbt.type_name AS collected_by_type,
      p.transaction_id,
      p.reference_id
    ${baseQuery}
    ORDER BY p.id DESC
    LIMIT ? OFFSET ?`,
    [...values, limit, offset],
  );

  return {
    payments: dataRows,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getPaymentById = async (paymentId) => {
  const rows = await executeQuery(
    `SELECT
      p.*,
      s.full_name AS student_name,
      s.contact_number AS student_contact,
      pp.purpose_name,
      pm.mode_name AS payment_mode,
      pst.sub_type_name AS payment_sub_type,
      ps.status_name AS payment_status,
      cbt.type_name AS collected_by_type
    FROM tbl_payments p
    LEFT JOIN tbl_students s ON s.id = p.student_id
    LEFT JOIN mst_payment_purposes pp ON pp.id = p.purpose_id
    LEFT JOIN mst_payment_modes pm ON pm.id = p.payment_mode_id
    LEFT JOIN mst_payment_sub_types pst ON pst.id = p.payment_sub_type_id
    LEFT JOIN mst_payment_statuses ps ON ps.id = p.payment_status_id
    LEFT JOIN mst_collected_by_types cbt ON cbt.id = p.collected_by_id
    WHERE p.id = ?`,
    [paymentId],
  );

  return rows[0] || null;
};

export const updatePaymentDecision = ({
  paymentId,
  paymentStatusId,
  paymentDecisionId,
  remarks,
  decisionDate,
}) =>
  executeQuery(
    `UPDATE tbl_payments
     SET payment_status_id = ?,
         payment_decision_id = ?,
         remarks = ?,
         decision_date = ?
     WHERE id = ?`,
    [paymentStatusId, paymentDecisionId, remarks, decisionDate, paymentId],
  );
