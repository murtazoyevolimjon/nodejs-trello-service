import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (_, res) =>
  res.json({ message: "Trello-like REST API is running 🚀" })
);

app.use("/api", routes);

app.use((req, res) => res.status(404).json({ message: "Not Found" }));

export default app;
