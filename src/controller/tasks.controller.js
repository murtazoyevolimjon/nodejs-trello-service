import { pool } from "../config/db.js";

export const getTasks = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const data = await pool.query("SELECT * FROM tasks WHERE boardid=$1", [boardId]);
    res.json(data.rows);
  } catch (err) {
    next(err);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;
    const data = await pool.query("SELECT * FROM tasks WHERE boardid=$1 AND id=$2", [boardId, taskId]);
    if (data.rowCount === 0) return res.status(404).json({ message: "Task not found" });
    res.json(data.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { title, order, description, userId, columnId } = req.body;
    const data = await pool.query(
      "INSERT INTO tasks (title, order_num, description, userid, boardid, columnid) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [title, order, description, userId, boardId, columnId]
    );
    res.status(201).json(data.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;
    const { title, order, description, userId, columnId } = req.body;
    const data = await pool.query(
      `UPDATE tasks SET
         title=COALESCE($1,title),
         order_num=COALESCE($2,order_num),
         description=COALESCE($3,description),
         userid=COALESCE($4,userid),
         columnid=COALESCE($5,columnid)
       WHERE boardid=$6 AND id=$7 RETURNING *`,
      [title, order, description, userId, columnId, boardId, taskId]
    );
    if (data.rowCount === 0) return res.status(404).json({ message: "Task not found" });
    res.json(data.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;
    const del = await pool.query("DELETE FROM tasks WHERE boardid=$1 AND id=$2 RETURNING id", [boardId, taskId]);
    if (del.rowCount === 0) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};
