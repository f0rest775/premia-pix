import { z } from 'zod'

export const PaymentSchema = z
  .object({
    pixType: z.enum(['CPF', 'EMAIL', 'PHONE'], { message: 'Selecione um tipo chave PIX.' }),
    pixKey: z.string().nullish(),
    name: z.string().min(3),
    document: z.string().min(14).max(14)
  }).superRefine((ctx, data) => { })
