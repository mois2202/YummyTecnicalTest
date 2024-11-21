import { Router } from 'express';
import { checkRoleAuth } from '../shared/middlewares/authMiddleware';
import { schemaValidator } from '../shared/middlewares/schemaValidatorMiddleware';
import { creationUserRoleSchema } from './userRoleSchema/userRoleSchema';
import { createUserRoleModule } from './createUserRoleModule';
import { checkAuth } from '../shared/middlewares/authMiddleware';
const router = Router();

const userRoleController = createUserRoleModule();

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     description: Solo los administradores (`admin`, rol 3) pueden crear nuevos roles.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Roles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRoleCreation'
 *     responses:
 *       201:
 *         description: Rol creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRole'
 *       403:
 *         description: Acceso denegado. Solo administradores tienen permiso.
 */
router.post('/roles', checkAuth, checkRoleAuth([3]), schemaValidator(creationUserRoleSchema), userRoleController.createRole);

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtener todos los roles
 *     description: Solo los administradores (`admin`, rol 3) pueden obtener la lista de roles.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: Lista de roles obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserRole'
 *       403:
 *         description: Acceso denegado. Solo administradores tienen permiso.
 */
router.get('/roles', checkAuth, checkRoleAuth([3]), userRoleController.getAllRoles);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Obtener un rol por ID
 *     description: Solo los administradores (`admin`, rol 3) pueden obtener la información de un rol específico.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del rol
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Información del rol obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRole'
 *       403:
 *         description: Acceso denegado. Solo administradores tienen permiso.
 *       404:
 *         description: Rol no encontrado.
 */
router.get('/roles/:id', checkRoleAuth([3]), checkAuth, userRoleController.getRoleById);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Actualizar un rol
 *     description: Solo los administradores (`admin`, rol 3) pueden actualizar un rol.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del rol
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRoleCreation'
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRole'
 *       403:
 *         description: Acceso denegado. Solo administradores tienen permiso.
 *       404:
 *         description: Rol no encontrado.
 */
router.put('/roles/:id', checkRoleAuth([3]), checkAuth, userRoleController.updateRole);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Eliminar un rol
 *     description: Solo los administradores (`admin`, rol 3) pueden eliminar un rol.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del rol
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente.
 *       403:
 *         description: Acceso denegado. Solo administradores tienen permiso.
 *       404:
 *         description: Rol no encontrado.
 */
router.delete('/roles/:id', checkRoleAuth([3]), checkAuth, userRoleController.deleteRole);

export const UserRoleRoutes = router;