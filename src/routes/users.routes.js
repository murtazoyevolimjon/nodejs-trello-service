import express from "express";

import {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/users.controller.js";
import {
  validateUserRegister,
  validateUserLogin,
} from "../middlewares/validation.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", validateUserLogin, login);
userRouter.get("/", getUsers);
userRouter.get("/:userId", getUserById);
userRouter.put("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);

export default userRouter;
