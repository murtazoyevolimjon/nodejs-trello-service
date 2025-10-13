import express from "express";
import {
  getBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../controller/boards.controller.js";

const router = express.Router();

router.get("/", getBoards);
router.get("/:boardId", getBoardById);
router.post("/", createBoard);
router.put("/:boardId", updateBoard);
router.delete("/:boardId", deleteBoard);

export default router;
