import pool from "../config/db.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, boardid } = req.body;

    if (!title || !boardid) {
      return res.status(400).send({ message: "title va boardid kerak" });
    }

    const result = await pool.query(
      `INSERT INTO tasks (title, description, status, boardid)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, description, status || "todo", boardid]
    );

    res.status(201).send({ success: true, data: result.rows[0] });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Server xatosi", error: err.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
    res.status(200).send({ success: true, data: result.rows });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Server xatosi", error: err.message });
  }
};

export const getOneTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM tasks WHERE id=$1", [id]);
    if (!result.rows.length)
      return res.status(404).send({ message: `${id} topilmadi` });
    res.status(200).send({ success: true, data: result.rows[0] });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Server xatosi", error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const result = await pool.query(
      `UPDATE tasks
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           status = COALESCE($3, status)
       WHERE id=$4
       RETURNING *`,
      [title, description, status, id]
    );

    if (!result.rows.length)
      return res.status(404).send({ message: `${id} topilmadi` });
    res.status(200).send({ success: true, data: result.rows[0] });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Server xatosi", error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM tasks WHERE id=$1 RETURNING *", [id]);
    if (!result.rows.length)
      return res.status(404).send({ message: `${id} topilmadi` });
    res
      .status(200)
      .send({ success: true, message: "O‘chirildi", data: result.rows[0] });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Server xatosi", error: err.message });
  }
};
