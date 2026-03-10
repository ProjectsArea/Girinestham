import db from "../../config/db.js";

/* ================= FIND ADMIN BY EMAIL ================= */
export const findAdminByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT * FROM admin_users WHERE email = ? AND is_active = TRUE";

    db.query(query, [email], (err, results) => {
      if (err) {
        console.error("Database error in findAdminByEmail:", err);
        return reject(err);
      }
      console.log("Admin found:", results[0] ? "Yes" : "No");
      resolve(results[0] || null);
    });
  });
};

/* ================= UPDATE LOGIN ATTEMPTS ================= */
export const updateLoginAttempts = (adminId, attempts) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE admin_users SET login_attempts = ? WHERE id = ?";

    db.query(query, [attempts, adminId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

/* ================= LOCK ACCOUNT ================= */
export const lockAdminAccount = (adminId, lockUntil) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE admin_users SET lock_until = ?, login_attempts = 0 WHERE id = ?";

    db.query(query, [lockUntil, adminId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

/* ================= RESET LOGIN ATTEMPTS ================= */
export const resetLoginAttempts = (adminId) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE admin_users SET login_attempts = 0, lock_until = NULL WHERE id = ?";

    db.query(query, [adminId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};