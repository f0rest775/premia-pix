'use client'

import { getData } from "@/functions/get-cookie";
import { CHECKOUT_URL } from "@/functions/urls";
import { Loader } from "lucide-react";
import { useState } from "react";

export function ButtonCheckout() {

  const [seconds, setSeconds] = useState<number>(2)
  const [loading, setLoading] = useState(false)


  async function handleCheckout() {
    setLoading(true)


    const countdown = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);


    const data = await getData('user_data') ?? ''


    if (!data) {
      setTimeout(() => {
        clearInterval(countdown);
        window.location.href = CHECKOUT_URL;
      }, seconds * 1000);
    } else {

      const dados = JSON.parse(data?.toString())

      setTimeout(() => {
        clearInterval(countdown);
        window.location.href = `${CHECKOUT_URL}email=${dados.email}&name=${dados.name}`;
      })
    }
  }


  return (
    <div className="w-full flex items-center justify-center">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full border-0 outline-none max-w-[300px] duration-1000 text-white animate-btn bg-[#005952] rounded-3xl h-12 font-bold flex items-center justify-center"

      >
        {loading && <Loader className="size-5 animate-spin mr-2" />}
        CONTINUAR & RECEBER
      </button>
    </div>
  )
}