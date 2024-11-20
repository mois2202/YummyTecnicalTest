import {z} from 'zod'
import { UserRoles } from '../../roles/userRoleInterfacesTypes'


const roleIds = Object.values(UserRoles) as number[];

export const creationUserSchema = z.object( {
    body :  z.object({
      name: z.string().nonempty('El nombre es requerido'),
      email: z.string().email().nonempty('El email es requerido'),
      password: 
      z.string()
      .nonempty('La contraseña es requerida').min(8, 'La contraseña debe tener al menos 8 caracteres')
      .refine(
          (value) => /[A-Z]/.test(value), 
          { message: "La contraseña debe contener al menos una letra mayúscula" }
        )
        .refine(
          (value) => /[a-z]/.test(value), 
          { message: "La contraseña debe contener al menos una letra minúscula" }
        )
        .refine(
          (value) => /\d/.test(value), 
          { message: "La contraseña debe contener al menos un número" }
        )
        .refine(
          (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), 
          { message: "La contraseña debe contener al menos un carácter especial" }
        ),    
      role: z.number().int().refine((value) => roleIds.includes(value), {
        message: 'El rol especificado no es válido',
      })
    }) 
})