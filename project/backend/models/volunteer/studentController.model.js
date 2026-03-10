import db from "../../config/db.js";

export const insertStudent = (data) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO tbl_students (full_name, date_of_birth, gender, contact_number,
          email, address, guardian_name, photo, sport_interested_id, emergency_contact)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      data.full_name,
      data.date_of_birth,
      data.gender,
      data.contact_number,
      data.email,
      data.address,
      data.guardian_name,
      data.photo ?? null,
      data.sport_interested_id,
      data.emergency_contact ?? null,
    ];
    db.query(query, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const findAllStudents = ({ page = 1, limit = 30 } = {}) => {
  return new Promise((resolve, reject) => {
    const offset = (page - 1) * limit;

    const dataQuery = `
      SELECT
        s.id,
        s.full_name,
        s.gender,
        s.contact_number,
        s.email,
        m.membership_name,
        sm.mem_status,
        sm.mem_registration_date,
        sm.fee_paid
      FROM tbl_students s
      LEFT JOIN tbl_student_memberships sm ON s.id = sm.student_id
      LEFT JOIN tbl_memberships m ON sm.membership_id = m.id
      LIMIT ? OFFSET ?
    `;

    db.query(
      "SELECT COUNT(*) AS total FROM tbl_students",
      (err, countResults) => {
        if (err) return reject(err);
        const total = countResults[0].total;
        db.query(dataQuery, [limit, offset], (err, results) => {
          if (err) return reject(err);
          resolve({
            students: results,
            meta: {
              total,
              page,
              limit,
              totalPages: Math.ceil(total / limit),
            },
          });
        });
      },
    );
  });
};

export const filterStudents = ({
  page = 1,
  limit = 30,
  id = "",
  name = "",
  email = "",
  phone = "",
  membership_id = "",
  mem_status = "",
  sport_id = "",
  sort_by = "",
  order = "ASC",
} = {}) => {
  return new Promise((resolve, reject) => {
    const offset = (page - 1) * limit;
    const conditions = [];
    const values = [];

    if (id) {
      conditions.push(`s.id = ?`);
      values.push(id);
    }

    if (name) {
      conditions.push(`s.full_name LIKE ?`);
      values.push(`%${name}%`);
    }

    if (email) {
      conditions.push(`s.email LIKE ?`);
      values.push(`%${email}%`);
    }

    if (phone) {
      conditions.push(`s.contact_number LIKE ?`);
      values.push(`%${phone}%`);
    }

    if (membership_id) {
      conditions.push(`sm.membership_id = ?`);
      values.push(membership_id);
    }

    if (mem_status) {
      conditions.push(`sm.mem_status = ?`);
      values.push(mem_status);
    }

    if (sport_id) {
      conditions.push(`s.sport_interested_id = ?`);
      values.push(sport_id);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    let baseQuery = `
      FROM tbl_students s
      LEFT JOIN tbl_student_memberships sm ON s.id = sm.student_id
      LEFT JOIN tbl_memberships m          ON sm.membership_id = m.id
      LEFT JOIN mst_sports sp              ON s.sport_interested_id = sp.id
      ${whereClause}
    `;

    if (sort_by && order) {
      baseQuery += ` ORDER BY s.${sort_by} ${order}`;
    } else {
      baseQuery += ` ORDER BY s.id ASC`;
    }

    const countQuery = `SELECT COUNT(*) AS total ${baseQuery}`;

    const dataQuery = `
      SELECT
        s.id,
        s.full_name,
        s.gender,
        s.contact_number,
        s.email,
        s.created_at,
        sp.sport_name,
        m.membership_name,
        sm.mem_status,
        sm.mem_registration_date
      ${baseQuery}
      LIMIT ? OFFSET ?
    `;

    db.query(countQuery, values, (err, countResults) => {
      if (err) return reject(err);
      const total = countResults[0].total;

      db.query(dataQuery, [...values, limit, offset], (err, results) => {
        if (err) return reject(err);
        resolve({
          students: results,
          meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        });
      });
    });
  });
};

export const findStudentById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT s.id,
      s.full_name,
      s.gender,
      s.email,
      s.created_at,
      s.contact_number,
      s.guardian_name,
      s.photo,
      s.status,
      sp.sport_name,
      sp.id as sport_id
      FROM tbl_students s
      LEFT JOIN mst_sports sp ON s.sport_interested_id = sp.id
      WHERE s.id = ?`;
    db.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const findStudentByNameIdAndEmail = (name, id, email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM tbl_students WHERE full_name LIKE ? AND id = ? AND email = ?`;
    db.query(query, [name, id, email], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const updateStudentStatus = (studentId, status) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE tbl_students SET status = ? WHERE id = ?`;
    db.query(query, [status, studentId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export const fetchSportsList = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT id, sport_name FROM mst_sports ORDER BY id ASC`,
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      },
    );
  });
};

