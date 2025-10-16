import pool from "../config/db.js";

export const createTask = async (req, res) => {
  try {
    const { title, board_id, assigned_to, status } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO tasks(title, board_id, assigned_to, status) VALUES($1, $2, $3, $4) RETURNING *`,
      [title, board_id, assigned_to, status]
    );
    res.status(201).json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server xatosi", error: err.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM tasks ORDER BY created_at DESC`);
    res.status(200).json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server xatosi", error: err.message });
  }
};

export const getOneTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(`SELECT * FROM tasks WHERE id=$1`, [id]);
    if (!rows[0]) return res.status(404).json({ success: false, message: `${id} topilmadi` });
    res.status(200).json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server xatosi", error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status, assigned_to } = req.body;
    const { rows } = await pool.query(
      `UPDATE tasks SET title=$1, status=$2, assigned_to=$3 WHERE id=$4 RETURNING *`,
      [title, status, assigned_to, id]
    );
    if (!rows[0]) return res.status(404).json({ success: false, message: `${id} topilmadi` });
    res.status(200).json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server xatosi", error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query(`DELETE FROM tasks WHERE id=$1`, [id]);
    if (rowCount === 0) return res.status(404).json({ success: false, message: `${id} topilmadi` });
    res.status(200).json({ success: true, message: "Task o‘chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server xatosi", error: err.message });
  }
};



