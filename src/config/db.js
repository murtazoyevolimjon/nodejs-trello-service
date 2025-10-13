import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
});

pool.connect()
    .then(() => console.log("Siz databasega ulandingiz"))
    .catch(() => console.log("Databasega ulanish bilan muammo"))

export default pool