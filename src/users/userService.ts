// userService.ts

import { User, UserWithoutPassword, UserCreation, IUserRepository, IUserService } from './userInterfacesTypes';
import UserModel from './userModel';
import bcrypt from 'bcryptjs';
import { UserRoles } from '../roles/userRoleInterfacesTypes';
import Decimal from 'decimal.js';

export default class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async createUser(userDTO: UserCreation): Promise<UserModel> {
    const password = await bcrypt.hash(userDTO.password, 10);

    let initialBalance: Decimal;
    if (userDTO.role === UserRoles.payer) {
      initialBalance = new Decimal(1000.00);
    } else if (userDTO.role === UserRoles.collector) {
      initialBalance = new Decimal(100.00);
    } else {
      initialBalance = new Decimal(0);
    }
    const userForCreate: UserCreation = {
      ...userDTO,
      password,
      balance: initialBalance, // Asignar el saldo inicial
    };

    return await this.userRepository.createUser(userForCreate);
  }

  public async getAllUsersWithoutPassword(): Promise<UserWithoutPassword[]> {
    return await this.userRepository.getAllUsersWithoutPassword();
  }

  public async getUserWithoutPassword(id: number): Promise<UserWithoutPassword | null> {
    const user = await this.userRepository.getUserWithoutPassword(id);
    return user;
  }

  public async updateUser(id: number, updatedData: Partial<User>): Promise<UserModel | null> {
    const user = await this.userRepository.updateUser(id, updatedData);
    return user;
  }

  public async deleteUser(id: number): Promise<boolean> {
    const isDeleted = await this.userRepository.deleteUser(id);
    return isDeleted;
  }
}
