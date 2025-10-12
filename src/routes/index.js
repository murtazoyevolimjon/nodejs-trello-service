import express from "express";

import usersRoutes from "./users.routes.js";
import boardsRoutes from "./boards.routes.js";
import tasksRoutes from "./tasks.routes.js";
import setupRoutes from "./setup.routes.js";

const router = express.Router();

router.use(usersRoutes);
router.use(boardsRoutes);
router.use(tasksRoutes);
router.use(setupRoutes);

export default router;
