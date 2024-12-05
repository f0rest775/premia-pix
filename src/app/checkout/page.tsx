import Image from "next/image";
import { FormCheckout } from "./form-checkout";
import Banner2 from '@/assets/pplqqjutgimageheaderpathhead_perfect_pay_2.png'
import { CountDown } from "@/components/count-down";
import BC from '@/assets/bc.png'

export default async function CheckoutPage() {


  return (
    <div className="w-full relative flex flex-col items-center justify-center min-h-screen">

      <CountDown />

      <div className="p-5 space-y-6">
        <div>
          <Image className="rounded-lg" src={Banner2} alt="Banner2" priority />
        </div>



        <FormCheckout />




      </div>


      <p className="text-center text-xs text-black">Essa é uma transação segura, criptografada e processada pelo Banco Central.</p>

      <div className="flex items-center justify-center flex-col pt-16 select-none space-y-1 mb-10">
        <p className="text-sm text-white">
          Segurança pelo:
        </p>

        <Image src={BC} alt="bc" width={0} height={0} className="w-[200px] h-auto" />
      </div>

    </div>

  )
}