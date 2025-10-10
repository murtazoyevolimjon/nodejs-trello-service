import { pool } from "../config/db.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashed]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (user.rowCount === 0)
      return res.status(404).json({ message: "User not found" });

    const valid = await comparePassword(password, user.rows[0].password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    delete user.rows[0].password;
    res.json(user.rows[0]);
  } catch (err) {
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
  res.json(data.rows[0]);
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email } = req.body;
  const data = await pool.query(
    "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING id, name, email",
    [name, email, userId]
  );
  res.json(data.rows[0]);
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  await pool.query("UPDATE tasks SET userid=NULL WHERE userid=$1", [userId]);
  await pool.query("DELETE FROM users WHERE id=$1", [userId]);
  res.json({ message: "User deleted" });
};
