import express from "express"
import { boardsController } from "../controller/boards.controller.js"
import { boardsValidation } from "../validation/boards.validation.js"
import { validation } from "../middleware/validation.js"


const boardsRouter = express.Router()

boardsRouter.get("/", boardsController.getAll)
boardsRouter.get("/:id", boardsController.getOne)
boardsRouter.post("/", validation(boardsValidation), boardsController.createOne)
boardsRouter.put("/:id", validation(boardsValidation), boardsController.updateOne)
boardsRouter.delete("/:id", boardsController.deleteOne)


export default boardsRouter