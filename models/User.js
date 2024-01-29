import mongoose from "mongoose";
import Joi from "joi";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    role: { type: String, default: "MANAGER" }
})

export const User = mongoose.model("user", userSchema);


export const userValidator = (_userToValidate) => {
    let userJoi = Joi.object({
        name: Joi.string().min(3).max(12).required(),
        email: Joi.email(),
        password: Joi.string().min(6).max(10).required()
    });

    return userJoi.validate(_userToValidate);
}