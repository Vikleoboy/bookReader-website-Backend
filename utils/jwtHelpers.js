import jwt from "jsonwebtoken"

const key = process.env.SECRET_KEY

// generates a new json web token
export const generateToken = (user) => {
    return jwt.sign({
        email: user.email,
        id: user._id
    }, key, {
        expiresIn: "1d"
    })
}

// verifies the validity of the token
export const verifyToken = (token) => {
    return jwt.verify(token, key)
}

export default {
    generateToken,
    verifyToken
}