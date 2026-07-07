import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const validarPedido = (req: Request, res: Response, next: NextFunction) => {
  const { usuarioId, panesIds, total } = req.body;

  // Validar que exista usuarioId y sea un ObjectId valido
  if (!usuarioId || !mongoose.Types.ObjectId.isValid(usuarioId)) {
    return res.status(400).json({ error: "El pedido debe incluir un usuario válido" });
  }

  /// Validar que haya al menos un pan y que sean ObjectId válidos
  if (!panesIds || !Array.isArray(panesIds) || panesIds.length === 0) {
    return res.status(400).json({ error: "El pedido debe incluir al menos un pan" });
  }
  for (const panId of panesIds) {
    if (!mongoose.Types.ObjectId.isValid(panId)) {
      return res.status(400).json({ error: "Uno de los panes no es un ID válido" });
    }
  }

  // Validar que el total sea un número positivo
  if (!total || typeof total !== "number" || total <= 0) {
    return res.status(400).json({ error: "El pedido debe tener un total válido" });
  }

  // Si todo está bien, continuar con la ruta
  next();
};

export default validarPedido;
 