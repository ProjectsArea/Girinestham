import db from "../../config/db.js";
import { fetchMembershipPlans } from "./studentController.model.js";

const executeQuery = (query, values = []) =>
  new Promise((resolve, reject) => {
    db.query(query, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });

export const fetchPaymentMeta = async () => {
  const [
    paymentPurposes,
    paymentModes,
    paymentStatuses,
    collectedByTypes,
    membershipPlans,
  ] = await Promise.all([
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
    fetchMembershipPlans(),
  ]);

  return {
    paymentPurposes,
    paymentModes,
    paymentStatuses,
    collectedByTypes,
    membershipPlans,
  };
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
  sort_by = "",
  order = "",
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
    LEFT JOIN mst_payment_decisions pd ON pd.id = p.payment_decision_id
    LEFT JOIN mst_payment_sub_types pst ON pst.id = p.payment_sub_type_id
    ${whereClause}
  `;

  const countRows = await executeQuery(
    `SELECT COUNT(*) AS total ${baseQuery}`,
    values,
  );
  const total = Number(countRows[0]?.total || 0);

  const sortColumnsMap = {
    receipt_no: "p.receipt_no",
    student_name: "s.full_name",
    purpose_name: "pp.purpose_name",
    payment_mode_name: "pm.mode_name",
    amount: "p.amount",
    status_name: "ps.status_name",
    payment_decision: "pd.decision_name",
    payment_date: "p.payment_date",
    payment_type: "pst.sub_type_name",
  };

  const validOrder = order?.toUpperCase() === "ASC" ? "ASC" : "DESC";
  const orderClause = sortColumnsMap[sort_by]
    ? `ORDER BY ${sortColumnsMap[sort_by]} ${validOrder}`
    : "ORDER BY p.id DESC";

  const dataRows = await executeQuery(
    `SELECT
      p.id,
      p.receipt_no,
      s.full_name AS student_name,
      pp.purpose_name,
      pm.mode_name AS payment_mode,
      p.amount,
      ps.status_name AS payment_status,
      pd.decision_name AS payment_decision,
      pst.sub_type_name AS payment_type,
      p.payment_date,
      cbt.type_name AS collected_by_type,
      p.transaction_id,
      p.reference_id
    ${baseQuery}
    ${orderClause}
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
      cbt.type_name AS collected_by_type,
      pd.decision_name AS payment_decision
    FROM tbl_payments p
    LEFT JOIN tbl_students s ON s.id = p.student_id
    LEFT JOIN mst_payment_purposes pp ON pp.id = p.purpose_id
    LEFT JOIN mst_payment_modes pm ON pm.id = p.payment_mode_id
    LEFT JOIN mst_payment_sub_types pst ON pst.id = p.payment_sub_type_id
    LEFT JOIN mst_payment_statuses ps ON ps.id = p.payment_status_id
    LEFT JOIN mst_collected_by_types cbt ON cbt.id = p.collected_by_id
    LEFT JOIN mst_payment_decisions pd ON pd.id=p.payment_decision_id

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

export const updateMembershipPayment = async ({
  referenceId,
  paymentId,
  amount,
  successStatusId,
}) => {
  await executeQuery(
    `UPDATE tbl_student_memberships
     SET fee_paid = COALESCE(fee_paid, 0) + ?,
         fee_status_id = ?,
         payment_id = ?
     WHERE id = ?`,
    [amount, successStatusId, paymentId, referenceId],
  );

  await executeQuery(
    `UPDATE tbl_memberships m
     INNER JOIN tbl_student_memberships sm ON sm.membership_id = m.id
     SET m.total_amount_paid = COALESCE(m.total_amount_paid, 0) + ?
     WHERE sm.id = ?`,
    [amount, referenceId],
  );
};

export const updateTournamentPayment = async ({
  referenceId,
  paymentId,
  amount,
  successStatusId,
}) => {
  await executeQuery(
    `UPDATE tbl_tournament_registrations
     SET fee_paid = COALESCE(fee_paid, 0) + ?,
         fee_status_id = ?,
         payment_id = ?
     WHERE id = ?`,
    [amount, successStatusId, paymentId, referenceId],
  );

  await executeQuery(
    `UPDATE tbl_tournaments t
     INNER JOIN tbl_tournament_registrations tr ON tr.tournament_id = t.id
     SET t.total_collected_fee = COALESCE(t.total_collected_fee, 0) + ?
     WHERE tr.id = ?`,
    [amount, referenceId],
  );
};

export const insertPayment = async (data) => {
  const rows = await executeQuery(
    `INSERT INTO tbl_payments (
      receipt_no,
      payment_date,
      payment_time,
      payment_mode_id,
      payment_sub_type_id,
      transaction_id,
      payment_status_id,
      collected_by_id,
      proof,
      amount,
      purpose_id,
      student_id,
      reference_id,
      payment_decision_id,
      remarks,
      decision_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.receipt_no,
      data.payment_date,
      data.payment_time,
      data.payment_mode_id,
      data.payment_sub_type_id,
      data.transaction_id,
      data.payment_status_id,
      data.collected_by_id,
      data.proof,
      data.amount,
      data.purpose_id,
      data.student_id,
      data.reference_id,
      data.payment_decision_id,
      data.remarks,
      data.decision_date,
    ],
  );

  return rows;
};

export const generateReceiptNumber = async (dateString) => {
  const rows = await executeQuery(
    "SELECT COUNT(*) AS total FROM tbl_payments WHERE payment_date = ?",
    [dateString],
  );

  const count = Number(rows[0]?.total || 0) + 1;
  const compactDate = dateString.replaceAll("-", "");
  return `RCP-${compactDate}-${String(count).padStart(3, "0")}`;
};

export const approvePayment = async (paymentId) => {
  await executeQuery(
    "UPDATE tbl_payments SET payment_status_id = ?, payment_decision_id = ? WHERE id = ?",
    [1, 1, paymentId],
  );
};

export const rejectPayment = async (paymentId) => {
  await executeQuery(
    "UPDATE tbl_payments SET payment_status_id = ?, payment_decision_id = ? WHERE id = ?",
    [3, 3, paymentId],
  );
};

export const incrementMembershipAmountPaid = async (amount, membershipId) => {
  await executeQuery(
    "UPDATE tbl_memberships SET total_amount_paid = total_amount_paid + ? WHERE id = ?",
    [amount, membershipId],
  );
};

export const insertStudentMembership = async (data) => {
  await executeQuery(
    `
    INSERT INTO tbl_student_memberships (student_id,
    membership_id,
    mem_registration_date,
    fee_paid,
    fee_type_id,
    payment_id
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `,
    [
      data.student_id,
      data.membership_id,
      data.registration_date,
      data.fee_paid,
      data.fee_type_id,
      data.payment_id,
    ],
  );
};

export const hasTournamentRegistration = async ({ studentId, tournamentId }) => {
  const rows = await executeQuery(
    `SELECT id
     FROM tbl_tournament_registrations
     WHERE student_id = ? AND tournament_id = ?
     LIMIT 1`,
    [studentId, tournamentId],
  );

  return rows[0] || null;
};

export const insertTournamentRegistration = async (data) => {
  const rows = await executeQuery(
    `INSERT INTO tbl_tournament_registrations (
      student_id,
      tournament_id,
      tour_registration_date,
      fee_type_id,
      fee_paid,
      fee_status_id,
      payment_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.student_id,
      data.tournament_id,
      data.registration_date,
      data.fee_type_id,
      data.fee_paid,
      data.fee_status_id,
      data.payment_id,
    ],
  );

  await executeQuery(
    `UPDATE tbl_tournaments
     SET total_registered = COALESCE(total_registered, 0) + 1,
         total_collected_fee = COALESCE(total_collected_fee, 0) + ?
     WHERE id = ?`,
    [data.fee_paid, data.tournament_id],
  );

  return rows;
};

//**** Tournaments ******

export const fetchTournaments = async () => {
  const rows = await executeQuery(
    `SELECT
      t.id,
      t.tournament_name,
      t.tournament_code,
      t.participation_fee,
      t.tournament_date,
      t.registration_last_date,
      t.total_registered,
      t.max_students_allowed,
      t.registration_status,
      s.sport_name,
      tl.level_name,
      ts.status_name as tournament_status
    FROM tbl_tournaments t
    LEFT JOIN mst_sports s ON s.id = t.sport_id
    LEFT JOIN mst_tournament_levels tl ON tl.id = t.tournament_level_id
    LEFT JOIN mst_tournament_statuses ts ON ts.id = t.tournament_status_id
    WHERE t.registration_status = 1
      AND t.tournament_date >= CURDATE()
    ORDER BY t.tournament_date ASC`,
  );

  return rows;
};

export const fetchTournamentRegistrationsByStudent = async (studentId) => {
  const rows = await executeQuery(
    `SELECT
      tr.id,
      tr.tournament_id,
      tr.fee_paid,
      tr.fee_status_id,
      tr.tour_registration_date,
      t.tournament_name,
      t.participation_fee,
      t.tournament_date,
      ps.status_name as fee_status
    FROM tbl_tournament_registrations tr
    LEFT JOIN tbl_tournaments t ON t.id = tr.tournament_id
    LEFT JOIN mst_payment_statuses ps ON ps.id = tr.fee_status_id
    WHERE tr.student_id = ?
      AND t.tournament_date >= CURDATE()
      AND tr.fee_status_id != (SELECT id FROM mst_payment_statuses WHERE LOWER(status_name) = 'paid')
    ORDER BY t.tournament_date ASC`,
    [studentId],
  );

  return rows;
};

export const getTournamentRegistrationById = async (registrationId) => {
  const rows = await executeQuery(
    `SELECT
      tr.id,
      tr.student_id,
      tr.tournament_id,
      tr.fee_paid,
      tr.fee_status_id,
      tr.tour_registration_date,
      t.tournament_name,
      t.participation_fee,
      s.full_name as student_name,
      s.contact_number
    FROM tbl_tournament_registrations tr
    LEFT JOIN tbl_tournaments t ON t.id = tr.tournament_id
    LEFT JOIN tbl_students s ON s.id = tr.student_id
    WHERE tr.id = ?`,
    [registrationId],
  );

  return rows[0] || null;
};

export const updateTournamentPaymentStatus = async ({
  registrationId,
  amount,
  paymentStatusId,
  paymentId,
}) => {
  await executeQuery(
    `UPDATE tbl_tournament_registrations
     SET fee_paid = COALESCE(fee_paid, 0) + ?,
         fee_status_id = ?,
         payment_id = ?
     WHERE id = ?`,
    [amount, paymentStatusId, paymentId, registrationId],
  );

  await executeQuery(
    `UPDATE tbl_tournaments t
     INNER JOIN tbl_tournament_registrations tr ON tr.tournament_id = t.id
     SET t.total_collected_fee = COALESCE(t.total_collected_fee, 0) + ?
     WHERE tr.id = ?`,
    [amount, registrationId],
  );
};
