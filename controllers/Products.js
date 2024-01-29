import { Products, productValidator } from "../models/Products.js";
import mongoose from "mongoose";


export const getAllProducts = async (req, res) => {
        let { searchProduct, page, perPage = 10} = req.query;
        try {
                let allProducts = {};
               // let searchProduct = {};

                if (searchProduct) {
                        allProducts.name = new RegExp(searchProduct, "i");

                } //המשתנה מכיל את המילה שחיפשו אם לא חיפשו המשתנה ריק

                allProducts = await Products.find(allProducts)
                        .skip((page - 1) * perPage)
                        .limit(perPage)
                        
                res.json(allProducts)
        }
        catch (err) {
                res.status(400).send("לא ניתן לקבל את כל המוצרים" + err.message)
        }
}



export const getProductById = async (req, res) => {
        try {
                if (!mongoose.isValidObjectId(req.params.id)) //  בודק אם קוד המוצר שהתקבל תקין 
                        return res.status(400).send("קוד לא תקין");

                let product = await Products.findById(req.params.id)//שליפת המוצר

                if (!product)
                        return res.status(404).send("לא קיים מוצר עם קוד כזה");
                res.json(product);
        }
        catch (err) {
                res.status(400).send("לא ניתן לקבל את המוצר" + err.message)
        }
}



export const addProduct = async (req, res) => {
        let { name, category, description, picture, price } = req.body; // שולף הנתונים למוצר החדש 

        let validate = productValidator(req.body);


        if (validate.error) //בודק האם הנתונים עומדים בתנאים הדרושים למוצר
                return res.status(404).json(validate.error.details[0])

        try {

                let sameProduct = await Products.find({ name });//מנעית 2 מוצרים בעלי שם זהה
                if (sameProduct.length > 0)
                        return res.status(409).send("כבר קיים מוצר בשם זה");

                //פרטי המוצר החדש עם ברירת מחדל
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
                res.status(400).send("מצטערים אי אפשר להוסיף מוצר" + err)
        }
}



export const deleteProductById = async (req, res) => {
        let { id } = req.params;

        if (!mongoose.isValidObjectId(id)) //אם המוצר לא קיים בכלל
                return res.status(400).send("לא קיים מוצר כזה")

        let deletedProduct = await Products.findByIdAndDelete(id);//מחיקת המוצר

        if (!deletedProduct)
                return res.status(404).send("לא הצלחנו למחוק מוצר זה");

        return res.json(deletedProduct);
}



export const updateProduct = async (req, res) => {

        let { productId } = req.params; // שליפת המוצר
        if (!mongoose.isValidObjectId(productId)) // בודק האם המוצר חוקי
                return res.status(400).send("המוצר לא חוקי");

        try {
                let productToUpdate = await Products.findById(productId);//חיפוש המוצר לעדכון
                if (!productToUpdate)
                        return res.status(404).send("לא נמצא מוצר עם קוד כזה")
                productToUpdate.description = req.body.description || productToUpdate.description; // עדכון הנתונים או השארה עם ברירת המחדל
                productToUpdate.dateInsertProducts = req.body.dateInsertProducts || productToUpdate.dateInsertProducts;
                productToUpdate.picture = req.body.picture || productToUpdate.picture;
                productToUpdate.price = req.body.price || productToUpdate.price;

                await productToUpdate.save();
                res.json(productToUpdate);
        }
        catch (err) {
                res.status(400).send("מצטערים אי אפשר לעדכן מוצר" + err)
        }
}

