import express from "express";
import {
  getBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../controller/boards.controller.js";

const router = express.Router();

router.get("/boards", getBoards);
router.get("/boards/:boardId", getBoardById);
router.post("/boards", createBoard);
router.put("/boards/:boardId", updateBoard);
router.delete("/boards/:boardId", deleteBoard);

export default router;
