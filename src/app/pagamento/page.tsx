import Image from "next/image";
import Logo from '@/assets/logo.png'
import { FormPayment } from "./form-payment";
import { CircleDollarSign } from "lucide-react";

export default function PagamentoPage() {

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

      <div className="flex flex-col mt-[40px] p-5">
        <div className='bg-white rounded-lg flex items-center justify-center gap-1 p-4 shadow-xl'>
          <span className='font-bold text-black'>Realize agora seu saque de {" "} {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(819.99))}</span>
        </div>

        <div className='flex items-center justify-center mt-4'>
          <p className='text-xs font-semibold text-zinc-900'>Selecione seu banco abaixo:</p>
        </div>


        <FormPayment />


      </div>

      <div className="text-zinc-600 text-sm text-center">
        2024 &copy; Premia PIX
      </div>

    </>
  )
}