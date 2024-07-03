import Joi from "./Joi.js"

export const email = Joi.object({
    username: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid("user", "tester").required(),
}).required()

export default {
    email
}