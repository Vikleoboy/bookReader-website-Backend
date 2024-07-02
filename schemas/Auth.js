import Joi from "./Joi.js"

export const user = Joi.object({
    username: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

export default {
    user
}