import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getOneTask,
  updateTask,
  deleteTask
} from "../controllers/tasks.controller.js";

const router = Router();

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/:id", getOneTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
