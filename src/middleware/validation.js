import Joi from "joi";

export const validationfactory = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const errors = error.details.map((err) => ({
            field: err.path.join(','),
            message: err.message
        }));
        return res.status(411).json({ errors });
    }
    next();
};

export const RegisterUser = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required()
});

export const UpdateUservalidation = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(3).max(10)
});

export const boardValidation = Joi.object({
    title: Joi.string().max(25).required(),
    user_id: Joi.string().max(36).required()
});

export const boardUpdatevalidation = Joi.object({
    title: Joi.string().max(25),
    user_id: Joi.string().max(36)
});

export const columnsvalidation = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    order_index: Joi.number().required(),
    board_id: Joi.string().required()
});

export const columnsvalidationupdate = Joi.object({
    title: Joi.string().min(2).max(50),
    order_index: Joi.number(),
    board_id: Joi.string()
});

export const taskvalidation = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    order_index: Joi.number().required(),
    description: Joi.string().min(10).max(50).required(),
    user_id: Joi.string().required(),
    board_id: Joi.string().required(),
    column_id: Joi.string().required()
});

export const taskValidationUpdate = Joi.object({
    title: Joi.string().min(2).max(50),
    order_index: Joi.number(),
    description: Joi.string().min(10).max(50),
    user_id: Joi.string(),
    board_id: Joi.string(),
    column_id: Joi.string()
});