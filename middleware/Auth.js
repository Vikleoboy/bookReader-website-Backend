import authSchema from "../schemas/Auth.js";
import ExpressError from "../utils/ExpressError.js";

// validates that the inputed user data is valid and secure
export const isUserValid = (req, res, next) => {
    const { error } = authSchema.user.validate(req.body)
    if (error) return next(new ExpressError(error.message, 400))
    
    return next()
}

export default {
    isUserValid
}