import { pool } from "../config/db.js";

export const getTasks = async (req, res) => {
  const { boardId } = req.params;
  const data = await pool.query("SELECT * FROM tasks WHERE boardid=$1", [
    boardId,
  ]);
  res.json(data.rows);
};

export const getTaskById = async (req, res) => {
  const { boardId, taskId } = req.params;
  const data = await pool.query(
    "SELECT * FROM tasks WHERE boardid=$1 AND id=$2",
    [boardId, taskId]
  );
  res.json(data.rows[0]);
};

export const createTask = async (req, res) => {
  const { boardId } = req.params;
  const { title, order, description, userId, columnId } = req.body;
  const data = await pool.query(
    "INSERT INTO tasks (title, order_num, description, userid, boardid, columnid) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [title, order, description, userId, boardId, columnId]
  );
  res.status(201).json(data.rows[0]);
};

export const updateTask = async (req, res) => {
  const { boardId, taskId } = req.params;
  const { title, order, description } = req.body;
  const data = await pool.query(
    "UPDATE tasks SET title=$1, order_num=$2, description=$3 WHERE boardid=$4 AND id=$5 RETURNING *",
    [title, order, description, boardId, taskId]
  );
  res.json(data.rows[0]);
};

export const deleteTask = async (req, res) => {
  const { boardId, taskId } = req.params;
  await pool.query("DELETE FROM tasks WHERE boardid=$1 AND id=$2", [
    boardId,
    taskId,
  ]);
  res.json({ message: "Task deleted" });
};
