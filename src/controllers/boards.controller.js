import pool from "../config/db.js";

export const createBoard = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).send({ success: false, message: "Title kerak" });
    const { rows } = await pool.query(`INSERT INTO boards (title, description) VALUES ($1, $2) RETURNING *`, [title, description]);
    res.status(201).send({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).send({ success: false, message: "Server xatosi", error: err.message });
  }
};

export const getAllBoards = async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM boards ORDER BY created_at DESC`);
    res.status(200).send({ success: true, count: rows.length, data: rows });
  } catch (err) {
    res.status(500).send({ success: false, message: "Server xatosi", error: err.message });
  }
};

export const getOneBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(`SELECT * FROM boards WHERE id=$1`, [id]);
    if (!rows[0]) return res.status(404).send({ success: false, message: `${id} topilmadi` });
    res.status(200).send({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).send({ success: false, message: "Server xatosi", error: err.message });
  }
};

export const updateBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const { rows } = await pool.query(`UPDATE boards SET title=$1, description=$2 WHERE id=$3 RETURNING *`, [title, description, id]);
    if (!rows[0]) return res.status(404).send({ success: false, message: `${id} topilmadi` });
    res.status(200).send({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).send({ success: false, message: "Server xatosi", error: err.message });
  }
};

export const deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query(`DELETE FROM boards WHERE id=$1`, [id]);
    if (rowCount === 0) return res.status(404).send({ success: false, message: `${id} topilmadi` });
    res.status(200).send({ success: true, message: "Board o‘chirildi" });
  } catch (err) {
    res.status(500).send({ success: false, message: "Server xatosi", error: err.message });
  }
};