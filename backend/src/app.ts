import express from "express";
import cors from "cors"

import panesRouter from "./routes/panes";
import pedidosRouter from "./routes/pedidos";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Ruta raíz
app.get("/", (req, res) => {
  res.send("Bienvenido a Albor panes 🚀");
});

//Monto las rutas
app.use("/panes", panesRouter);
app.use("/pedidos", pedidosRouter);
export default app;
