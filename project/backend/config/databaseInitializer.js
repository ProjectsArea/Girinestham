import mysql from "mysql2";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { createDBPool } from "./db.js";

dotenv.config();

export const initializeDatabase = async () => {
  try {
    console.log("🔄 Checking database...");

    // 1️⃣ Create database first (without selecting DB)
    const tempConnection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    await tempConnection
      .promise()
      .query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);

    tempConnection.end();
    console.log("✅ Database ready");

    // 2️⃣ Now create pool AFTER database exists
    const db = createDBPool();

    // 3️⃣ Run SQL files
    const sqlFolder = path.join(process.cwd(), "sql");

    const files = fs.readdirSync(sqlFolder);

    for (const file of files) {
      if (file.endsWith(".sql")) {
        const sql = fs.readFileSync(
          path.join(sqlFolder, file),
          "utf8"
        );

        console.log(`📄 Running: ${file}`);
        await db.promise().query(sql);
        console.log(`✅ Success: ${file}`);
      }
    }

    console.log("🎉 All tables created!");
  } catch (error) {
    console.error("❌ Database Initialization Error:", error.message);
  }
};