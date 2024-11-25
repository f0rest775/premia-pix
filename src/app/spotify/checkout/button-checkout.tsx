'use client'

import { CHECKOUT_SPOTIFY } from "@/functions/checkout-spotify";
import { getCookies } from "@/lib/cookies";

export function ButtonCheckout() {
  async function handleCheckout() {
    const email = await getCookies('user_email')
    const name = await getCookies('user_name')
    const tracking = await getCookies('utm_tracking')

    let checkoutUrl = CHECKOUT_SPOTIFY

    if (email) checkoutUrl += `email=${email}&`
    if (name) checkoutUrl += `name=${name}&`

    if (tracking) {
      const parsedTracking = JSON.parse(tracking)
      Object.entries(parsedTracking).forEach(([key, value]) => {
        if (value) checkoutUrl += `${key}=${value}&`
      })
    }

    checkoutUrl = checkoutUrl.replace(/&$/, '')

    window.location.href = checkoutUrl
  }

  return (
    <>
      <button
        onClick={handleCheckout}
        className="w-full text-black text-center bg-[#01D661] border-none outline-none rounded-3xl h-12 font-bold flex items-center justify-center"
      >
        FINALIZAR & RECEBER
      </button>
    </>
  )
}