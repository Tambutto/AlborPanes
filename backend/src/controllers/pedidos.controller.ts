import { Request, Response } from "express";
import Pedido from "../models/pedidos";

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
      const nuevoPedido = new Pedido(req.body);
      await nuevoPedido.save();
      res.status(201).json(nuevoPedido);
    } catch (error: any) {
      
      res.status(500).json({ error: "Error al crear el pedido" });
    }
  },
    
    // Obtener todos los pedidos
    getPedidos: async (req: Request, res: Response): Promise<void> => {
        try {
            const pedidos = await Pedido.find();
            res.json(pedidos);
        } catch (error: any) {
            res.status(500).json({ error: 'Error al obtener los pedidos' });
        }
    },

    // Obtener un pedido por ID
    getPedidoById: async (req: Request, res: Response): Promise<void> => {
        try {
            const pedido = await Pedido.findById(req.params.id);
            if (!pedido) {
                res.status(404).json({ error: 'Pedido no encontrado' });
                return;
            }
            res.json(pedido);
        } catch (error: any) {
            res.status(500).json({ error: 'Error al obtener el pedido' });
        }
    },

    // Actualizar un pedido existente
    updatePedido: async (req: Request, res: Response): Promise<void> => {
        try {
            const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!pedido) {
                res.status(404).json({ error: 'Pedido no encontrado' });
                return;
            }
            res.json(pedido);
        } catch (error: any) {
            res.status(500).json({ error: 'Error al actualizar el pedido' });
        }
      },

    // Eliminar un pedido
    deletePedido: async (req: Request, res: Response): Promise<void> => {
        try {
            const pedido = await Pedido.findByIdAndDelete(req.params.id);
            if (!pedido) {
                res.status(404).json({ error: 'Pedido no encontrado' });
                return;
            }
            res.json({ message: 'Pedido eliminado correctamente' });
        } catch (error: any) {
            res.status(500).json({ error: 'Error al eliminar el pedido' });
        }
      }  

}

export default pedidosController;