import { Router } from "express";
import UserRoutes from "./users.routes.js";
import BoardRoutes from "./boards.routes.js";
import TaskRoutes from "./tasks.routes.js";
import ColumnRoutes from "./columns.routes.js";

const MainRouter = Router({ mergeParams: true });

MainRouter.use("/users", UserRoutes);
MainRouter.use("/boards", BoardRoutes);
MainRouter.use("/tasks", TaskRoutes);
MainRouter.use("/columns", ColumnRoutes);

export default MainRouter;