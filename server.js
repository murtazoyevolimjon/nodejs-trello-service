import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/router/index.routes.js"; 
import { errorHandler } from "./src/middleware/errorHandler.js"; 
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlayapti`);
});


app.use(errorHandler);
