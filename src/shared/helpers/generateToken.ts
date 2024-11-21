import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken';
import UserModel from '../../users/userModel';

export const tokenSign = async (user: UserModel): Promise<string> => {
    return jwt.sign(
        {
            _id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: '72h'
        }
    );
};

export const verifyToken = async (token: string): Promise< JwtPayload | String | null> => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (e) {
        return null;
    }
};
