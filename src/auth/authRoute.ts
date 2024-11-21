import express from 'express';
import { loginCtrl, registerCtrl } from './authController';
import { schemaValidator} from '../shared/middlewares/schemaValidatorMiddleware';
import { creationUserSchema } from '../users/usersSchemas/userSchema';
import { checkAuth, checkRoleAuth } from '../shared/middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Permite a un usuario autenticarse en el sistema con su correo electrónico y contraseña.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 example: "Password123"
 *                 description: Contraseña del usuario.
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Devuelve un token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciales inválidas.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/login', loginCtrl);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Permite registrar un nuevo usuario en el sistema. Solo los administradores (`admin`, rol 3) pueden realizar esta acción.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreation'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error en los datos enviados. Verifique la información proporcionada.
 *       403:
 *         description: Acceso denegado. Solo administradores pueden registrar usuarios.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/register', checkAuth, checkRoleAuth([3]), schemaValidator(creationUserSchema), registerCtrl);



export const authRoutes = router;