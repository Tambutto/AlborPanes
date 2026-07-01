import mongoose from "mongoose";

export const connectDB = async () => {
    try { 
        const url = process.env.MONGO_URI || "mongodb://localhost:27017/alborpanes";
        await mongoose.connect(url);
        console.log("Conectado a MongoDB");
     } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
}