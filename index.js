import express from "express";
import { config } from "dotenv";
import { connectToDB } from "./config/dbcofig.js";
import cors from "cors";
import { errHandling } from "./middlewares/errHandling.js";
import orderRout from "./rout/Order.js";
import productsRout from "./rout/Products.js";
import userRout from "./rout/User.js";

//{!defoult}

config(); 

connectToDB(); 

//const express = require("express");

const app = express();

app.use(express.json()); 

app.use(cors()); 

app.use(errHandling); 

app.use("/api/order", orderRout);         
app.use("/api/product", productsRout);    
app.use("/api/user", userRout);           

let port = process.env.PORT || 3000; 

app.listen(port, function () {
    console.log(`listening on port ${port}`);
});

