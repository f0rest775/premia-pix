import { z } from 'zod'

export const RegisterAccountSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Apenas nomes com, no mínimo, 3 caracteres são permitidos.'),
    email: z.string({ message: 'Digite um e-mail valido.' }).email({ message: 'Digite um e-mail valido.' }),
    document: z.string({ message: 'Digite um CPF valido.' }).min(14, { message: 'Digite um CPF valido.' }).max(14, { message: 'Digite um CPF valido.' })
  })
