import z from 'zod'

export const creationUserRoleSchema = z.object({
    body: z.object({
      role_name: z.string().nonempty(),
      initial_balance: z.number()
        .nonnegative('El balance inicial no puede ser negativo')
        .min(0, 'El balance inicial debe ser al menos 0'),
    }),
  });