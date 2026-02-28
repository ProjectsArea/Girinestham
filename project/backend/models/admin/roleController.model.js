import db from "../../config/db.js";

/* ================= CREATE ROLE ================= */
export const insertRole = (role_name, description) => {
  const query =
    "INSERT INTO roles (role_name, description) VALUES (?, ?)";

  return new Promise((resolve, reject) => {
    db.query(query, [role_name, description || null], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/* ================= GET ROLES ================= */
export const fetchRoles = () => {
  const query =
    "SELECT id, role_name, description, created_at FROM roles WHERE is_active = TRUE ORDER BY created_at DESC";

  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/* ================= UPDATE ROLE ================= */
export const modifyRole = (id, role_name, description) => {
  const query =
    "UPDATE roles SET role_name = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [role_name, description || null, id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};