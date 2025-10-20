import Joi from "joi"

export const boardsValidation = Joi.object({
  title: Joi.string().min(4).required().messages({
    "string.empty": "title bush bulish mimkin emas",
    "string.min": "title kamida 4 ta bulishi kerak",
    "string.required": "title shart"
  })
})