'use client'

import { CHECKOUT_SPOTIFY } from "@/functions/checkout-spotify";



export function ButtonCheckout({ email, name }: { email?: string | null; name?: string | null }) {


  function handleCheckout() {

    if (email && name) {
      window.location.href = `${CHECKOUT_SPOTIFY}email=${email}&name=${name}`;
    } else {
      window.location.href = `${CHECKOUT_SPOTIFY}`
    }

  }


  return (
    <button onClick={handleCheckout} className="w-full text-black text-center bg-[#01D661] border-none outline-none rounded-3xl h-12 font-bold flex items-center justify-center">
      FINALIZAR & RECEBER
    </button>
  )
}