import express from "express";
import { setUpTables } from "../controller/setup.controller.js";

const router = express.Router();
router.post("/setUp", setUpTables);

export default router;
