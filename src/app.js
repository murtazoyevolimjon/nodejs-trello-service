import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (_, res) => res.json({ message: "Trello-like REST API ishga tushdi" }));


app.use("/api", routes);


app.use((req, res) => res.status(404).json({ message: "Sahifa topilmadi" }));


app.use(errorHandler);

export default app;
