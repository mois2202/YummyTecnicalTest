import { User, UserWithoutPassword, UserCreation, IUserRepository } from './userInterfacesTypes';
import UserModel from './userModel';

export default class UserRepository implements IUserRepository {
    
    async createUser(userDTO: UserCreation): Promise<UserModel> {
    const user = await UserModel.create({
        user: userDTO.user,
        email: userDTO.email,
        password: userDTO.password, 
        role: userDTO.role
    });
    return user;
}

async getAllUsersWithoutPassword() : Promise<UserWithoutPassword[]> {
    const users: User[] = await UserModel.findAll();
    // Mapeamos los usuarios a la interfaz `IUserWithoutPassword`, omitiendo el campo `password`
    const usersWithoutPassword: UserWithoutPassword[] = users.map(user => ({
        id: user.id,
        user: user.user,
        email: user.email,
        role: user.role,
        created_at: user.created_at 
    }));
       return usersWithoutPassword;
};


async getUserWithoutPassword (id: number): Promise<UserWithoutPassword | null> {
    const user : User | null = await UserModel.findByPk(id);

    if (!user) return null;
    const userWithoutPassword: UserWithoutPassword = {
        id: user.id,
        user: user.user,
        email: user.email,
        role: user.role,
        created_at: user.created_at
    };

    return userWithoutPassword;
}

async updateUser(id: number, updatedData: Partial<User>): Promise<UserModel | null>{
    const user = await UserModel.findByPk(id);

    if (!user) {
        return null;
    }

    await user.update(updatedData);
    return user;
};



async deleteUser(id: number): Promise<boolean> {
    const deletedCount = await UserModel.destroy({
        where: { id }
    });
    return deletedCount > 0; 
};
}

