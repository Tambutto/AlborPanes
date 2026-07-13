import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET || 'secreto') as JwtPayload;;
        (req as any).usuario = verificado; //guardo info del usuario en la respuesta
        next();

    }catch (error) {
        res.status(400).json({ error: 'token inválido'});
    }
};
