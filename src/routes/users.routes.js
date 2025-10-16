import { Router } from "express";
import { 
  deletetable, deleteUser, getAll, getOne, login, register, setup, update  
} from "../controllers/users.controller.js";
import { 
  RegisterUser, 
  UpdateUservalidation, 
  validationfactory 
} from "../middleware/validation.js";

const UserRoutes = Router();

UserRoutes.post("/setup", setup);
UserRoutes.post("/deletetable", deletetable);


UserRoutes.post("/login", login);
UserRoutes.post("/register", validationfactory(RegisterUser), register);


UserRoutes.get("/", getAll);
UserRoutes.get("/:id", getOne);
UserRoutes.put("/:id", validationfactory(UpdateUservalidation), update);
UserRoutes.delete("/:id", deleteUser);

export default UserRoutes;
