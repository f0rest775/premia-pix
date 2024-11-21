import Logo from '@/assets/logo-green.png'
import Image from 'next/image'
import { Settings } from './settings'
import { API_SPOTIFY } from '@/functions/spotify'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

interface MusicProps {
  params: {
    id: string
  }
}

export default function MusicPage({ params }: MusicProps) {

  const music = API_SPOTIFY.find((m) => m.id === params.id)
  const name = cookies().get('user_name')

  if (!music) {
    redirect('/spotify/music/1okn8NTTHVQuP4hghJi2Ec')
  }

  if (!name) {
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
          }).format(music.balance)}</span>
        </div>

      </div>

      <div className='w-full p-5'>
        <div className='w-full bg-black rounded-lg p-5 space-y-8'>
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold text-center'>Olá, {name?.value.toUpperCase().split(" ")[0]}!</h2>
            <p className='text-[#8d8d8d] text-center text-sm'>Escute a música abaixo e <span className='text-white font-bold'>ganhe por isso!</span></p>
          </div>

          {
            music.earnings > 0 && (
              <div className='text-center bg-[#01d661]/40 border border-[#01D661] p-4 rounded-lg text-white/90'>
                Você ganhou <span className='text-sm font-bold text-white'>{new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(music.earnings)}
                </span>
                {" "}por avaliar!
              </div>
            )
          }


          <div>
            <iframe style={{ borderRadius: '12px' }} src={`https://open.spotify.com/embed/track/${music.id}?utm_source=generator&theme=0`} width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          </div>

          <Settings question_one={music.question_one} question_two={music.question_two} next_page={music.next_page} />


          <p className="text-center text-[#a8a8a8] pt-10">
            Este site é protegido pelo reCAPTCHA e está sujeito à <b className="text-[#01d661]">Política de Privacidade</b> e aos <b className="text-[#01d661]">Termos de Serviço do Google.</b>
          </p>

        </div>
      </div>




    </div>
  )
}