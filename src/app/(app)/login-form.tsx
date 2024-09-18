'use client'

import { useEffect, useState } from "react"
import { InputMask } from '@react-input/mask'
import { useRouter } from 'next/navigation'
import { getApiCpf } from "./actions"
import { useFormState } from "@/hooks/use-form-state"
import { FileIcon, Loader, UserIcon, Users2Icon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"



export function LoginForm() {
  const router = useRouter()

  const [document, setDocument] = useState("")

  const [{ data, message, success }, handleSubmit, isPending] =
    useFormState(getApiCpf)

  useEffect(() => {
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
              <DialogTitle className="text-center text-3xl font-black">
                Você confirma os dados abaixo?
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-10">
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <FileIcon className="size-4 mr-2" />
                  <p className="text-sm">{data.data.DADOS_PESSOAIS.CPF}</p>
                </div>
                <div className="flex items-center">
                  <UserIcon className="size-4 mr-2" />
                  <p className="text-sm">{data.data.DADOS_PESSOAIS.NOME}</p>
                </div>

                <div className="flex items-center">
                  <Users2Icon className="size-4 mr-2" />
                  <p className="text-sm">{data.data.DADOS_PESSOAIS.NOME_MAE}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full">
                <Button onClick={() => router.push(`/onbording?src=user_not_found&document=${data.data.DADOS_PESSOAIS.CPF}`)} className="w-full bg-[#8B0101] hover:bg-[#8B0101]">
                  Corrigir
                </Button>
                <Button onClick={() => router.push(`/onbording?document=${data.data.DADOS_PESSOAIS.CPF}&name=${data.data.DADOS_PESSOAIS.NOME}`)} className="w-full bg-[#216b16] hover:bg-[#216b16]">
                  Confirmar
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
              Cadastrar & Continuar
            </span>
          )}
        </button>
      </form>
    </>
  )
}