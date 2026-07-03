import { Request, Response, NextFunction } from "express";

const validarUsuario = (req: Request, res: Response, next: NextFunction) => {
  const { nombre, email, password } = req.body;
  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({ error: "El usuario debe incluir un nombre válido" });
  }
  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "El usuario debe incluir un email válido" });
  }
    if (!password || typeof password !== "string") {
    return res.status(400).json({ error: "El usuario debe incluir una contraseña válida por favor" });
    }

    // Si todo está bien, continuar con la ruta
    next();
};

export default validarUsuario;
