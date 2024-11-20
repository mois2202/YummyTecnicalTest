import { Request, Response } from 'express';
import { IUserRoleService } from './userRoleInterfacesTypes';

export default class UserRoleController {
  private userRoleService: IUserRoleService;

  constructor(userRoleService: IUserRoleService) {
    this.userRoleService = userRoleService;
  }

  createRole = async (req: Request, res: Response) => {
    try {
      const role = await this.userRoleService.createRole(req.body);
      res.status(201).json(role);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error desconocido' });
      }
    }
  };

  getAllRoles = async (_: Request, res: Response) => {
    try {
      const roles = await this.userRoleService.getAllRoles();
      res.status(200).json(roles);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error desconocido' });
      }
    }
  };

  getRoleById = async (req: Request, res: Response) => {
    try {
      const role = await this.userRoleService.getRoleById(parseInt(req.params.id));
      if (!role) {
        res.status(404).json({ message: 'Rol no encontrado' });
      } else {
        res.status(200).json(role);
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error desconocido' });
      }
    }
  };

  updateRole = async (req: Request, res: Response) => {
    try {
      const updatedRole = await this.userRoleService.updateRole(parseInt(req.params.id), req.body);
      if (!updatedRole) {
        res.status(404).json({ message: 'Rol no encontrado' });
      } else {
        res.status(200).json(updatedRole);
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error desconocido' });
      }
    }
  };

  deleteRole = async (req: Request, res: Response) => {
    try {
      const isDeleted = await this.userRoleService.deleteRole(parseInt(req.params.id));
      if (isDeleted) {
        res.status(200).json({ message: 'Rol eliminado correctamente' });
      } else {
        res.status(404).json({ message: 'Rol no encontrado' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error desconocido' });
      }
    }
  };
}
