import { UserRole, UserRoleCreation, IUserRoleRepository } from './userRoleInterfacesTypes';
import UserRoleModel from './userRoleModel';

export default class UserRoleRepository implements IUserRoleRepository {

  async createRole(roleDTO: UserRoleCreation): Promise<UserRole> {
    const role = await UserRoleModel.create({
      role_name: roleDTO.role_name,
      initial_balance: roleDTO.initial_balance,
    });
    return role;
  }

  async getAllRoles(): Promise<UserRole[]> {
    const roles = await UserRoleModel.findAll();
    return roles;
  }

  async getRoleById(id: number): Promise<UserRole | null> {
    const role = await UserRoleModel.findByPk(id);
    return role;
  }

  async updateRole(id: number, updatedData: Partial<UserRole>): Promise<UserRole | null> {
    const role = await UserRoleModel.findByPk(id);

    if (!role) {
      return null;
    }

    await role.update(updatedData);
    return role;
  }

  async deleteRole(id: number): Promise<boolean> {
    const deletedCount = await UserRoleModel.destroy({
      where: { id },
    });
    return deletedCount > 0;
  }
}