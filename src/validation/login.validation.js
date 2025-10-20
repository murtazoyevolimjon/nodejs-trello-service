import Joi from "joi"

export const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "email string bulishi kerak",
    "string.required": "email shart",
    "string.empty": "email bush bulish mumkin emas",
    "string.email": "email notugri kiritilgan",
  }),
  password: Joi.string().min(6).required().messages({
    "string.required": "password shart",
    "string.base": "password string bulishi kerak",
    "string.empty": "parol bush bulish mumkin emas",
    "string.min": "parol kamida 6 ta bulishi kerak"
  })
})