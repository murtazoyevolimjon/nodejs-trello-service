import { Router } from "express";
import {
  createColumn,
  getAllColumns,
  getOneColumn,  
  updateColumn,
  deleteColumn,
  searchAndFilter
} from "../controllers/columns.controller.js";

const router = Router();

router.post("/", createColumn);
router.get("/", getAllColumns);
router.get("/:id", getOneColumn); 
router.put("/:id", updateColumn);
router.delete("/:id", deleteColumn);
router.get("/search/filter", searchAndFilter);

export default router;
