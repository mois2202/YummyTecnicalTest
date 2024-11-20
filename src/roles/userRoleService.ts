import { UserRole, UserRoleCreation, IUserRoleRepository, IUserRoleService } from './userRoleInterfacesTypes';

export default class UserRoleService implements IUserRoleService {
  private userRoleRepository: IUserRoleRepository;

  constructor(userRoleRepository: IUserRoleRepository) {
    this.userRoleRepository = userRoleRepository;
  }

  public async createRole(roleDTO: UserRoleCreation): Promise<UserRole> {
    return await this.userRoleRepository.createRole(roleDTO);
  }

  public async getAllRoles(): Promise<UserRole[]> {
    return await this.userRoleRepository.getAllRoles();
  }

  public async getRoleById(id: number): Promise<UserRole | null> {
    return await this.userRoleRepository.getRoleById(id);
  }

  public async updateRole(id: number, updatedData: Partial<UserRole>): Promise<UserRole | null> {
    return await this.userRoleRepository.updateRole(id, updatedData);
  }

  public async deleteRole(id: number): Promise<boolean> {
    return await this.userRoleRepository.deleteRole(id);
  }
}