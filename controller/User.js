import User from "../models/User.js"
import ExpressError from "../utils/ExpressError.js"

export const get = async (req, res) => {
    const { id } = req.body.currentUser
    try {
        const user = await User.findById(id)
        if (!user) throw "User want found"
        res.status(200).json({
            message: "User was found",
            data: user
        })
    } catch (err) {
        throw new ExpressError("User wasn't found", 404)
    }
}

export const remove = async (req, res) => {
    const { id } = req.body.currentUser
    const user = await User.findByIdAndDelete(id)

    if (user === null) throw new ExpressError("User wasn't found", 404)

    res.json({
        message: "Successfully deleted user",
        data: user
    })
}

export default {
    get,
    remove
}