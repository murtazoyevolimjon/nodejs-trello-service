import express from "express";
import ErrorHandler from "./middleware/errorHandler.js";
import MainRouter from "./routes/main.routes.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use("/", MainRouter);



app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `${req.originalUrl} not found on the server`,
  });
});


app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server  ${PORT}-portda ishlamoqda`);
});