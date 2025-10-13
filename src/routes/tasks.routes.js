import { Router } from "express";
import { TaskController } from "../controllers/tasks.controller.js";
import { taskvalidation, taskValidationUpdate, validationfactory } from "../middleware/validation.js";

const TaskRoutes = Router({ mergeParams: true });

TaskRoutes.get("/", TaskController.getAlltasks);
TaskRoutes.get("/:id", TaskController.getOneTask);
TaskRoutes.post("/", validationfactory(taskvalidation), TaskController.post);
TaskRoutes.put("/:id", validationfactory(taskValidationUpdate), TaskController.update);
TaskRoutes.delete("/:id", TaskController.delete);

export default TaskRoutes;
