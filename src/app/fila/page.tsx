import { Header } from "@/components/header";
import { CircleDollarSign } from "lucide-react";
import Image from "next/image";
import Logo from '@/assets/insta-pix-logo.png'
import { getData } from "@/functions/get-cookie";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./progress-bar";
import { PaymentInfo } from "./payment-info";
import { setCookie } from "cookies-next";
import { NumberFromQueue } from "./number-from-queue";

export default async function FilaPage() {


  const data = await getData('user_data')

  const user = data ? JSON.parse(data) : null




  return (
    <>
      <div className="border-b border-zinc-500">
        <div className="w-full h-16 flex items-center justify-between p-5">
          <Image src={Logo} alt="Logo" width={0} height={0} className="w-[180px] h-auto object-contain" />
          <div>
            <p className="text-[10px] font-bold text-center">Saldo a receber</p>
            <div className="bg-[#00bdae] rounded-lg py-1 px-4 text-center font-semibold text-sm flex items-center">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(819.99)}

              <CircleDollarSign className="ml-2 size-4" />
            </div>
          </div>
        </div>
      </div>

      <Header />

      <div className="flex flex-col mt-[20px] p-5 items-center justify-center gap-6">

        <h2 className="text-sm font-medium">Por favor, aguarde. Você logo poderá sacar seu saldo.</h2>

        <div className="rounded-lg bg-[#91E3DC] p-4 w-full flex flex-col items-center gap-6">

          <ProgressBar />

          <h2 className="text-lg font-bold">{user ? user.name.split(" ")[0] : "Usuário"}, seu número na fila:</h2>

          <NumberFromQueue />

          <PaymentInfo />
          <p className="text-sm text-center pt-10">Você poderá sair dessa página sem perder seu lugar na fila, assim que sua vez chegar iremos te notificar via e-mail.</p>
        </div>

        <a href="https://t.me/instapixofc" target="_blank" className="w-full mt-10 h-12 bg-[#005952] hover:bg-[#005952] text-white rounded-lg flex items-center justify-center">
          Entrar no grupo do Telegram
        </a>
      </div>



      <div className="text-zinc-600 text-sm text-center">
        2024 &copy; Insta PIX
      </div>

    </>
  )
}