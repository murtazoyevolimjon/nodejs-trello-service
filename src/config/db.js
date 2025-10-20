import pg from "pg";
import dotenv from "dotenv";
dotenv.config({path: "./.env"});

dotenv.config();

// console.log("ENV variables:");
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
// console.log("DB_NAME:", process.env.DB_NAME);

const pool = new pg.Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "node_trello_service",
  port: process.env.DB_PORT || 5432,
});

pool.connect()
  .then(() => console.log("PostgreSQL muvaffaqiyatli ulandi!"))
  .catch((err) => console.error("PostgreSQL ulanish xatosi:", err.message));

export default pool;
