import { Request, Response } from 'express';
import { IUserService } from './userInterfacesTypes';

export default class UserController {

    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    createUser = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Este es el error?' });
            } else {
                res.status(500).json({ message: 'Error desconocido' });
            }
        }
    };

    getAllUsers = async (_: Request, res: Response) => {
        try {
            const users = await this.userService.getAllUsersWithoutPassword();
            res.status(200).json(users);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Error desconocido' });
            }
        }
    };

    getUserById = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.getUserWithoutPassword(parseInt(req.params.id));
            if (!user) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Error desconocido' });
            }
        }
    };

    updateUser = async (req: Request, res: Response) => {
        try {
            const updatedUser = await this.userService.updateUser(parseInt(req.params.id), req.body);
            if (!updatedUser) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            } else {
                res.status(200).json(updatedUser);
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Error desconocido' });
            }
        }
    };

    deleteUser = async (req: Request, res: Response) => {
        try {
            await this.userService.deleteUser(parseInt(req.params.id));
            res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Error desconocido' });
            }
        }
    };
}