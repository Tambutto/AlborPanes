import { Request, Response } from "express";
import Usuario from "../models/usuarios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface UsuariosController {
  getUsuarios: (req: Request, res: Response) => Promise<void>;
  createUsuario: (req: Request, res: Response) => Promise<void>;
  getUsuarioById: (req: Request, res: Response) => Promise<void>;
  updateUsuario: (req: Request, res: Response) => Promise<void>;
  deleteUsuario: (req: Request, res: Response) => Promise<void>;
  loginUsuario: (req: Request, res: Response) => Promise<void>;
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
            const { nombre, email, password, rol } = req.body;

            // Verifico si el email existe
            const usuarioExistente = await Usuario.findOne({ email });
            if (usuarioExistente) {
                res.status(400).json({ error: 'El email ya está registrado' });
                return;
            }

            // Encriptar la contraseña antes de guardarla
            const salt = await bcrypt.genSalt(10);
            const passwprdHash = await bcrypt.hash(password, salt);


            const nuevoUsuario = new Usuario({
                nombre,
                email,
                password: passwprdHash,
                rol
            });

            await nuevoUsuario.save();

            res.status(201).json({
                id: nuevoUsuario._id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol
                });
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
    
    },
    // Login de usuario
    loginUsuario: async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;

        try {
            const usuario = await Usuario.findOne({ email });
            if (!usuario) {
                res.status(400).json({ error: 'Usuario no encontrado' });
                    return;
                }
                const passwordValido = await bcrypt.compare(password, usuario.password);
                if(!passwordValido) {
                    res.status(400).json({ error: 'Contraseña incorrecta' });
                    return;
                }

                // Generar token JWT
                const token = jwt.sign(
                    { id: usuario.id, email: usuario.email, rol: (usuario as any).rol },
                    process.env.JWT_SECRET || 'secreto',
                    { expiresIn: '1h' }
                );

            // devolver el token al cliente
            res.json({ token });
        } catch (error: any) {
                res.status(500).json({ error: 'Error en el login'})
            }
            }
        };

    export default usuariosController;