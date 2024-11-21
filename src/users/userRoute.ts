import { Router } from 'express';
import { createUserModule } from './createUserModule';
import { checkAuth, checkRoleAuth } from '../shared/middlewares/authMiddleware';

const router = Router();

const userController = createUserModule();


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Solo los administradores (rol 3) pueden acceder a esta ruta para obtener todos los usuarios.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserWithoutPassword'
 *       403:
 *         description: Acceso denegado. Solo administradores tienen permiso.
 *       401:
 *         description: No autorizado. El token es inválido o no se proporcionó.
 */
router.get('/users', checkAuth, checkRoleAuth([3]), userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     description: Solo los administradores (rol 3) pueden obtener información detallada de un usuario por ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithoutPassword'
 *       403:
 *         description: Acceso denegado. Solo administradores tienen permiso.
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/users/:id', checkAuth, checkRoleAuth([3]), userController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualiza un usuario
 *     description: Solo los administradores (rol 3) pueden actualizar los datos de un usuario.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       403:
 *         description: Acceso denegado. Solo administradores tienen permiso.
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/users/:id', checkAuth, checkRoleAuth([3]), userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     description: Solo los administradores (rol 3) pueden eliminar usuarios del sistema.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       403:
 *         description: Acceso denegado. Solo administradores tienen permiso.
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/users/:id', checkAuth, checkRoleAuth([3]), userController.deleteUser);

export const UserRoutes = router;
