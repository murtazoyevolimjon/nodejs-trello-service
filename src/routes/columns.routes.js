import { Router } from "express";
import {
  createColumn,
  getAllColumns,
  getColumn,
  updateColumn,
  deleteColumn
} from "../controllers/columns.controller.js";

const router = Router();

router.post("/", createColumn);      
router.get("/", getAllColumns);      
router.get("/:id", getColumn);       
router.put("/:id", updateColumn);   
router.delete("/:id", deleteColumn); 

export default router;
