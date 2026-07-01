import { Request, Response, NextFunction } from "express";

const validarPedido = (req: Request, res: Response, next: NextFunction) => {
  const { cliente, panes, total } = req.body;

  // Validar que exista cliente
  if (!cliente || typeof cliente !== "string") {
    return res.status(400).json({ error: "El pedido debe incluir un cliente válido" });
  }

  // Validar que haya al menos un pan
  if (!panes || !Array.isArray(panes) || panes.length === 0) {
    return res.status(400).json({ error: "El pedido debe incluir al menos un pan" });
  }

  // Validar que el total sea un número positivo
  if (!total || typeof total !== "number" || total <= 0) {
    return res.status(400).json({ error: "El pedido debe tener un total válido" });
  }

  // Si todo está bien, continuar con la ruta
  next();
};

export default validarPedido;
 