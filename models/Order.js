import mongoose from "mongoose";
import Joi from "joi";

const minimalProduct = mongoose.Schema({
    name: { type: String, requirerd: true },
    password: { type: String, requirerd: true },
    email: { type: String, requirerd: true },
    qty: { type: Number, default: 1 }
})

const orderSchema = mongoose.Schema({
    ordDate: { type: Date, default: Date.now() },
    ordDateToDeliver: { type: Date, requirerd: false },
    userOrderId: { type: String, requirerd: true },
    ordAddress: { type: String, requirerd: true },
    products: [{ type: minimalProduct, qty: Number }],
    orderOutToWay: { type: Boolean, default: false }
})

export const Order = mongoose.model("order", orderSchema);


export const orderValidator = (_ordToValidator) => {
    let OrderJoi = Joi.object({
        ordAddress: Joi.string().min(10).max(30),
        userOrderId: Joi.string()
    })
    return OrderJoi.validate(_ordToValidator)
}

export const minimalProductValidator = (_minimalProdactToValidator) => {
    let minimalProdactJoi = Joi.object({
        name: Joi.string().min(3).max(12).required(),
        email: Joi.email(),
        password: Joi.string().min(6).max(10).required(),
        qty: string().min(1).max(20)
    });

    return minimalProdactJoi.validate(_minimalProdactToValidator);
}
// 