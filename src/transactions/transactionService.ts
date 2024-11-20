import {
    ITransactionService,
    TransactionCreation,
    ITransactionRepository,
  } from './transactionInterfacesTypes';
  import TransactionModel from './transactionModel';
  import { IUserRepository } from '../users/userInterfacesTypes';
  import { Sequelize } from 'sequelize-typescript';
  import Decimal from 'decimal.js';
import UserModel from '../users/userModel';
  
  export default class TransactionService implements ITransactionService {
    private transactionRepository: ITransactionRepository;
    private userRepository: IUserRepository;
    private sequelize: Sequelize;
  
    constructor(transactionRepository : ITransactionRepository,userRepository: IUserRepository, sequelize: Sequelize) {
      this.transactionRepository = transactionRepository;
      this.userRepository = userRepository;
      this.sequelize = sequelize;
    }
  
    public async createTransaction(transactionDTO: TransactionCreation): Promise<TransactionModel> {
      return await this.sequelize.transaction(async (t) => {
    
        let collector: UserModel | null = null;
        // Validar y obtener el cobrador
        if (transactionDTO.collector_email) {
          // Si se proporciona collector_email, damos prioridad a este
          collector = await this.userRepository.getUserByEmail(transactionDTO.collector_email);
          if (!collector) {
            throw new Error('Cobrador no encontrado con el collector_email proporcionado.');
          }

          
          if (transactionDTO.collector_id && transactionDTO.collector_id !== collector.id) {
            throw new Error('El collector_id proporcionado no coincide con el collector_email.');
          }

          transactionDTO.collector_id = collector.id; 

        } else if (transactionDTO.collector_id) {
          collector = await this.userRepository.getUserById(transactionDTO.collector_id);
          if (!collector) {
            throw new Error('Cobrador no encontrado con el collector_id proporcionado.');
          }
          transactionDTO.collector_email = collector.email; 
        } else {
          throw new Error('Debe proporcionar collector_email o collector_id.');
        }
    
        // Obtener el pagador
        const payer = await this.userRepository.getUserById(transactionDTO.payer_id);
        if (!payer) {
          throw new Error('Pagador no encontrado.');
        }

        transactionDTO.payer_email = payer.email; // Aseguramos que payer_email esté establecido
    
        if (payer.id === collector.id) {
          throw new Error('No puedes enviar un pago a ti mismo.');
        }
    
        const payerBalance = new Decimal(payer.balance);
        const amount = new Decimal(transactionDTO.amount);
    
        if (payerBalance.lessThan(amount)) {
          throw new Error('Saldo insuficiente.');
        }
    
        // Restar el monto del saldo del pagador
        const newPayerBalance = payerBalance.minus(amount);
    
        // Actualizar saldo del pagador
        await this.userRepository.updateUserBalance(payer.id, newPayerBalance, t)

        const transaction = await this.transactionRepository.createTransaction(transactionDTO, t);
        return transaction;
      });
    }
  
    public async getTransactionById(id: string): Promise<TransactionModel | null> {
      return await this.transactionRepository.getTransactionById(id);
    }
  
    public async getAllTransactions(): Promise<TransactionModel[]> {
      return await this.transactionRepository.getAllTransactions();
    }
  
    public async verifyTransaction(collectorId: number, transactionId: string): Promise<TransactionModel> {
      const transaction = await this.transactionRepository.getTransactionById(transactionId);
  
      if (!transaction) {
        throw new Error('Transacción no encontrada.');
      }
  
      if (transaction.collector_id !== collectorId) {
        throw new Error('La transacción no pertenece al usuario.');
      }

      // Retornar detalles de la transacción
      return transaction;
    }
  
    public async confirmTransaction(collectorId: number, transactionId: string): Promise<TransactionModel> {
      return await this.sequelize.transaction(async (t) => {
        const transaction = await this.transactionRepository.getTransactionById(transactionId);
  
        if (!transaction) {
          throw new Error('Transacción no encontrada.');
        }
  
        if (transaction.collector_id !== collectorId) {
          throw new Error('La transacción no pertenece al usuario.');
        }
  
        if (transaction.status !== 'pending') {
          throw new Error('La transacción no está pendiente.');
        }
  
        const updatedTransaction = await this.transactionRepository.updateTransactionStatus(
          transactionId,
          'confirmed'     
        );

        if (!updatedTransaction) {
          throw new Error('No se pudo actualizar el estado de la transacción.');
        }

        // Actualizar saldo del cobrador
        const collector = await this.userRepository.getUserById(collectorId);
  
        if (!collector) {
          throw new Error('Cobrador no encontrado.');
        }
  
        const collectorBalance = new Decimal(collector.balance);
        const amount = new Decimal(transaction.amount);
        const newCollectorBalance = collectorBalance.plus(amount);

        await this.userRepository.updateUserBalance(collector.id, newCollectorBalance, t);

        return transaction;
      });
    }
  
    public async getTransactionsByPayerId(payer_id: number): Promise<TransactionModel[]> {
      const transactions = await this.transactionRepository.getAllTransactions();
      return transactions.filter((tx) => tx.payer_id === payer_id);
    }
  
    public async getTransactionsByCollectorId(collector_id: number): Promise<TransactionModel[]> {
      const transactions = await this.transactionRepository.getAllTransactions();
      return transactions.filter((tx) => tx.collector_id === collector_id);
    }
  }