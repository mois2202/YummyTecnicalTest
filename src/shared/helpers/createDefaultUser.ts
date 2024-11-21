import UserModel from "../../users/userModel";
import Decimal from "decimal.js";
import bcrypt from 'bcryptjs'
import { UserRoleId } from "../../roles/userRoleInterfacesTypes";


const DEFAULT_USER = {
    user: 'DefaultUser',
    email: 'tecnicaltest@yummy.com',
    password: 'Yummy2024', 
    role: 3 as UserRoleId, 
    balance: new Decimal(0),
};

export const createDefaultUser = async (): Promise<void> => {
    try {

        // Verificar si el usuario ya existe
        const existingUser = await UserModel.findOne({ where: { email: DEFAULT_USER.email } });

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(DEFAULT_USER.password, 10);

            await UserModel.create({
                user: DEFAULT_USER.user,
                email: DEFAULT_USER.email,
                password: hashedPassword,
                role: DEFAULT_USER.role ,
                balance: DEFAULT_USER.balance,
            });

            console.log('Usuario por defecto creado exitosamente.');
        } else {
            console.log('El usuario por defecto ya existe.');
        }
    } catch (error) {
        console.error('Error al crear el usuario por defecto:', error);
    }
};