import { Router } from "express";
import usersRouter from "./users.routes.js"; 
import boardsRouter from "./boards.routes.js";
import tasksRouter from "./tasks.routes.js";
import setupRouter from "./setup.routes.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/boards", boardsRouter);
router.use("/boards/:boardId/tasks", tasksRouter);
router.use("/", setupRouter);

export default router;
