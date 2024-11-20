import UserRoleRepository from './userRoleRepository';
import UserRoleService from './userRoleService';
import UserRoleController from './userRoleController';

export function createUserRoleModule() {
  const userRoleRepository = new UserRoleRepository();
  const userRoleService = new UserRoleService(userRoleRepository);
  const userRoleController = new UserRoleController(userRoleService);

  return userRoleController;
}