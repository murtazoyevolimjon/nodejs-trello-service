import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "fullnodejs_trello_service",
  port: process.env.DB_PORT || 5432,
});

console.log("PostgreSQL connected successfully!");

export default pool;
