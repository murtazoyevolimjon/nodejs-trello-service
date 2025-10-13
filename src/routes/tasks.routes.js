import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controller/tasks.controller.js";

const router = express.Router({ mergeParams: true });


router.get("/", getTasks);
router.get("/:taskId", getTaskById);
router.post("/", createTask);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

export default router;
