import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getOneTask,
  updateTask,
  deleteTask,
  searchAndFilter
} from "../controllers/tasks.controller.js";

const router = Router();

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/:id", getOneTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/search/filter", searchAndFilter); 

export default router;
