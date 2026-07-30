import { Router } from 'express';
import usuariosController from '../controllers/usuarios.controller';
import validarUsuario from "../middlewares/validarUsuario";
import { verificarToken } from "../middlewares/auth";

const router = Router();

// Obtener todos los usuarios
router.get('/', verificarToken, usuariosController.getUsuarios);
// Crear un nuevo usuario
// router.post('/', validarUsuario, usuariosController.registerUsuario);
// Registrar un nuevo usuario
router.post("/register", validarUsuario, usuariosController.registerUsuario);
// login de usuario
router.post('/login', usuariosController.loginUsuario);

// Obtener un usuario por ID
router.get('/:id', usuariosController.getUsuarioById);
// Actualizar un usuario por ID
router.put('/:id', validarUsuario, usuariosController.updateUsuario);
// Eliminar un usuario por ID
router.delete('/:id', usuariosController.deleteUsuario);

export default router;