import { z } from 'zod'

export const PaymentSchema = z
  .object({
    pixType: z.enum(['CPF', 'EMAIL', 'PHONE'], { message: 'Selecione um tipo de chave PIX.' }),
    pixKey: z.string().nullish(),
    name: z.string().min(3, "O nome precisa ser informado."),
    document: z.string().min(14, { message: 'O documento precisa ser valido.' }).max(14, { message: 'O documento precisa ser valido.' })
  })
  .superRefine((data, ctx) => {

    if (data.pixKey == null) return;

    switch (data.pixType) {
      case 'CPF':
        if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(data.pixKey)) {
          ctx.addIssue({
            code: 'custom',
            message: 'Chave PIX deve ser um CPF válido no formato 000.000.000-00',
            path: ['pixKey']
          });
        }
        break;

      case 'EMAIL':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.pixKey)) {
          ctx.addIssue({
            code: 'custom',
            message: 'Chave PIX deve ser um e-mail válido',
            path: ['pixKey']
          });
        }
        break;

      case 'PHONE':
        if (!/^\(\d{2}\) 9 \d{4}-\d{4}$/.test(data.pixKey)) {
          ctx.addIssue({
            code: 'custom',
            message: 'Chave PIX deve ser um número de telefone válido no formato (00) 0 0000-0000',
            path: ['pixKey']
          });
        }
        break;
    }
  });