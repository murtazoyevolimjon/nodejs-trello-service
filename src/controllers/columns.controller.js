import pool from "../config/db.js";


export const createColumn = async (req, res) => {
  try {
    const { title, board_id } = req.body;
    if (!title || !board_id)
      return res.status(400).json({ success: false, message: "Title va board_id kerak" });

    const { rows } = await pool.query(
      `INSERT INTO columns (title, board_id) VALUES ($1, $2) RETURNING *`,
      [title, board_id]
    );

    res.status(201).json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server xatosi", error: err.message });
  }
};

export const getAllColumns = async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM columns ORDER BY created_at DESC`);
    res.status(200).json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server xatosi", error: err.message });
  }
};


export const getOneColumn = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(`SELECT * FROM columns WHERE id=$1`, [id]);
    if (!rows[0])
      return res.status(404).json({ success: false, message: `${id} topilmadi` });

    res.status(200).json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server xatosi", error: err.message });
  }
};


export const updateColumn = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const { rows } = await pool.query(
      `UPDATE columns SET title=$1 WHERE id=$2 RETURNING *`,
      [title, id]
    );
    if (!rows[0])
      return res.status(404).json({ success: false, message: `${id} topilmadi` });

    res.status(200).json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server xatosi", error: err.message });
  }
};


export const deleteColumn = async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query(`DELETE FROM columns WHERE id=$1`, [id]);
    if (rowCount === 0)
      return res.status(404).json({ success: false, message: `${id} topilmadi` });

    res.status(200).json({ success: true, message: "Column o‘chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server xatosi", error: err.message });
  }
};

