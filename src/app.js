import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/users.routes.js";
import boardsRoutes from "./routes/boards.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(usersRoutes);
app.use(boardsRoutes);
app.use(tasksRoutes);

export default app;
