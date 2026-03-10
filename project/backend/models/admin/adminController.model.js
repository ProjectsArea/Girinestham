import db from "../../config/db.js";

export const getRoles = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM roles WHERE is_active = TRUE";
        db.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};
