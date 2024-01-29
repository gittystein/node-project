import express from "express";
import * as productController from "../controllers/Products.js";
import { authDirector } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", productController.getAllProducts); 
router.get("/:id", productController.getProductById); 
router.post("/", authDirector, productController.addProduct);
router.put("/", authDirector, productController.updateProduct);
router.delete("/:id", authDirector, productController.deleteProductById);

export default router;

