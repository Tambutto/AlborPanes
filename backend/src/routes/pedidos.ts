import { Router } from "express";
import pedidosController from "../controllers/pedidos.controller";
import validarPedido from "../middlewares/validarPedido";
import { verificarToken } from "../middlewares/auth";
import { verificarRol } from "../middlewares/roles";

const router = Router();

// Obtener todos los pedidos
router.get("/", verificarToken, verificarRol(['admin']), pedidosController.getPedidos);

//Obtener pedido por ID
router.get("/:id", verificarToken, pedidosController.getPedidoById);

// Crear un pedido con validación
router.post("/", validarPedido, verificarToken, verificarRol(['admin', 'user']), pedidosController.createPedido);

// Actualizar un pedido existente
router.put("/:id", verificarToken, verificarRol(['admin', 'user']), pedidosController.updatePedido);

// Eliminar un pedido existente
router.delete("/:id", verificarToken, verificarRol(['admin']), pedidosController.deletePedido);

export default router;
