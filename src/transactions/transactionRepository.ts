import { TransactionCreation, ITransactionRepository } from './transactionInterfacesTypes';
import { Transaction } from 'sequelize';
import TransactionModel from './transactionModel';

export default class TransactionRepository implements ITransactionRepository {

  async createTransaction(
    transactionDTO: TransactionCreation,
    t?: Transaction
  ): Promise<TransactionModel> {
    const newTransaction = await TransactionModel.create(
      {
        amount: transactionDTO.amount,
        status: 'pending',
        payer_id: transactionDTO.payer_id,
        payer_email: transactionDTO.payer_email,
        collector_id: transactionDTO.collector_id,
        collector_email: transactionDTO.collector_email,
      },
      { transaction: t }
    );
    return newTransaction;
  }

  async getTransactionById(id: string): Promise<TransactionModel | null> {
    const transaction = await TransactionModel.findByPk(id);
    return transaction;
  }

  async getAllTransactions(): Promise<TransactionModel[]> {
    const transactions = await TransactionModel.findAll();
    return transactions;
  }

  async updateTransactionStatus(
    id: string,
    status: 'pending' | 'confirmed' | 'cancelled',
  ): Promise<TransactionModel | null> {
    const transaction = await TransactionModel.findByPk(id);
    if (!transaction) {
      return null;
    }
    await transaction.update({ status });
    return transaction;
  }
}