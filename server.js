import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/router/index.routes.js"; // ✅ src ichidagi router
import { errorHandler } from "./src/middleware/errorHandler.js"; // ✅ src/middleware
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