export const fetchMembershipPlans = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        m.id,
        m.membership_name,
        m.price,
        m.fee_type_id,
        m.registration_fee,
        m.discount,
        d.id AS duration_type_id,
        d.duration_name,
        d.duration_in_days
      FROM tbl_memberships m
      LEFT JOIN mst_duration_types d
        ON m.duration_type_id = d.id
      WHERE d.status = 1
      ORDER BY m.id ASC
    `;

    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const getPaymentModes = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, mode_name
      FROM mst_payment_modes
      WHERE mode_name IN ('Online','Offline')
    `;
    db.query(query, (err, rows) => {
      if (err) return reject(err);

      const map = {};
      rows.forEach((r) => (map[r.mode_name] = r.id));
      resolve(map);
    });
  });
};

export const getPaymentStatuses = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, status_name
      FROM mst_payment_statuses
      WHERE status_name IN ('Pending','Success','Failed')
    `;
    db.query(query, (err, rows) => {
      if (err) return reject(err);

      const map = {};
      rows.forEach((r) => (map[r.status_name] = r.id));
      resolve(map);
    });
  });
};

export const getPaymentPurposes = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, purpose_name
      FROM mst_payment_purposes
      WHERE purpose_name IN ('Membership Fee','Tournament Fee')
    `;
    db.query(query, (err, rows) => {
      if (err) return reject(err);

      const map = {};
      rows.forEach((r) => (map[r.purpose_name] = r.id));
      resolve(map);
    });
  });
};

export const insertStudentMembership = (data) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO tbl_student_memberships
      (student_id, membership_id, mem_registration_date,
       fee_type_id, fee_paid, fee_status_id, payment_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.student_id,
      data.membership_id,
      data.mem_registration_date,
      data.fee_type_id,
      data.fee_paid,
      data.fee_status_id,
      data.payment_id,
    ];

    db.query(query, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const patchStudent = (id, data) => {
  return new Promise((resolve, reject) => {
    let baseQuery = ``;
    for (const [index, key] of Object.keys(data).entries()) {
      if (index === Object.keys(data).length - 1) {
        baseQuery += `${key} = ?`;
      } else {
        baseQuery += `${key} = ?, `;
      }
    }

    const query = `UPDATE tbl_students SET
      ${baseQuery}
      WHERE id = ?
    `;

    const values = Object.values(data).concat(id);

    db.query(query, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const fetchStudentStats = (data) => {
  return new Promise((resolve, reject) => {
    let { date } = data;
    if (!date) {
      date = new Date();
    }

    const query = `
      SELECT
        COUNT(*) AS total_registered,
        (SELECT COUNT(*) AS registered_today
          FROM tbl_students
          WHERE created_at >= CURDATE() AND created_at < DATE_ADD(CURDATE(), INTERVAL 1 DAY))
          AS registered_today,
        (SELECT COUNT(*) AS pending_count
        FROM tbl_students
        WHERE approval_status = 'pending') AS pending_count,
        (SELECT SUM(fee_paid) FROM tbl_student_memberships) AS total_fee_collected,
        (SELECT COUNT(*) AS total_memberships FROM tbl_student_memberships) AS total_memberships,
        (SELECT COUNT(*) AS total_active_memberships FROM tbl_student_memberships WHERE mem_status=1) AS total_active_memberships,
        (SELECT COUNT(*) AS total_memberships_registered_today
          FROM tbl_students s
          JOIN tbl_student_memberships sm ON s.id = sm.student_id
          WHERE sm.mem_registration_date >= CURDATE() AND sm.mem_registration_date < DATE_ADD(CURDATE(), INTERVAL 1 DAY))
          AS total_memberships_registered_today
      FROM tbl_students
    `;

    db.query(query, [], (err, results) => {
      if (err) return reject(err);
      resolve({
        ...results[0],
        date: date.toLocaleDateString(),
      });
    });
  });
};

export const fetchStudentsByPendingApproval = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        id,
        full_name,
        email,
        approval_status,
        contact_number
      FROM tbl_students s
      WHERE s.approval_status = 'pending'
    `;

    db.query(query, [], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const insertOfflinePayment = (data) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO tbl_payments (
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
        reference_id,
        payment_decision_id,
        remarks,
        decision_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.receipt_no ?? null,
      data.payment_date ?? null,
      data.payment_time ?? null,
      1,
      data.payment_sub_type_id,
      null,
      data.payment_status_id,
      data.collected_by_id,
      data.proof ?? null,
      data.amount,
      data.purpose_id,
      data.reference_id ?? null,
      data.payment_decision_id,
      data.remarks ?? null,
      data.decision_date ?? null,
    ];

    db.query(query, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
