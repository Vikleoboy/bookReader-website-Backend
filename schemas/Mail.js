import Joi from "joi";

export const email = Joi.object({
    username: Joi.string().min(2).required(),
    email: Joi.string().email().required()
}).required()

export default {
    email
}