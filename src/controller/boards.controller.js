import { pool } from "../config/db.js";

export const getBoards = async (_, res) => {
  const data = await pool.query("SELECT * FROM boards");
  res.json(data.rows);
};

export const getBoardById = async (req, res) => {
  const { boardId } = req.params;
  const data = await pool.query("SELECT * FROM boards WHERE id=$1", [boardId]);
  res.json(data.rows[0]);
};

export const createBoard = async (req, res) => {
  const { title, columns } = req.body;
  const data = await pool.query(
    "INSERT INTO boards (title, columns) VALUES ($1, $2) RETURNING *",
    [title, columns]
  );
  res.status(201).json(data.rows[0]);
};

export const updateBoard = async (req, res) => {
  const { boardId } = req.params;
  const { title, columns } = req.body;
  const data = await pool.query(
    "UPDATE boards SET title=$1, columns=$2 WHERE id=$3 RETURNING *",
    [title, columns, boardId]
  );
  res.json(data.rows[0]);
};

export const deleteBoard = async (req, res) => {
  const { boardId } = req.params;
  await pool.query("DELETE FROM tasks WHERE boardid=$1", [boardId]);
  await pool.query("DELETE FROM boards WHERE id=$1", [boardId]);
  res.json({ msg: "Board and related tasks deleted" });
};
