import { z } from 'zod';

export const creationTransactionSchema = z.object({
  body: z
    .object({
      amount: z
        .string()
        .nonempty('El monto es requerido')
        .regex(/^\d+(\.\d{1,2})?$/, 'El monto debe ser un número válido con hasta dos decimales')
        .refine((value) => parseFloat(value) > 0, {
          message: 'El monto debe ser un número positivo',
        }),
      payer_id: z
        .number({ invalid_type_error: 'El ID del pagador debe ser un número' })
        .int('El ID del pagador debe ser un número entero')
        .positive('El ID del pagador debe ser un número positivo'),
      payer_email: z.string().email('El email del pagador no es válido').optional(),
      collector_id: z
        .number({ invalid_type_error: 'El ID del cobrador debe ser un número' })
        .int('El ID del cobrador debe ser un número entero')
        .positive('El ID del cobrador debe ser un número positivo')
        .optional(),
      collector_email: z.string().email('El email del cobrador no es válido').optional(),
    })
    .refine((data) => data.collector_id || data.collector_email, {
      message: 'Debe proporcionar al menos collector_id o collector_email',
      path: ['collector_id', 'collector_email'],
    }),
});