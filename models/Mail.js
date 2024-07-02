import { Schema, model } from "mongoose";

const mailSchema = new Schema({
    username: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: [true, "Email already exists in the mailing list"]
    },
    role: {
        type: String,
        lowercase: true,
        trim: true,
        enum: ["user", "tester"],
        default: "user"
    }
})

export default model("Mail", mailSchema)