import db from "../../config/db.js";

/* ================= INSERT MEMBERSHIP ================= */
export const insertMembership = async (data) => {
  const sql = `
    INSERT INTO tbl_memberships
    (
      membership_name,
      membership_type_id,
      duration_type_id,
      fee_type_id,
      membership_status_id,
      description,
      registration_fee,
      price,
      discount,
      benefits,
      max_students_allowed,
      start_date,
      end_date,
      total_students_registered,
      total_amount_paid,
      created_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, NOW())
  `;

  const values = [
    data.membership_name,
    data.membership_type_id,
    data.duration_type_id,
    data.fee_type_id,
    data.membership_status_id,
    data.description,
    data.registration_fee,
    data.price,
    data.discount,
    data.benefits,
    data.max_students_allowed,
    data.start_date,
    data.end_date,
  ];

  return db.query(sql, values);
};

/* ================= FETCH MEMBERSHIPS ================= */
export const fetchMemberships = async (filters) => {
  let sql = `
    SELECT
      m.id,
      m.membership_name,
      mt.type_name,
      dt.duration_name,
      m.price,
      m.total_students_registered,
      ms.status_name
    FROM tbl_memberships m
    LEFT JOIN mst_membership_types mt ON m.membership_type_id = mt.id
    LEFT JOIN mst_duration_types dt ON m.duration_type_id = dt.id
    LEFT JOIN mst_membership_statuses ms ON m.membership_status_id = ms.id
    WHERE 1=1
  `;

  const values = [];

  if (filters.name) {
    sql += " AND m.membership_name LIKE ?";
    values.push(`%${filters.name}%`);
  }

  if (filters.type) {
    sql += " AND m.membership_type_id = ?";
    values.push(filters.type);
  }

  if (filters.status) {
    sql += " AND m.membership_status_id = ?";
    values.push(filters.status);
  }

  sql += " ORDER BY m.created_at DESC LIMIT ? OFFSET ?";
  values.push(filters.limit || 10, filters.offset || 0);

  return db.query(sql, values);
};

/* ================= FETCH BY ID ================= */
export const fetchMembershipById = async (id) => {
  return db.query("SELECT * FROM tbl_memberships WHERE id = ?", [id]);
};

/* ================= UPDATE MEMBERSHIP ================= */
export const modifyMembership = async (id, data) => {
  const sql = `
    UPDATE tbl_memberships
    SET
      membership_name = ?,
      membership_type_id = ?,
      duration_type_id = ?,
      fee_type_id = ?,
      membership_status_id = ?,
      description = ?,
      registration_fee = ?,
      price = ?,
      discount = ?,
      benefits = ?,
      max_students_allowed = ?,
      start_date = ?,
      end_date = ?
    WHERE id = ?
  `;

  const values = [
    data.membership_name,
    data.membership_type_id,
    data.duration_type_id,
    data.fee_type_id,
    data.membership_status_id,
    data.description,
    data.registration_fee,
    data.price,
    data.discount,
    data.benefits,
    data.max_students_allowed,
    data.start_date,
    data.end_date,
    id,
  ];

  return db.query(sql, values);
};

/* ================= DELETE MEMBERSHIP ================= */
export const removeMembership = async (id) => {
  return db.query("DELETE FROM tbl_memberships WHERE id = ?", [id]);
};

/* ================= CHECK DUPLICATE NAME ================= */
export const checkMembershipNameExists = async (name) => {
  return db.query(
    "SELECT id FROM tbl_memberships WHERE membership_name = ?",
    [name]
  );
};

/* ================= CHECK STUDENTS REGISTERED ================= */
export const checkStudentsRegistered = async (membershipId) => {
  return db.query(
    "SELECT COUNT(*) AS total FROM tbl_student_memberships WHERE membership_id = ?",
    [membershipId]
  );
};

/* ================= DASHBOARD STATS ================= */
export const fetchMembershipDashboard = async () => {
  const sql = `
    SELECT
      COUNT(*) AS total_memberships,
      SUM(CASE WHEN membership_status_id = 1 THEN 1 ELSE 0 END) AS active_memberships,
      SUM(CASE WHEN membership_status_id = 2 THEN 1 ELSE 0 END) AS inactive_memberships,
      SUM(total_amount_paid) AS total_revenue
    FROM tbl_memberships
  `;

  return db.query(sql);
};

/* ================= ACTIVATE ================= */
export const activateMembership = async (id) => {
  return db.query(
    "UPDATE tbl_memberships SET membership_status_id = 1 WHERE id = ?",
    [id]
  );
};

/* ================= DEACTIVATE ================= */
export const deactivateMembership = async (id) => {
  return db.query(
    "UPDATE tbl_memberships SET membership_status_id = 2 WHERE id = ?",
    [id]
  );
};