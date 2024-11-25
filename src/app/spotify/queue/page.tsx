import Image from "next/image";
import Logo from '@/assets/logo-green.png'
import { Loader } from "lucide-react";
import { NumberFromQueue } from "@/app/_fila/number-from-queue";
import { PaymentInfo } from "@/app/_fila/payment-info";
import { cookies } from "next/headers";

export default function PageFila() {


  const name = cookies().get('user_name')
  const pixKey = cookies().get('user_pix_key')


  return (
    <div className="w-full relative min-h-screen bg-[#181818] text-white">
      <div className="sticky z-50 top-0 left-0 right-0 h-16 bg-black flex items-center justify-between p-5">
        <Image src={Logo} className='object-contain' width={100} height={30} alt='logo' priority />

        <div className='bg-[#01D661] rounded-2xl flex items-center gap-1 p-2 text-black'>
          <span className='text-sm font-semibold'>Saldo: </span>
          <span className='text-sm font-semibold'>{new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(473)}</span>
        </div>

      </div>

      <div className='w-full p-5'>
        <div className='w-full bg-black rounded-lg p-5 space-y-8'>

          <h2 className="text-sm font-medium text-center">Por favor, aguarde. Você logo poderá sacar seu saldo.</h2>

          <div className="p-4 w-full flex flex-col items-center gap-6">

            <div className="flex items-center gap-2">
              <Loader className="size-6 animate-spin" />
              <span className="animate-pulse font-semibold">Carregando...</span>
            </div>

            <h2 className="text-lg font-bold">{name?.value ? name.value.split(" ")[0] : "Usuário"}, seu número na fila:</h2>

            <NumberFromQueue />
            <div className="text-black w-full">
              <PaymentInfo pixKey={pixKey?.value ?? ''} />
            </div>

            <p className="text-sm text-center pt-10">Você poderá sair dessa página sem perder seu lugar na fila, assim que sua vez chegar iremos te notificar via e-mail.</p>
          </div>


          <p className="text-center text-xs text-[#a8a8a8] pt-10">
            Este site é protegido pelo reCAPTCHA e está sujeito à <b className="text-[#01d661]">Política de Privacidade</b> e aos <b className="text-[#01d661]">Termos de Serviço do Spotify ®.</b>
          </p>

        </div>
      </div>
    </div>
  )
}