import mongoose from "mongoose";
import Joi from "joi";

const productsSchema = mongoose.Schema({
    name: { type: String, requirerd: true },
    description: { type: String, requirerd: true },
    category: { type: String, requirerd: true },
    dateInsertProducts: { type: Date, default: Date.now() },
    picture: { type: String },
    price: { type: Number, default: 1000 },
})

export const Products = mongoose.model("products", productsSchema);



export const productValidator = (_productTOValidate) => {

    let productJoi = Joi.object({
        name: Joi.string().min(3).max(30),
        description: Joi.string().min(20).max(300),
        category: Joi.string().min(3).max(20)
    })

    return productJoi.validate(_productTOValidate);
}