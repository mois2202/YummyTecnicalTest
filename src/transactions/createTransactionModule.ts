import TransactionController from "./transactionController";
import TransactionRepository from "./transactionRepository";
import TransactionService from "./transactionService";
import UserRepository from "../users/userRepository";
import sequelize from '../shared/db/dbConnection'

export const createTransactionModule = () => {
    const transactionRepository = new TransactionRepository();
    const userRepository = new UserRepository();
    const transactionService = new TransactionService(
        transactionRepository,
        userRepository,
        sequelize
    );
    const transactionController = new TransactionController(transactionService);
    return transactionController;
};