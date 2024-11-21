import { Router } from 'express';

import { schemaValidator } from '../shared/middlewares/schemaValidatorMiddleware';
import { createTransactionModule } from './createTransactionModule';
import { creationTransactionSchema } from './transactionSchema/transactionSchema';
import { checkAuth, checkRoleAuth } from '../shared/middlewares/authMiddleware';

const router = Router();

const transactionController = createTransactionModule();

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Crear una nueva transacción
 *     description: Crea una nueva transacción. Disponible para `payer` (1), `collector` (2) y `admin` (3), tambien soporta pago usando el email.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Transactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionCreation'
 *     responses:
 *       201:
 *         description: Transacción creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Datos inválidos.
 *       403:
 *         description: Acceso denegado. Rol no autorizado.
 */
router.post(
  '/transactions',
  checkAuth,
  checkRoleAuth([1, 2, 3]),
  schemaValidator(creationTransactionSchema),
  transactionController.createTransaction
);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Obtener todas las transacciones
 *     description: Solo disponible para administradores (`admin`, rol 3).
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: Lista de transacciones obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       403:
 *         description: Acceso denegado. Solo administradores tienen acceso.
 */
router.get('/transactions', checkAuth, checkRoleAuth([3]), transactionController.getAllTransactions);

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Obtener una transacción por ID
 *     description: Obtiene los detalles de una transacción específica. Solo disponible para administradores (`admin`, rol 3).
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la transacción.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles de la transacción obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       403:
 *         description: Acceso denegado. Solo administradores tienen acceso.
 */
router.get('/transactions/:id', checkAuth, checkRoleAuth([3]), transactionController.getTransactionById);

/**
 * @swagger
 * /transactions/{transactionId}/verify/{collectorId}:
 *   get:
 *     summary: Verificar una transacción
 *     description: Verifica una transacción específica. Disponible para `payer` (1), `collector` (2) y `admin` (3).
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         description: ID de la transacción.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: collectorId
 *         required: true
 *         description: ID del cobrador asociado a la transacción.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transacción verificada exitosamente.
 *       403:
 *         description: Acceso denegado. Rol no autorizado.
 */
router.get(
  '/transactions/:transactionId/verify/:collectorId',
  checkAuth,
  checkRoleAuth([1, 2, 3]),
  transactionController.verifyTransaction
);

/**
 * @swagger
 * /transactions/{transactionId}/confirm/{collectorId}:
 *   patch:
 *     summary: Confirmar una transacción
 *     description: Confirma una transacción específica. Disponible para `collector` (2) y `admin` (3).
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         description: ID de la transacción.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: collectorId
 *         required: true
 *         description: ID del cobrador asociado a la transacción.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transacción confirmada exitosamente.
 *       403:
 *         description: Acceso denegado. Rol no autorizado.
 */
router.patch(
  '/transactions/:transactionId/confirm/:collectorId',
  checkAuth,
  checkRoleAuth([2, 3]),
  transactionController.confirmTransaction
);

/**
 * @swagger
 * /transactions/payer/{payerId}:
 *   get:
 *     summary: Obtener transacciones por pagador
 *     description: Obtiene las transacciones realizadas por un pagador específico. Disponible para `payer` (1) y `admin` (3).
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: payerId
 *         required: true
 *         description: ID del pagador.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de transacciones obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       403:
 *         description: Acceso denegado. Rol no autorizado.
 */
router.get(
  '/transactions/payer/:payerId',
  checkAuth,
  checkRoleAuth([1, 3]),
  transactionController.getTransactionsByPayerId
);

/**
 * @swagger
 * /transactions/collector/{collectorId}:
 *   get:
 *     summary: Obtener transacciones por cobrador
 *     description: Obtiene las transacciones realizadas por un cobrador específico. Disponible para `collector` (2) y `admin` (3).
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: collectorId
 *         required: true
 *         description: ID del cobrador.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de transacciones obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       403:
 *         description: Acceso denegado. Rol no autorizado.
 */
router.get(
  '/transactions/collector/:collectorId',
  checkAuth,
  checkRoleAuth([2, 3]),
  transactionController.getTransactionsByCollectorId
);

export const TransactionRoutes = router;