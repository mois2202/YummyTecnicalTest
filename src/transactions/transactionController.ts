import { Request, Response } from 'express';
import { ITransactionService } from './transactionInterfacesTypes';

export default class TransactionController {
  private transactionService: ITransactionService;

  constructor(transactionService: ITransactionService) {
    this.transactionService = transactionService;
  }

  createTransaction = async (req: Request, res: Response) => {
    try {
      const transaction = await this.transactionService.createTransaction(req.body);
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error desconocido' });
      }
    }
  };

  getTransactionById = async (req: Request, res: Response) => {
    try {
      const transaction = await this.transactionService.getTransactionById(req.params.id);
      if (!transaction) {
        res.status(404).json({ message: 'Transacción no encontrada' });
      } else {
        res.status(200).json(transaction);
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error desconocido' });
      }
    }
  };

  getAllTransactions = async (_: Request, res: Response) => {
    try {
      const transactions = await this.transactionService.getAllTransactions();
      res.status(200).json(transactions);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error desconocido' });
      }
    }
  };

  verifyTransaction = async (req: Request, res: Response) => {
    try {
      const collectorId = parseInt(req.params.collectorId);
      const transactionId = req.params.transactionId;

      const transaction = await this.transactionService.verifyTransaction(collectorId, transactionId);

      res.status(200).json(transaction);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Transacción no encontrada.' || error.message === 'La transacción no pertenece al usuario.') {
          res.status(404).json({ message: error.message });
        } else {
          res.status(400).json({ message: error.message });
        }
      } else {
        res.status(500).json({ message: 'Error desconocido' });
      }
    }
  };

  confirmTransaction = async (req: Request, res: Response) => {
    try {
      const collectorId = parseInt(req.params.collectorId);
      const transactionId = req.params.transactionId;

      const transaction = await this.transactionService.confirmTransaction(collectorId, transactionId);

      res.status(200).json(transaction);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Transacción no encontrada.' || error.message === 'La transacción no pertenece al usuario.' || error.message === 'La transacción no está pendiente.') {
          res.status(400).json({ message: error.message });
        } else {
          res.status(500).json({ message: error.message });
        }
      } else {
        res.status(500).json({ message: 'Error desconocido' });
      }
    }
  };

  getTransactionsByPayerId = async (req: Request, res: Response) => {
    try {
      const payerId = parseInt(req.params.payerId);
      const transactions = await this.transactionService.getTransactionsByPayerId(payerId);
      res.status(200).json(transactions);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error desconocido' });
      }
    }
  };

  getTransactionsByCollectorId = async (req: Request, res: Response) => {
    try {
      const collectorId = parseInt(req.params.collectorId);
      const transactions = await this.transactionService.getTransactionsByCollectorId(collectorId);
      res.status(200).json(transactions);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error desconocido' });
      }
    }
  };
}