import ExpressError from "../utils/ExpressError.js"
import mailSchemas from "../schemas/Mail.js"
import Mail from "../models/Mail.js"

export const isMailValid = (req, res, next) => {
    const { error } = mailSchemas.email.validate(req.body)
    if (error) {
        const msg = error.message
        return next(new ExpressError(msg, 400))
    }

    return next()
}

export const isMailExist = async (req, res, next) => {
    const { email } = req.params

    // find if email exists
    const mail = await Mail.exists({ email })

    if (!mail) {
        return next(new ExpressError(`Email with ${email} adress doesn't exist`, 404))
    }

    return next()
}

export default {
    isMailValid
}