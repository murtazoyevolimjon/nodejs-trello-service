import express from "express"
import {register} from "../controller/register.controller.js"
import {registerValidation} from "../validation/register.validation.js"
import {validation} from "../middleware/validation.js"

const registerRouter = express.Router()
registerRouter.post("/", validation(registerValidation),register)

export default registerRouter