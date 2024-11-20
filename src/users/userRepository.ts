import Decimal from 'decimal.js';
import { User, UserWithoutPassword, IUserRepository } from './userInterfacesTypes';
import UserModel from './userModel';
import { Transaction } from 'sequelize';

export default class UserRepository implements IUserRepository {
  async createUser(userDTO: User): Promise<UserModel> {
    const user = await UserModel.create({
      user: userDTO.user,
      email: userDTO.email,
      password: userDTO.password,
      role: userDTO.role,
      balance: userDTO.balance
    });
    return user;
  }

  async getAllUsersWithoutPassword(): Promise<UserWithoutPassword[]> {
    const users: User[] = await UserModel.findAll();
    // Mapeamos los usuarios a la interfaz `UserWithoutPassword`, omitiendo el campo `password`
    const usersWithoutPassword: UserWithoutPassword[] = users.map(user => ({
      id: user.id,
      user: user.user,
      email: user.email,
      role: user.role,
      balance: user.balance, 
      created_at: user.created_at,
    }));
    return usersWithoutPassword;
  }

  async getUserWithoutPassword(id: number): Promise<UserWithoutPassword | null> {
    const user: User | null = await UserModel.findByPk(id);

    if (!user) return null;

    const userWithoutPassword: UserWithoutPassword = {
      id: user.id,
      user: user.user,
      email: user.email,
      role: user.role,
      balance: user.balance, 
      created_at: user.created_at,
    };

    return userWithoutPassword;
  }

  async updateUser(id: number, updatedData: Partial<User>): Promise<UserModel | null> {
    const user = await UserModel.findByPk(id);

    if (!user) {
      return null;
    }

    await user.update(updatedData);
    return user;
  }

  async deleteUser(id: number): Promise<boolean> {
    const deletedCount = await UserModel.destroy({
      where: { id },
    });
    return deletedCount > 0;
  }

  async getUserById(id: number): Promise<UserModel | null> {
    const user = await UserModel.findByPk(id);
    return user;
  }

  async updateUserBalance(id: number, newBalance: Decimal, t?: Transaction): Promise<void> {
    const [affectedRows] = await UserModel.update(
        { balance: newBalance },
        { where: { id }, transaction: t }
      );
  
      if (affectedRows === 0) {
        throw new Error(`No se pudo actualizar el saldo del usuario con id ${id}.`);
      }
}

async getUserByEmail(email: string): Promise<UserModel | null> {
  const user = await UserModel.findOne({
    where: { email },
  });
  return user;
}

}
