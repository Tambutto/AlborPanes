import { Request, Response } from "express";
import Pedido from "../models/pedidos";
import { IPedidos } from "../models/pedidos";

interface PedidosController {
  getPedidos: (req: Request, res: Response) => Promise<void>;
  createPedido: (req: Request, res: Response) => Promise<void>;
  getPedidoById: (req: Request, res: Response) => Promise<void>;
  updatePedido: (req: Request, res: Response) => Promise<void>;
}


const pedidosController = {
    
    // Crear un pedido
  createPedido: async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevoPedido = new Pedido({
      usuario: req.body.usuarioId,   // ID del usuario
      panes: req.body.panesIds,      // array de IDs de panes
      total: req.body.total
    });
    await nuevoPedido.save();
    res.status(201).json(nuevoPedido);
  } catch (error: any) {
    res.status(500).json({ error: "Error al crear el pedido" });
  }
},

    
    // Obtener todos los pedidos
    getPedidos: async (req: Request, res: Response): Promise<void> => {
  try {

    const usuario = (req as any).usuario; // viene del payload del JWT

    let pedidos;
    if (usuario.rol == 'admin') {
      // Admin puede ver todos los pedidos
      pedidos = await Pedido.find()
      .populate("usuario", "nombre email") // Solo traer nombre y email del usuario
      .populate("panes", "nombre precio stock"); // Solo traer nombre, precio y stock del pan
    } else {
      // Usuario normal soloo ve sus pedidos
      pedidos = await Pedido.find({ usuario: usuario.id })
      .populate("usuario", "nombre email") // Solo traer nombre y email del usuario
      .populate("panes", "nombre precio stock"); // Solo traer nombre, precio y stock del pan
    }
   
      res.json(pedidos);
  } catch (error: any) {
    res.status(500).json({ error: "Error al obtener los pedidos" });
  }
},


    // Obtener un pedido por ID
    getPedidoById: async (req: Request, res: Response): Promise<void> => {
  try {
    const pedido = await Pedido.findById(req.params.id)
      .populate("usuario", "nombre email") // solo nombre y email)
      .populate("panes", "nombre precio stock"); // solo estos campos);
    if (!pedido) {
      res.status(404).json({ error: "Pedido no encontrado" });
      return;
    }
    res.json(pedido);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el pedido" });
  }
},


    // Actualizar un pedido existente
    updatePedido: async (req: Request, res: Response): Promise<void> => {
  try {

    const usuario = (req as any).usuario; // viene del payload del JWT
    const pedido = await Pedido.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("usuario").populate("panes");
    if (!pedido) {
      res.status(404).json({ error: "Pedido no encontrado" });
      return;
    }
    
    if (usuario.rol !== 'admin' && pedido.usuario.toString() !== usuario.id){
      res.status(403).json({ error: 'No tienes permiso para actualizar este pedido' });
      return;
    };

    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    .populate("usuario", "nombre email")
    .populate("panes", "nombre precio stock");


    res.json(pedido);
  } catch (error: any) {
    res.status(500).json({ error: "Error al actualizar el pedido" });
  }
},


    // Eliminar un pedido
deletePedido: async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario = (req as any).usuario; // viene del token
    const pedido = await Pedido.findById(req.params.id);

    if (!pedido) {
      res.status(404).json({ error: "Pedido no encontrado" });
      return;
    }

    // Validar permisos
    if (usuario.rol !== "admin" && pedido.usuario.toString() !== usuario.id) {
      res.status(403).json({ error: "No tienes permiso para eliminar este pedido" });
      return;
    }

    await Pedido.findByIdAndDelete(req.params.id);
    res.json({ message: "Pedido eliminado correctamente" });
  } catch (error: any) {
    res.status(500).json({ error: "Error al eliminar el pedido" });
  }
},

}


export default pedidosController;