import Joi from "joi"


export const tasksValidation = Joi.object({
  title: Joi.string().min(4).required().messages({
    "string.required": "title shart",
    "string.base": "title matn bulishi kerak",
    "string.empty": "title bush bulish mumkin emas",
    "string.min": "title kamida 4 ta bulishi kerak"
  }),
  descriptionn: Joi.string().allow("").messages({
    "string.base": "descriptionn matn bulishi kerak"
  }),
  orderr: Joi.number().required().messages({
    "any.required": "orderr shart",
    "number.base": "orderr son bulishi kerak"
  }),
  userId: Joi.string().required().messages({
    "any.required": "userId shart",
    "string.base": "userId string bulishi kerak"
  }),
  boardId: Joi.string().required().messages({
    "any.required": "boardId shart",
    "string.base": "boardId string bulishi kerak"
  }),
  columnId: Joi.string().required().messages({
    "any.required": "columnId shart",
    "string.base": "columnId string bulishi kerak"
  })
})



export const updateValidation = Joi.object({
  title: Joi.string().min(4).messages({
    "string.base": "title matn bulishi kerak",
    "string.empty": "title bush bulish mumkin emas",
    "string.min": "title kamida 4 ta bulishi kerak"
  }),
  descriptionn: Joi.string().allow("").messages({
    "string.base": "descriptionn matn bulishi kerak"
  }),
  orderr: Joi.number().integer().messages({
    "number.base": "orderr son bulishi kerak",
    "number.integer": "orderr butun son bulishi kerak"
  }),
  userId: Joi.string().messages({
    "string.guid": "userId UUID bulishi kerak",
    "string.base": "userId string bulishi kerak"
  }),
  boardId: Joi.string().messages({
    "string.guid": "boardId UUID bulishi kerak",
    "string.base": "boardId string bulishi kerak"
  }),
  columnId: Joi.string().messages({
    "string.guid": "columnId UUID bulishi kerak",
    "string.base": "columnId string bulishi kerak"
  })
})