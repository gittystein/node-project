import { token } from "morgan";
import { Order } from "../models/Order.js";
import mongoose from "mongoose";


export const getAllOrders = async (req, res) => {
    try {
        let allOrders = await Order.find({});
        res.status(200).json(allOrders);
    } catch (err) {
        res.status(500).send("samssing is not good");
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
        res.status(400).send("cannot made an order now" + err);
    }

}


export const deleteOrder = async (req, res) => {
    let { ordId } = req.params;

    if (!mongoose.isValidObjectId(ordId))
        return res.status(400).send("ther is not do order with this id");

    try {
        let deletedOrder = await Order.findById(ordId);
        if (!deleteOrder)
            return res.status(404).send("undifind this order")
        if (deletedOrder.orderOutToWay == true)
            return res.status(400).send("the order out to ship");
        if (req.tryUser._id == orderToDelete.userOrderId || req.tryUser.role == "MANAGER")
            deletedOrder = await Order.findByIdAndDeleted(ordId);
        else
            return res.status(404).send("cannot delete order");

        return res.json(deletedOrder);
    }

    catch (err) {
        res.status(500).send("samssing is wrong");
    }
}


export const getAllOrdersByUser = async (req, res) => {
    try {
        let { userOrder } = req.tryUser;
        let allOrders = await Order.find({ userOrderId: userOrder });
        res.json(allOrders);
    }
    catch (err) {
        res.status(500).send("samsing is not good");
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
        return res.status(400).send("no found an order with this id");
    try {
        let orderToUpdate = await Order.findById(ordId);
        if (!orderToUpdate)
            return res.status(404).send("not found this order");
        let updatedOrder = await Order.findOneAndUpdate({ _id: id }, { orderOutToWay: true })
        res.status(200).json(updatedOrder);
    }
    catch (err) {
        res.status(500).send("samsing is wrong");
    }
}