import { Router } from "express";
import {
  createBoard,
  getAllBoards,
  getOneBoard,
  updateBoard,
  deleteBoard,
  searchAndFilter
} from "../controllers/boards.controller.js";

const router = Router();

router.post("/", createBoard);
router.get("/", getAllBoards);
router.get("/:id", getOneBoard);
router.put("/:id", updateBoard);
router.delete("/:id", deleteBoard);
router.get("/search/filter", searchAndFilter);

export default router;
