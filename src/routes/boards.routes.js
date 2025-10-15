import { Router } from "express";
import {
  createBoard,
  getAllBoards,
  getOneBoard,
  updateBoard,
  deleteBoard
} from "../controllers/boards.controller.js";

const router = Router();

router.post("/", createBoard);
router.get("/", getAllBoards);
router.get("/:id", getOneBoard);
router.put("/:id", updateBoard);
router.delete("/:id", deleteBoard);

export default router;
