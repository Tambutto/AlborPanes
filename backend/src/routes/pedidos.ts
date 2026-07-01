import { Router } from "express";
import pedidosController from "../controllers/pedidos.controller";
import validarPedido from "../middlewares/validarPedido";

const router = Router();

// Obtener todos los pedidos
router.get("/", pedidosController.getPedidos);

//Obtener pedido por ID
router.get("/:id", pedidosController.getPedidoById);

// Crear un pedido con validación
router.post("/", validarPedido, pedidosController.createPedido);

// Actualizar un pedido existente
router.put("/:id", pedidosController.updatePedido);

// Eliminar un pedido existente
router.delete("/:id", pedidosController.deletePedido);

export default router;
