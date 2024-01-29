import { token } from "morgan";
import { Order } from "../models/Order.js";
import mongoose from "mongoose";


export const getAllOrders = async (req, res) => {
    try {
        let allOrders = await Order.find({});
        res.status(200).json(allOrders);
    } catch (err) {
        res.status(500).send("התרחשה תקלה");
    }
}


export const addOrder = async (req, res) => {

    let { ordDateToDeliver, ordAddress, products } = req.body;
    let validate = orderValidator({ ordDateToDeliver, ordAddress, products });

    if (validate.error)
        return res.status(404).send(validate.error);

    try {
        let newOrder = await Order.create({
            ordDateToDeliver,
            ordAddress,
            products,
            userOrderId: req.body.products
        })
        return res.send(201).json(newOrder);
    }

    catch (err) {
        res.status(400).send("אין אפשרות לצע הזמנות" + err);
    }

}


export const deleteOrder = async (req, res) => {
    let { ordId } = req.params;

    if (!mongoose.isValidObjectId(ordId))
        return res.status(400).send("לא קיים מספר הזמנה כזה");

    try {
        let deletedOrder = await Order.findById(ordId);
        if (!deleteOrder)
            return res.status(404).send("לא מוצא המנה כזו")
        if (deletedOrder.orderOutToWay == true)
            return res.status(400).send("המוצר יצא לשליחה");
        if (req.tryUser._id == orderToDelete.userOrderId || req.tryUser.role == "MANAGER")
            deletedOrder = await Order.findByIdAndDeleted(ordId);
        else
            return res.status(404).send("לא הצלחנו למחוק הזמנה");

        return res.json(deletedOrder);
    }

    catch (err) {
        res.status(500).send("התרחשה תקלה");
    }
}


export const getAllOrdersByUser = async (req, res) => {
    try {
        let { userOrder } = req.tryUser;
        let allOrders = await Order.find({ userOrderId: userOrder });
        res.json(allOrders);
    }
    catch (err) {
        res.status(500).send("התרחשה תקלה");
    }

}

export const updateOrder = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("invalid paramter id");
    try {
        let order = await Order.findById(id);
        if (!order)
            return res.status(404).send("no order with such id");

        let updatedOrder = await Order.findOneAndUpdate({ _id: id }, { isOrderSent: true }, { new: true })
        res.status(200).json(updatedOrder);
    }
    catch (err) {
        res.status(500).send('failed to update order');
        console.log(err);
    }

}

export const updateOrderOut = async (req, res) => {
    let { ordId } = req.params;

    if (!mongoose.isValidObjectId(ordId))
        return res.status(400).send("לא קיים מספר הזמנה כזה");
    try {
        let orderToUpdate = await Order.findById(ordId);
        if (!orderToUpdate)
            return res.status(404).send("אין הזמנה עם קוד כזה");
        orderToUpdate.orderOutToWay = true;
    }
    catch (err) {
        res.status(500).send("התרחשה תקלה");
    }
}