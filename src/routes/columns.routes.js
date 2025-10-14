import { Router } from "express";
import { ColumnController } from "../controllers/columns.controller.js";
import { columnsvalidation, columnsvalidationupdate, validationfactory } from "../middleware/validation.js";

const columnRoutes = Router();

columnRoutes.get("/", ColumnController.getAllColumns);
columnRoutes.get("/:id", ColumnController.getOneColumn);
columnRoutes.post("/", validationfactory(columnsvalidation), ColumnController.post);
columnRoutes.put("/:id", validationfactory(columnsvalidationupdate), ColumnController.update);
columnRoutes.delete("/:id", ColumnController.delete);

export default columnRoutes;