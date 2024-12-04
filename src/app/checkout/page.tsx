import Image from "next/image";
import { FormCheckout } from "./form-checkout";
import Banner from '@/assets/pplqqk13limagepathbbb.png'
import Banner2 from '@/assets/pplqqjutgimageheaderpathhead_perfect_pay_2.png'
import { CountDown } from "@/components/count-down";

export default async function CheckoutPage() {


  return (
    <div className="w-full relative flex flex-col items-center justify-center min-h-screen">

      <CountDown />

      <div className="p-5 space-y-6">
        <div>
          <Image className="rounded-lg" src={Banner2} alt="Banner2" priority />
        </div>


        <FormCheckout />


        <div>
          <Image className="rounded-lg" src={Banner} alt="Banner" priority />
        </div>
      </div>
    </div>
  )
}