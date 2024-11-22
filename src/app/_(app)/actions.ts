'use server'

import { isValidCPF } from '@/functions/validator'
import { z } from 'zod'

const getCpfSchema = z.object({
  document: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .refine(isValidCPF, {
      message: 'CPF invalido.',
    }),
})

export interface Root {
  data: Data
}

export interface Data {
  DADOS_PESSOAIS: DadosPessoais
  TELEFONES: Telefones[]
  ENDERECOS: Enderecos[]
  PARENTES: Parentes[]
}

export interface DadosPessoais {
  PRIMEIRO_NOME: string
  NOME: string
  NOME_MAE: string
  NOME_PAI: string
  CPF: string
  SEXO: string
  RENDA: string
  RG: string
  DATA_NASCIMENTO: string
}

export interface Telefones {
  TELEFONE: string
}

export interface Enderecos {
  CIDADE: string
  NUMERO: string
  CEP: string
  UF: string
  BAIRRO: string
  LOGRADOURO: string
}

export interface Parentes {
  VINCULO: string
  CPF: string
  NOME: string
}



export async function getApiCpf(data: FormData) {
  const result = getCpfSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: 'erro', errors }
  }

  const document = result.data.document.replace(".", "").replace(".", "").replace("-", "")

  const dd = await fetch(`https://api.wiseapi.io/v1/cpf/${document}`, {
    headers: {
      'x-wise-key': 'sk_01j29qcja7dbhgxkngdwq8spn501j29qcja8e4yx8htk4f4ynv4d'
    }
  })

  const xx: Root = await dd.json()

  if (!dd.ok) {
    return {
      success: false,
      message: 'erro',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Sucesso ao consultar',
    data: xx,
    errors: null,
  }
}