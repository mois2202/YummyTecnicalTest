import TransactionModel from "./transactionModel";
import { Transaction } from "sequelize";

export interface ITransaction {
    id: string;
    amount: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    payer_id: number;
    payer_email: string;
    collector_id: number;
    collector_email: string;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface TransactionCreation {
    amount: number;
    status?: 'pending' | 'confirmed' | 'cancelled';
    payer_id: number;
    payer_email?: string;
    collector_id: number;
    collector_email?: string;
  }
  
  export interface ITransactionRepository {
    createTransaction(
      transactionDTO: TransactionCreation,
      t?: Transaction
    ): Promise<TransactionModel>;
    getTransactionById(id: string): Promise<TransactionModel | null>;
    getAllTransactions(): Promise<TransactionModel[]>;
    updateTransactionStatus(
      id: string,
      status: 'pending' | 'confirmed' | 'cancelled',
      t?: Transaction
    ): Promise<TransactionModel | null>;
  }

  export interface ITransactionService {
    createTransaction(transactionDTO: TransactionCreation): Promise<TransactionModel>;
    getTransactionById(id: string): Promise<TransactionModel | null>;
    getAllTransactions(): Promise<TransactionModel[]>;
    verifyTransaction(collectorId: number, transactionId: string): Promise<TransactionModel>;
    confirmTransaction(collectorId: number, transactionId: string): Promise<TransactionModel>;
    getTransactionsByPayerId(payer_id: number): Promise<TransactionModel[]>;
    getTransactionsByCollectorId(collector_id: number): Promise<TransactionModel[]>;
  }