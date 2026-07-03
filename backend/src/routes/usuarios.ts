import { Router } from 'express';
import usuariosController from '../controllers/usuarios.controller';
import validarUsuario from "../middlewares/validarUsuario";

const router = Router();

// Obtener todos los usuarios
router.get('/', usuariosController.getUsuarios);
// Crear un nuevo usuario
router.post('/', validarUsuario, usuariosController.createUsuario);
// Obtener un usuario por ID
router.get('/:id', usuariosController.getUsuarioById);
// Actualizar un usuario por ID
router.put('/:id', validarUsuario, usuariosController.updateUsuario);
// Eliminar un usuario por ID
router.delete('/:id', usuariosController.deleteUsuario);

export default router;