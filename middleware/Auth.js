import authSchema from "../schemas/Auth.js";
import ExpressError from "../utils/ExpressError.js";
import { verifyToken } from "../utils/jwtHelpers.js"

// validates that the inputed user data is valid and secure
export const isUserValid = (req, res, next) => {
    const { error } = authSchema.user.validate(req.body)
    if (error) return next(new ExpressError(error.message, 400))
    
    return next()
}

// checks if the user is authenticated 
// and verifies it
export const isUserAuthenticated = async (req, res, next) => {
    const { authorization: token }  = req.headers
    try {
        const currentUser = verifyToken(token);
        req.body.currentUser = currentUser;
    } catch (err) {
        return next(new ExpressError("You are not authenticated", 401));
    }
    next()
}


export default {
    isUserValid,
    isUserAuthenticated
}