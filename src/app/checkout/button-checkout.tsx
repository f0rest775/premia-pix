'use client'

import { getData } from "@/functions/get-cookie";
import { CHECKOUT_URL } from "@/functions/urls";
import { CreditCard } from "lucide-react";

export function ButtonCheckout() {
  async function handleCheckout() {
    const data = await getData('user_data') ?? ''

    if (!data) {
      window.location.href = `${CHECKOUT_URL}hidepix=1`
    } else {
      const dados = JSON.parse(data?.toString())
      window.location.href = `${CHECKOUT_URL}hidepix=1&email=${dados.email}&name=${dados.name}`;
    }
  }

  return (
    <button onClick={handleCheckout} type='button' className='border-2 rounded-lg flex flex-col justify-start gap-1 p-2 text-[#545454]'>
      <CreditCard className='size-4 text-[#545454]' />
      <span className='text-xs'>
        Cartão
      </span>
    </button>
  )
}