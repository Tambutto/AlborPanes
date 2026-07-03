import { Request, Response } from "express";
import Usuario from "../models/usuarios";

interface UsuariosController {
  getUsuarios: (req: Request, res: Response) => Promise<void>;
  createUsuario: (req: Request, res: Response) => Promise<void>;
  getUsuarioById: (req: Request, res: Response) => Promise<void>;
  updateUsuario: (req: Request, res: Response) => Promise<void>;
  deleteUsuario: (req: Request, res: Response) => Promise<void>;
}

const usuariosController = {

    // Obtener todos los usuarios
    getUsuarios: async (req: Request, res: Response): Promise<void> => {
        try {
            const usuarios = await Usuario.find();
            res.json(usuarios);
        } catch (error: any) {
            res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
        },

    // Crear un nuevo usuario
    createUsuario: async (req: Request, res: Response): Promise<void> => {
        try {
            const nuevoUsuario = new Usuario(req.body);
            await nuevoUsuario.save();
            res.status(201).json(nuevoUsuario);
        } catch (error: any) {
            res.status(500).json({ error: 'Error al crear el usuario' });
        }
    },
    
    // Obtener un usuario por ID
    getUsuarioById: async (req: Request, res: Response): Promise<void> => {
        try {   
            const usuario = await Usuario.findById(req.params.id);
         if (!usuario) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
         }
            res.json(usuario); //Si existe , lo devuelve en json
        } catch (error: any) {
            res.status(500).json({ error: 'Error al obtener el usuario' });
        }
    },

    // Actualizar un usuario por ID
    updateUsuario: async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!usuario) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
            }
            res.json(usuario);
        } catch (error: any) {
            res.status(500).json({ error: 'Error al actualizar el usuario' });
        }
    },

    // Eliminar un usuario por ID
    deleteUsuario: async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = await Usuario.findByIdAndDelete(req.params.id);
            if (!usuario) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
            }
            res.json({ message: 'Usuario eliminado correctamente' });
        } catch (error: any) {
            res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
    
    }}

    export default usuariosController;