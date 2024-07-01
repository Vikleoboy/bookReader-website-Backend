import Joi from "joi";

export const email = Joi.object({
    username: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid("user", "dev"),
}).required()

export default {
    email
}