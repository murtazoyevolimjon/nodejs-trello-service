import express from "express"
import {login} from "../controller/login.controller.js"
import {loginValidation} from "../validation/login.validation.js"
import {validation } from "../middleware/validation.js"

const loginRouter = express.Router()
loginRouter.post("/", validation(loginValidation),login)

export default loginRouter