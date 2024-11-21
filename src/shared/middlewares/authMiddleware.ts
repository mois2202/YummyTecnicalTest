import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/generateToken';
import UserModel from '../../users/userModel';

export const checkAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(' ').pop();
        if (!token) {
            res.status(401).send({ error: 'No token provided' });
            return;
        }

        const tokenData = await verifyToken(token);

        if (tokenData && (tokenData as any)._id) {
            next();
        } else {
            res.status(409).send({ error: 'Invalid token' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
};


export const checkRoleAuth = (roles: number[]) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(' ').pop();
        if (!token) {
            res.status(401).send({ error: 'Debe proporcionar un token de autenticacion' });
            return;
        }

        const tokenData = await verifyToken(token);
        if (!tokenData || !(tokenData as any)._id) {
            res.status(401).send({ error: 'Token inválido' });
            return;
        }

        const userData = await UserModel.findByPk(((tokenData as any)._id));
        if (!userData) {
            res.status(404).send({ error: 'User not found' });
            return;
        }

        if (roles.includes(userData.role)) {
            next();
        } else {
            res.status(403).send({ error: 'El usuario no tiene los permisos requeridos' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Error desconocido' });
    }
};
