import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: [true, "Email adress is already used"]
    },
    password: {
        type: String
    }
})

// this pre function will automaticly hash password when changed
// it fires before the data is saved
userSchema.pre("save", async function(next) {
    // verifies that the password was updated
    if (!this.isModified("password")) return next()

    // hash password with 12 salts
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

// findAndValidate will verify that the email and password are correct
// if so it returns user data
userSchema.statics.findAndValidate = async function (email, password) {
    try {
        // find user with given email
        // if not found an error will be thrown
        const user = await this.findOne({ email: email.toLowerCase().trim() });

        // verifies that the password is correct
        // return user data
        if (await bcrypt.compare(password, user.password)) return user;
        return false

    } catch (err) {
        console.log(err);
        return false;
    }
}

export default model("User", userSchema)