'use client'

import { useEffect, useState } from "react"
import { InputMask } from '@react-input/mask'
import { useRouter } from 'next/navigation'
import { getApiCpf } from "./actions"
import { useFormState } from "@/hooks/use-form-state"
import { Loader } from "lucide-react"



export function LoginForm() {
  const router = useRouter()

  const [document, setDocument] = useState("")

  const [{ data, message, success }, handleSubmit, isPending] =
    useFormState(getApiCpf)

  useEffect(() => {
    if (message === 'erro') {
      router.push(`/app/onbording?src=user_not_found&document=${document}`)
    }

    if (success && data?.data) {
      router.push(`/app/dados?document=${document}&name=${data.data.DADOS_PESSOAIS.NOME}&mae=${data.data.DADOS_PESSOAIS.NOME_MAE}&nasc=${data.data.DADOS_PESSOAIS.DATA_NASCIMENTO}`)
    }
  }, [message])



  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputMask
        mask="___.___.___-__"
        replacement={{ _: /\d/ }}
        type="tel"
        name="document"
        defaultValue={document}
        onChange={(e) => setDocument(e.target.value)}
        placeholder="Digite seu CPF"
        className="p-2 rounded-lg ring-1 focus:ring-2 ring-[#005952] outline-none border-0 w-full  h-11"
      />

      <button className="w-full bg-[#005952] h-12 text-center rounded-lg flex items-center justify-center text-white font-medium" disabled={isPending}>
        {isPending ? (
          <Loader className="size-4 animate-spin" />

        ) : (
          <span>
            Consultar & Continuar
          </span>
        )}
      </button>
    </form>

  )
}