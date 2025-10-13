import { pool } from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/password.js";

const removePassword = (user) => {
  if (!user) return user;
  const copy = { ...user };
  delete copy.password;
  return copy;
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await hashPassword(password);

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashed]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
  
    if (err.code === "23505") {
      return res.status(400).json({ message: "Email allaqachon ro'yxatdan o'tgan" });
    }
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userRes = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (userRes.rowCount === 0)
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

    const user = userRes.rows[0];
    const valid = await comparePassword(password, user.password);
    if (!valid) return res.status(401).json({ message: "Parol noto'g'ri" });

    res.json(removePassword(user));
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (_, res, next) => {
  try {
    const data = await pool.query("SELECT id, name, email FROM users");
    res.json(data.rows);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = await pool.query("SELECT id, name, email FROM users WHERE id=$1", [userId]);
    if (data.rowCount === 0) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    res.json(data.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;

    let query, params;
    if (password) {
      const hashed = await hashPassword(password);
      query = "UPDATE users SET name=COALESCE($1,name), email=COALESCE($2,email), password=COALESCE($3,password) WHERE id=$4 RETURNING id, name, email";
      params = [name, email, hashed, userId];
    } else {
      query = "UPDATE users SET name=COALESCE($1,name), email=COALESCE($2,email) WHERE id=$3 RETURNING id, name, email";
      params = [name, email, userId];
    }

    const data = await pool.query(query, params);
    if (data.rowCount === 0) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    res.json(data.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await pool.query("UPDATE tasks SET userid=NULL WHERE userid=$1", [userId]);
    const del = await pool.query("DELETE FROM users WHERE id=$1 RETURNING id", [userId]);
    if (del.rowCount === 0) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    res.json({ message: "Foydalanuvchi o'chirildi" });
  } catch (err) {
    next(err);
  }
};
