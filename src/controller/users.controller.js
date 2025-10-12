import { pool } from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/password.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "name, email and password required" });

    const exists = await pool.query("SELECT id FROM users WHERE email=$1", [
      email,
    ]);
    if (exists.rowCount > 0)
      return res.status(409).json({ message: "User already exists" });

    const hashed = await hashPassword(password);

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashed]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "email and password required" });

    const userRes = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (userRes.rowCount === 0)
      return res.status(404).json({ message: "User not found" });

    const user = userRes.rows[0];

    const valid = await comparePassword(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    delete user.password;
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getUsers = async (_, res) => {
  const data = await pool.query("SELECT id, name, email FROM users");
  res.json(data.rows);
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  const data = await pool.query(
    "SELECT id, name, email FROM users WHERE id=$1",
    [userId]
  );
  if (data.rowCount === 0)
    return res.status(404).json({ message: "User not found" });
  res.json(data.rows[0]);
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;

  let hashed;
  if (password) hashed = await hashPassword(password);

  const data = await pool.query(
    "UPDATE users SET name=COALESCE($1,name), email=COALESCE($2,email), password=COALESCE($3,password) WHERE id=$4 RETURNING id, name, email",
    [name, email, hashed, userId]
  );

  if (data.rowCount === 0)
    return res.status(404).json({ message: "User not found" });
  res.json(data.rows[0]);
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  await pool.query("UPDATE tasks SET userid=NULL WHERE userid=$1", [userId]);

  const del = await pool.query("DELETE FROM users WHERE id=$1 RETURNING id", [
    userId,
  ]);
  if (del.rowCount === 0)
    return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted" });
};
