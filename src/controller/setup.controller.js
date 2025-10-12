import fs from "fs";
import path from "path";
import { pool } from "../config/db.js";

export const setUpTables = async (_, res) => {
  try {
    const filePath = path.resolve("config", "data.sql");
    const sql = fs.readFileSync(filePath, "utf8");

    await pool.query(sql);

    res
      .status(200)
      .json({ message: "Database setup completed successfully ✅" });
  } catch (err) {
    console.error("Setup error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
