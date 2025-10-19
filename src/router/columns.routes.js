import express from "express"
import { columnsController } from "../controller/columns.controller.js"
import { columnValidation } from "../validation/columns.validation.js"
import { validation } from "../middleware/validation.js"
import {columnUpdateValidation} from "../validation/columns.validation.js"


const columnsRouter = express.Router()

columnsRouter.get("/", columnsController.getAll)
columnsRouter.get("/:id", columnsController.getOne)
columnsRouter.post("/", validation(columnValidation), columnsController.createOne)
columnsRouter.put("/:id", validation(columnUpdateValidation), columnsController.updateOne)
columnsRouter.delete("/:id", columnsController.deleteOne)


export default columnsRouter