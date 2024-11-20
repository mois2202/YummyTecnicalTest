import { User, UserWithoutPassword, UserCreation, IUserRepository, IUserService } from './userInterfacesTypes';
import UserModel from './userModel';
import bcrypt from 'bcryptjs';

export default class UserService implements IUserService {
    
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }
   
    public async createUser(userDTO: UserCreation): Promise<UserModel> {   
        const password = await bcrypt.hash(userDTO.password, 10)
        const userForCreate = {
            ...userDTO,
            password
        }
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
