import { Header } from "@/components/header";
import { Loader } from "lucide-react";
import Image from "next/image";
import Logo from '@/assets/insta-pix-logo.png'
import { getData } from "@/functions/get-cookie";
import { PaymentInfo } from "./payment-info";
import { NumberFromQueue } from "./number-from-queue";
import { env } from "@/lib/env";

export default async function FilaPage() {


  const data = await getData('user_data')

  const user = data ? JSON.parse(data) : null

  const pixKey = await getData('user_pixkey') ?? ''

  return (
    <div>
      <div className="border-b border-zinc-500">
        <div className="w-full h-16 flex items-center justify-between p-5">
          <Image src={Logo} alt="Logo" width={0} height={0} className="w-[180px] h-auto object-contain" />
          <div className="relative border border-[#00bdae] rounded-lg flex items-center gap-1 py-1 px-4 text-black">
            <span className="absolute bg-white -top-2 left-2 px-1 text-[10px] font-semibold text-[#00bdae]">SALDO</span>
            <span className="text-black text-lg font-semibold">
              <span className='text-xs text-black font-semibold'>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(819.99)}</span>
            </span>
          </div>
        </div>
      </div>

      <Header />

      <div className="flex flex-col mt-[20px] p-5 items-center justify-center gap-6">


        <h2 className="text-sm font-medium">Por favor, aguarde. Você logo poderá sacar seu saldo.</h2>

        <div className="rounded-lg bg-[#91E3DC] p-4 w-full flex flex-col items-center gap-6">

          <div className="flex items-center gap-2">
            <Loader className="size-6 animate-spin" />
            <span className="animate-pulse font-semibold">Carregando...</span>
          </div>

          <h2 className="text-lg font-bold">{user ? user.name.split(" ")[0] : "Usuário"}, seu número na fila:</h2>

          <NumberFromQueue />

          <PaymentInfo pixKey={pixKey} />
          <p className="text-sm text-center pt-10">Você poderá sair dessa página sem perder seu lugar na fila, assim que sua vez chegar iremos te notificar via e-mail.</p>
        </div>


        <a href={env.EXTERNAL_URL} target="_blank" className="fixed bottom-0 z-50 mb-6 translate-x-1/2 right-1/2 w-[90%] mt-10 text-center h-12 bg-[#005952] hover:bg-[#005952] text-white rounded-3xl flex items-center justify-center">
          Acessar
        </a>

      </div>



      <div className="text-zinc-600 text-sm text-center">
        2024 &copy; Insta PIX
      </div>

    </div>
  )
}