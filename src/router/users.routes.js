import express from "express"
import { validation } from "../middleware/validation.js"
import { usersController } from "../controller/users.controller.js"
import { updateValidation, usersValidation } from "../validation/users.validation.js"


const usersRouter = express.Router()

usersRouter.get("/", usersController.getAll)
usersRouter.get("/:id", usersController.getOne)
usersRouter.post("/", validation(usersValidation),usersController.createOne)
usersRouter.put("/:id", validation(updateValidation), usersController.updateOne)
usersRouter.delete("/:id", usersController.deleteOne)


export default usersRouter