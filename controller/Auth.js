import User from "../models/User.js"
import ExpressError from "../utils/ExpressError.js"
import { generateToken } from "../utils/jwtHelpers.js"

// logs user in
// accepts email and password
export const login = async (req, res) => {
    const { email, password } = req.body

    // validates the user credentials
    const user = await User.findAndValidate(email, password)
    if (!user) throw new ExpressError("Incorrect email or password", 401)
    
    // sign user in
    const token = generateToken(user)

    res.status(200).json({
        message: "Signed in successfully",
        data: {
            token
        }
    })
}

// creates a new user
// accepts email password and username
export const signup = async (req, res) => {
    const {email, password, username} = req.body

    // create new account
    const newUser = new User({ email, password, username })
    await newUser.save()

    // sign user in
    const token = generateToken(newUser)

    res.status(201).json({
        message: "New user created successfully",
        data: {
            token
        }
    })
}

export default {
    login,
    signup
}