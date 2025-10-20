import express from "express"
import { tasksController } from "../controller/tasks.controller.js"
import { validation } from "../middleware/validation.js"
import { tasksValidation, updateValidation } from "../validation/tasks.validation.js"


const tasksRouter = express.Router()

tasksRouter.get("/", tasksController.getAll)
tasksRouter.get("/:id", tasksController.getOne)
tasksRouter.post("/", validation(tasksValidation), tasksController.createOne)
tasksRouter.put("/:id", validation(updateValidation), tasksController.updateOne)
tasksRouter.delete("/:id", tasksController.deleteOne)


export default tasksRouter