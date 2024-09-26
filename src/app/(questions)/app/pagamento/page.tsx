import { FormPayment } from "./form-payment";
import { NewHeader } from "@/components/new-header";

export default function PagamentoPage() {

  return (
    <>
      <NewHeader amount={2819.99} />

      <div className="flex flex-col mt-[20px] p-5">
        <div className='bg-white rounded-lg flex items-center justify-center gap-1 p-4 shadow-xl'>
          <span className='font-bold text-black'>Realize agora seu saque de {" "} {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(2819.99))}</span>
        </div>

        <div className='flex items-center justify-center mt-4'>
          <p className='text-xs font-semibold text-zinc-900'>Selecione seu banco abaixo:</p>
        </div>


        <FormPayment />


      </div>

      <div className="text-zinc-600 text-sm text-center">
        2024 &copy; Insta PIX
      </div>

    </>
  )
}