import express from "express";
import * as ordersController from "../controllers/Order.js";
import { authDirector, authUser } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authDirector, ordersController.getAllOrders);//עובד!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.post("/", authUser, ordersController.addOrder);
router.delete("/", authDirector, authUser, ordersController.deleteOrder);
router.get("/:id", authUser, ordersController.getAllOrdersByUser);
router.put("/:id", authDirector, ordersController.updateOrderOut);

export default router;