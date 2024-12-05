import { z } from 'zod'

const validateCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]/g, '')

  if (cpf.length !== 11) return false

  if (/^(\d)\1{10}$/.test(cpf)) return false

  let sum = 0
  let remainder

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(10, 11))) return false

  return true
}


export const FormSchema = z
  .object({
    document: z
      .string()
      .min(11, 'CPF deve ter 11 dígitos.')
      .max(14, 'CPF inválido.')
      .refine((cpf) => validateCPF(cpf), {
        message: 'CPF inválido.',
      }),

    email: z.string().email('E-mail inválido.'),
    name: z
      .string()
      .min(3, 'Nome deve ter no mínimo 3 caracteres.')
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'Nome deve conter apenas letras.'),
    orderBump: z.boolean()
  })
