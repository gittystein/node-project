import express from "express";
import * as userController from "../controllers/User.js";
import { authDirector } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", userController.addUser);
router.post("/login", userController.enterUser);
router.get("/", authDirector, userController.getAllUsers);

export default router;
