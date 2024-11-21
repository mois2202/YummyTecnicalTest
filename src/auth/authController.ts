import { Request, Response } from 'express';
import UserService from '../users/userService';
import UserRepository from '../users/userRepository';
import { tokenSign } from '../shared/helpers/generateToken';
import dotenv from 'dotenv';

dotenv.config();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const registerCtrl = async (req: Request, res: Response): Promise<void> => {
  try {  
    
    const user = await userService.createUser(req.body);
    res.status(201).json({ user });

  } catch (error: any) {
    if (error instanceof Error) {
      switch (error.message) {
        case 'Email inválido':
        case 'El email ya está registrado':
        case 'La contraseña debe tener al menos 6 caracteres':
          res.status(400).json({ message: error.message });
          break;
        default:
          res.status(500).json({ message: 'Ha ocurrido un error al registrar el usuario' });
          break;
      }
    } else {
      res.status(500).json({ message: 'Error desconocido' });
    }
  }
};

export const loginCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await userService.authenticateUser(email, password);
    const token = await tokenSign(user);
    res.status(200).json({ token });
  } catch (error: any) {
    if (error instanceof Error) {
      switch (error.message) {
        case 'Credenciales inválidas':
          res.status(401).json({ message: error.message });
          break;
        default:
          res.status(500).json({ message: 'Error interno del servidor' });
          break;
      }
    } else {
      res.status(500).json({ message: 'Error desconocido' });
    }
  }
};