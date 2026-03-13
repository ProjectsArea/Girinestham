import db from "../../config/db.js";

/* ================= GET ALL TOURNAMENTS ================= */
export const getAllTournaments = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        t.*,
        s.sport_name,
        l.level_name,
        st.status_name,
        COALESCE(tr.total_registered, 0) as total_registered,
        CASE 
          WHEN t.registration_last_date IS NULL THEN 'N/A'
          WHEN t.registration_last_date >= CURDATE() THEN 'Open'
          ELSE 'Closed'
        END as registration_status
      FROM tbl_tournaments t
      LEFT JOIN mst_sports s ON t.sport_id = s.id
      LEFT JOIN mst_tournament_levels l ON t.tournament_level_id = l.id
      LEFT JOIN mst_tournament_statuses st ON t.tournament_status_id = st.id
      LEFT JOIN (
        SELECT 
          tournament_id,
          COUNT(*) as total_registered
        FROM tbl_tournament_registrations
        GROUP BY tournament_id
      ) tr ON t.id = tr.tournament_id
      ORDER BY t.created_at DESC
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Database error in getAllTournaments:", err);
        return reject(err);
      }

      resolve(results);
    });
  });
};

/* ================= GET TOURNAMENT BY ID ================= */
export const getTournamentById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM tbl_tournaments WHERE id = ?";

    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Database error in getTournamentById:", err);
        return reject(err);
      }

      resolve(results[0] || null);
    });
  });
};

/* ================= GET TOURNAMENT REGISTRATIONS ================= */
export const getTournamentRegistrations = (tournamentId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        tr.*,
        s.student_name,
        s.email,
        s.phone,
        s.grade,
        s.section
      FROM tbl_tournament_registrations tr
      LEFT JOIN tbl_students s ON tr.student_id = s.id
      WHERE tr.tournament_id = ?
      ORDER BY tr.created_at DESC
    `;

    db.query(query, [tournamentId], (err, results) => {
      if (err) {
        console.error("Database error in getTournamentRegistrations:", err);
        return reject(err);
      }

      resolve(results);
    });
  });
};

/* ================= CREATE TOURNAMENT ================= */
export const createTournament = (data) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO tbl_tournaments
      (
        tournament_code,
        tournament_name,
        sport_id,
        tournament_level_id,
        tournament_date,
        tournament_time,
        tournament_location,
        registration_last_date,
        organizer_name,
        contact_number,
        participation_fee,
        max_students_allowed,
        tournament_status_id,
        description,
        created_by
      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    db.query(
      query,
      [
        data.tournament_code,
        data.tournament_name,
        data.sport_id,
        data.tournament_level_id,
        data.tournament_date,
        data.tournament_time,
        data.tournament_location,
        data.registration_last_date,
        data.organizer_name,
        data.contact_number,
        data.participation_fee,
        data.max_students_allowed,
        data.tournament_status_id,
        data.description,
        data.created_by,
      ],
      (err, result) => {
        if (err) {
          console.error("Database error in createTournament:", err);
          return reject(err);
        }

        resolve(result.insertId);
      }
    );
  });
};

/* ================= UPDATE TOURNAMENT ================= */
export const updateTournament = (id, data) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE tbl_tournaments
      SET
        tournament_name = ?,
        sport_id = ?,
        tournament_level_id = ?,
        tournament_date = ?,
        tournament_time = ?,
        tournament_location = ?,
        registration_last_date = ?,
        organizer_name = ?,
        contact_number = ?,
        participation_fee = ?,
        max_students_allowed = ?,
        tournament_status_id = ?,
        description = ?,
        updated_by = ?
      WHERE id = ?
    `;

    db.query(
      query,
      [
        data.tournament_name,
        data.sport_id,
        data.tournament_level_id,
        data.tournament_date,
        data.tournament_time,
        data.tournament_location,
        data.registration_last_date,
        data.organizer_name,
        data.contact_number,
        data.participation_fee,
        data.max_students_allowed,
        data.tournament_status_id,
        data.description,
        data.updated_by,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("Database error in updateTournament:", err);
          return reject(err);
        }

        resolve(result.affectedRows);
      }
    );
  });
};

/* ================= DELETE TOURNAMENT ================= */
export const deleteTournament = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM tbl_tournaments WHERE id = ?";

    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Database error in deleteTournament:", err);
        return reject(err);
      }

      resolve(result.affectedRows);
    });
  });
};