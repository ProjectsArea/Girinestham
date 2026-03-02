import mysql from "mysql2";
import dotenv from "dotenv";
import { DATABASE_CONSTANTS } from "../constants/index.js";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: DATABASE_CONSTANTS.WAIT_FOR_CONNECTIONS,
  connectionLimit: DATABASE_CONSTANTS.CONNECTION_LIMIT,
  queueLimit: DATABASE_CONSTANTS.QUEUE_LIMIT
});

// Test connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err.message);
  } else {
    console.log("✅ MySQL Connected Successfully");
    connection.release();
  }
});

export default db;