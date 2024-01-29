import { Products, productValidator } from "../models/Products.js";
import mongoose from "mongoose";


export const getAllProducts = async (req, res) => {
        let { searchProduct, page, perPage = 10 } = req.query;
        try {
                let allProducts = {};

                if (searchProduct) {
                        allProducts.name = new RegExp(searchProduct, "i");

                }

                allProducts = await Products.find(allProducts)
                        .skip((page - 1) * perPage)
                        .limit(perPage)

                res.json(allProducts)
        }
        catch (err) {
                res.status(400).send("sorry cant get all the products" + err.message)
        }
}



export const getProductById = async (req, res) => {
        try {
                if (!mongoose.isValidObjectId(req.params.id)) 
                        return res.status(400).send("the id is not good");

                let product = await Products.findById(req.params.id)

                if (!product)
                        return res.status(404).send("we don have a product with this id");
                res.json(product);
        }
        catch (err) {
                res.status(400).send("cant get this product" + err.message)
        }
}



export const addProduct = async (req, res) => {
        let { name, category, description, picture, price } = req.body; 

        let validate = productValidator(req.body);


        if (validate.error) 
                return res.status(404).json(validate.error.details[0])

        try {

                let sameProduct = await Products.find({ name });
                if (sameProduct.length > 0)
                        return res.status(409).send("we hava a product whis this name");

                let newProduct = await Products.create({
                        name,
                        description,
                        category: category || "kitchens",
                        dateInsertProducts,
                        picture,
                        price: price || null,
                })
                return res.status(201).json(newProduct);
        }
        catch (err) {
                res.status(400).send("i am sorry u cant add a new product" + err)
        }
}



export const deleteProductById = async (req, res) => {
        let { id } = req.params;

        if (!mongoose.isValidObjectId(id)) 
                return res.status(400).send("its not avilable")

        let deletedProduct = await Products.findByIdAndDelete(id);

        if (!deletedProduct)
                return res.status(404).send("u cant delete this product");

        return res.json(deletedProduct);
}



export const updateProduct = async (req, res) => {

        let { productId } = req.params;
        if (!mongoose.isValidObjectId(productId)) 
                return res.status(400).send("the product is not real");

        try {
                let productToUpdate = await Products.findById(productId);
                if (!productToUpdate)
                        return res.status(404).send("we dont found this product")
                productToUpdate.description = req.body.description || productToUpdate.description; 
                productToUpdate.dateInsertProducts = req.body.dateInsertProducts || productToUpdate.dateInsertProducts;
                productToUpdate.picture = req.body.picture || productToUpdate.picture;
                productToUpdate.price = req.body.price || productToUpdate.price;

                await productToUpdate.save();
                res.json(productToUpdate);
        }
        catch (err) {
                res.status(400).send("i am sorry u cant update this product" + err)
        }
}

