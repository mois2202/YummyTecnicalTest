import UserModel from './userModel'
import { UserRoleId } from '../roles/userRoleInterfacesTypes';
import Decimal from 'decimal.js';
import { Transaction } from 'sequelize';

export type User = {
  id: number;
  user: string;
  email: string;
  password: string;
  role: UserRoleId;
  balance: Decimal; 
  created_at: Date;
};

export type UserCreation = Omit<User, 'id' | 'created_at'>;

export type UserWithoutPassword = Omit<User, 'password'>;

export interface IUserRepository {
  createUser(userDTO: UserCreation): Promise<UserModel>;
  getAllUsersWithoutPassword(): Promise<UserWithoutPassword[]>;
  getUserWithoutPassword(id: number): Promise<UserWithoutPassword | null>;
  getUserById(id: number): Promise<UserModel | null>;
  getUserByEmail(email: string): Promise<UserModel | null>; 
  updateUser(id: number, updatedData: Partial<User>): Promise<UserModel | null>;
  deleteUser(id: number): Promise<boolean>;
  updateUserBalance(id: number, newBalance: Decimal, t?: Transaction): Promise<void>;
}

export interface IUserService {
  createUser(userDTO: UserCreation): Promise<UserModel>;
  getAllUsersWithoutPassword(): Promise<UserWithoutPassword[]>;
  getUserWithoutPassword(id: number): Promise<UserWithoutPassword | null>;
  updateUser(id: number, updatedData: Partial<User>): Promise<UserModel | null>;
  deleteUser(id: number): Promise<boolean>;
  authenticateUser(email: string, password: string): Promise<UserModel>;
}