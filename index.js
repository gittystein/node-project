import express from "express";
import { config } from "dotenv";
import { connectToDB } from "./config/dbcofig.js";
import cors from "cors";
import { errHandling } from "./middlewares/errHandling.js";
import orderRout from "./rout/Order.js";
import productsRout from "./rout/Products.js";
import userRout from "./rout/User.js";

//{!defoult}

config(); // .env הדף מכיר את  

connectToDB(); // DB חיבור ל 

//const express = require("express");

const app = express();//יצירה

app.use(express.json()); // מפעיל פונקציה

app.use(cors()); // middleware בניית ה 

app.use(errHandling); // middleware הפעלת ה 

app.use("/api/order", orderRout);         //
app.use("/api/product", productsRout);   // routs הפעלת ה  
app.use("/api/user", userRout);           //

let port = process.env.PORT || 3000; // מיקום לריצה

app.listen(port, function () {
    console.log(`listening on port ${port}`);
});

