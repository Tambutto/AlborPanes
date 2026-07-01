import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./db";

// Cargar variables de entorno
dotenv.config();

// coneccion a mongoDB
connectDB();

try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`El servidor esta corriendo en el puerto http://localhost:${PORT}`);
    })
} catch (error) {
    console.error("Error al iniciar el servidor", error);
}

