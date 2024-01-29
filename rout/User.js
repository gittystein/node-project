import express from "express";
import * as userController from "../controllers/User.js";
import { authDirector } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", userController.addUser);//עובד!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.post("/login", userController.enterUser);//עובד!!!!!!!!!!!!!!!!!!!!!!!!!
router.get("/", userController.getAllUsers);//עובד!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export default router;
