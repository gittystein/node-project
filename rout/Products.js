import express from "express";
import * as productController from "../controllers/Products.js";
import { authDirector } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", productController.getAllProducts); //עובד בלי חיפוש טקסט
router.get("/:id", productController.getProductById); //עובד!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.post("/", authDirector, productController.addProduct);//עובד בלי סוג תאריך ומספרי  
router.put("/", authDirector, productController.updateProduct);// עובד!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.delete("/:id", authDirector, productController.deleteProductById);//עובד!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export default router;

