import { Request, Response, NextFunction } from 'express';

export const verificarRol = (rolesPermitidos: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const usuario = (req as any).usuario; // viene del payload del JWT
        if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
            return res.status(403).json({ error: 'No tienes permiso para acceder a esta ruta' });
        }
        next();
    };
};