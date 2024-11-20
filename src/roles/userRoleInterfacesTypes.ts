export type UserRole = {
    id: number; 
    role_name: string; 
    initial_balance: number; 
  };

  export type UserRoleCreation  = Omit<UserRole, 'Id'>

  export const UserRoles = {
    payer: 1,
    collector: 2,
  } as const;
  
  export type UserRoleId = typeof UserRoles[keyof typeof UserRoles];


  export interface IUserRoleRepository {
    createRole(roleDTO: UserRoleCreation): Promise<UserRole>;
    getAllRoles(): Promise<UserRole[]>;
    getRoleById(id: number): Promise<UserRole | null>;
    updateRole(id: number, updatedData: Partial<UserRole>): Promise<UserRole | null>;
    deleteRole(id: number): Promise<boolean>;
  }

  export interface IUserRoleService {
    createRole(roleDTO: UserRoleCreation): Promise<UserRole>;
    getAllRoles(): Promise<UserRole[]>;
    getRoleById(id: number): Promise<UserRole | null>;
    updateRole(id: number, updatedData: Partial<UserRole>): Promise<UserRole | null>;
    deleteRole(id: number): Promise<boolean>;
  }