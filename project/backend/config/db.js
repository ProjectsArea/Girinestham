import mysql from "mysql2";
import dotenv from "dotenv";
import { DATABASE_CONSTANTS } from "../constants/index.js";
import { logApplicationEvent } from "../utils/logger.js";

dotenv.config();

let db;

// Create Pool
export const createDBPool = () => {
  db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: "utf8mb4",
    waitForConnections: DATABASE_CONSTANTS.WAIT_FOR_CONNECTIONS,
    connectionLimit: DATABASE_CONSTANTS.CONNECTION_LIMIT,
    queueLimit: DATABASE_CONSTANTS.QUEUE_LIMIT,
    multipleStatements: true,
  });

  console.log("✅ MySQL Pool Created");
const pool = db.promise();
  // Test Connection (only if not test environment)
  if (process.env.NODE_ENV !== "test") {
    db.getConnection((err, connection) => {
      if (err) {
        logApplicationEvent({
          logLevel: "ERROR",
          logType: "database",
          method: "DB_CONNECTION",
          endpoint: "N/A",
          userId: null,
          adminId: null,
          statusCode: 500,
          message: "MySQL Connection Failed",
          details: err.message,
          responseTime: 0,
        });

        console.error("❌ MySQL Connection Failed:", err.message);
      } else {
        console.log("✅ MySQL Connected Successfully");
        connection.release();
      }
    });
  }

  return db;
};

// Safe getter
export const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized yet!");
  }
  return db;
};

// Default Export (for direct query usage)
export default {
  query: (...args) => {
    if (!db) {
      throw new Error("Database not initialized yet!");
    }
    return db.promise().query(...args);
  },

  promise: () => {
    if (!db) {
      throw new Error("Database not initialized yet!");
    }
    return db.promise();
  },
};