'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'


interface Props {
  len: string
}

export function ButtonCopy({ len }: Props) {
  const [isPending, setIsPending] = useState<boolean>(false)

  async function handleCopy() {
    setIsPending(true)

    navigator.clipboard.writeText(len)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsPending(false)
  }

  return (
    <button onClick={handleCopy} className="w-full max-w-sm bg-[#36CBBF] text-black rounded-3xl h-12 font-semibold flex items-center justify-center">
      {isPending ? (
        <Check className="mr-2 size-4" />
      ) : (
        <Copy className="mr-2 size-4" />
      )}
      Copiar codigo PIX
    </button>
  )
}