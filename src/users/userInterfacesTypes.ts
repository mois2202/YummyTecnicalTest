import UserModel from './userModel'
import { UserRoleId } from '../roles/userRoleInterfacesTypes';
// Interfaz completa para manejo interno de la aplicacion
export interface User {
  id?: number;
  user: string;
  email: string;
  password: string;
  role: UserRoleId;
  balance?: number;
  created_at?: Date;
}

  // Interfaz sin contraseña para la exposicion de usuarios
  export type UserWithoutPassword = Omit<User, 'password'>;


// Interfaz para manejo de datos opcionales autogenerados por la DB solo en contexto de creacion de registros
export type UserCreation = Omit<User, 'id' | 'created_at' | 'balance'>;


export interface IUserRepository {
  createUser(userDTO: UserCreation): Promise<UserModel>;
  getAllUsersWithoutPassword(): Promise<UserWithoutPassword[]>;
  getUserWithoutPassword(id: number): Promise<UserWithoutPassword | null>;
  updateUser(id: number, updatedData: Partial<User>): Promise<UserModel | null>;
  deleteUser(id: number): Promise<boolean>;
}

export interface IUserService {
  createUser(userDTO: UserCreation): Promise<UserModel>;
  getAllUsersWithoutPassword(): Promise<UserWithoutPassword[]>;
  getUserWithoutPassword(id: number): Promise<UserWithoutPassword | null>;
  updateUser(id: number, updatedData: Partial<User>): Promise<UserModel | null>;
  deleteUser(id: number): Promise<boolean>;
}

