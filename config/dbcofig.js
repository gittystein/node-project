import mongoose from "mongoose";

export const connectToDB = () => {
    const mongoURI = "mongodb://0.0.0.0:27017/myproject";
    process.env.DB_CONECTION || "mongodb+srv://tsirisn:tsirisn1234@lesson13.wkbgvey.mongodb.net/?retryWrites=true&w=majority";
    mongoose.connect(mongoURI)
    .then((suc) => {console.log("mongoDB connect sucessfuly", suc.connection.host)})
    .catch((err) => {
        console.log("cannot connect mongoDB")
        console.log(err)
        process.exit(1) 
})
}