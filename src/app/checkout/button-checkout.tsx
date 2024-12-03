'use client'

import { getData } from "@/functions/get-cookie";
import { CHECKOUT_URL } from "@/functions/urls";
import { CreditCard } from "lucide-react";

export function ButtonCheckout() {
  async function handleCheckout() {
    const data = await getData('user_data') ?? ''

    if (!data) {
      window.location.href = CHECKOUT_URL
    } else {
      const dados = JSON.parse(data?.toString())
      window.location.href = `${CHECKOUT_URL}email=${dados.email}&name=${dados.name}`;
    }
  }

  return (
    <button
      onClick={handleCheckout}
      className="w-full max-w-sm bg-[#36CBBF] text-black rounded-3xl h-12 font-semibold flex items-center justify-center"
    >
      <CreditCard className="size-5 mr-2" />
      Pagar com cartão
    </button>
  )
}