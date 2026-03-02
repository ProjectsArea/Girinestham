import db from "../../config/db.js";

/* ================= CREATE USER ================= */
export const insertUser = (email, hashedPassword, role_id) => {
  const query =
    "INSERT INTO users (email, password, role_id) VALUES (?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.query(query, [email, hashedPassword, role_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/* ================= GET USERS ================= */
export const fetchUsers = () => {
  const query = `
    SELECT u.id, u.email, u.role_id, u.created_at, u.is_active,
           r.role_name, r.description AS role_description
    FROM users u
    LEFT JOIN roles r ON u.role_id = r.id
    WHERE u.is_active = TRUE
    ORDER BY u.created_at DESC
  `;

  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/* ================= UPDATE USER ================= */
export const modifyUser = (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/* ================= DELETE USER ================= */
export const softDeleteUser = (id) => {
  const query =
    "UPDATE users SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};