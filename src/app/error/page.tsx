import Image from "next/image";
import Logo from '@/assets/logo-green.png'
import { UPSELL_SPOTIFY } from "@/functions/checkout-spotify";

export default function PaymentErrorPage() {
  return (
    <div className="w-full relative flex items-center justify-center flex-col min-h-screen bg-[#181818] text-white">
      <div className='w-full p-5 min-h-screen flex items-center justify-center'>
        <div className='w-full bg-black rounded-lg p-5 space-y-8'>
          <div className='w-full flex items-center justify-center'>
            <Image src={Logo} className='object-contain' width={100} height={30} alt='logo' priority />
          </div>

          <h2 className="text-center font-bold text-2xl">Ah, não! Seu pagamento não deu certo.</h2>

          <p className="text-[#a8a8a8] text-sm text-center">
            Não se preocupe, clique em <span className="font-bold">tentar novamente</span> e vamos dar continuidade ao pagamento do seu valor de R$ 473,00.
          </p>

          <p className="text-[#a8a8a8] text-sm text-center">Caso já tenha sido cobrado da sua conta, iremos te reembolsar em até 24 horas.</p>



          <div className="w-full flex items-center justify-center">
            <a
              className="w-full max-w-[280px] duration-1000 text-[#01d661] animate-btn bg-[#181818] rounded-3xl h-12 font-bold flex items-center justify-center transition-opacity opacity-100"
              href={UPSELL_SPOTIFY}
            >
              TENTAR NOVAMENTE
            </a>
          </div>



          <p className="text-center text-xs text-[#a8a8a8] pt-10">
            Este site é protegido pelo reCAPTCHA e está sujeito à <b className="text-[#01d661]">Política de Privacidade</b> e aos <b className="text-[#01d661]">Termos de Serviço do Spotify ®.</b>
          </p>

        </div>
      </div>


    </div>
  )
}