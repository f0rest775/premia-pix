'use client'

import { InputMask } from "@react-input/mask";

export function InputCep() {
  return (
    <InputMask
      mask="_____-___"
      replacement={{ _: /\d/ }}
      type="text"
      placeholder="CEP"
      className="h-12 bg-[#181818] rounded-lg ring-2 ring-[#A8A8A8] w-full px-4 text-[#A8A8A8] border-none outline-none"
    />
  )
}