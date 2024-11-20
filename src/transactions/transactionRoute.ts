import { Router } from 'express';
import { schemaValidator } from '../shared/auth/schemaValidatorMiddleware';
import { createTransactionModule } from './createTransactionModule';
import { creationTransactionSchema } from './transactionSchema/transactionSchema';

const router = Router();

const transactionController = createTransactionModule();

// Crear una nueva transacción
router.post(
  '/transactions',
  schemaValidator(creationTransactionSchema),
  transactionController.createTransaction
);

// Obtener todas las transacciones
router.get('/transactions', transactionController.getAllTransactions);

// Obtener una transacción por ID
router.get('/transactions/:id', transactionController.getTransactionById);

// Verificar una transacción
router.get(
  '/transactions/:transactionId/verify/:collectorId',
  transactionController.verifyTransaction
);

// Confirmar una transacción
router.patch(
  '/transactions/:transactionId/confirm/:collectorId',
  transactionController.confirmTransaction
);

// Obtener transacciones por pagador
router.get(
  '/transactions/payer/:payerId',
  transactionController.getTransactionsByPayerId
);

// Obtener transacciones por cobrador
router.get(
  '/transactions/collector/:collectorId',
  transactionController.getTransactionsByCollectorId
);

export const TransactionRoutes = router;