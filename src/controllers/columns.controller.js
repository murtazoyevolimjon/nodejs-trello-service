import pool from "../config/db.js";


export const createColumn = async (req, res) => {
  try {
    const { board_id, title, position } = req.body;
    if (!board_id || !title)
      return res.status(400).json({ message: "board_id va title kerak" });

    const { rows } = await pool.query(
      `INSERT INTO columns (board_id, title, position)
       VALUES ($1, $2, $3) RETURNING *`,
      [board_id, title, position || 0]
    );

    res.status(201).json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server xatosi", error: err.message });
  }
};


export const getAllColumns = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM columns ORDER BY position");
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server xatosi", error: err.message });
  }
};


export const getColumn = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM columns WHERE id=$1", [id]);

    if (rows.length === 0)
      return res.status(404).json({ message: `${id} topilmadi` });

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server xatosi", error: err.message });
  }
};


export const updateColumn = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, position } = req.body;

    const { rows } = await pool.query(
      `UPDATE columns SET title=$1, position=$2 WHERE id=$3 RETURNING *`,
      [title, position, id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: `${id} topilmadi` });

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server xatosi", error: err.message });
  }
};


export const deleteColumn = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM columns WHERE id=$1 RETURNING *", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({ message: `${id} topilmadi` });

    res.json({ success: true, message: "O‘chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server xatosi", error: err.message });
  }
};
