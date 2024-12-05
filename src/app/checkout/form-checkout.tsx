'use client'

import { InputMask } from '@react-input/mask';
import { useForm } from 'react-hook-form';
import { FormSchema } from './types';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useAction } from 'next-safe-action/hooks';
import { createSale } from './actions';
import { CreditCard, Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Saque from '@/assets/saque.png'


export function FormCheckout() {

  const params = useSearchParams()

  const [document] = useState<string>(params.get('document') ?? '')
  const [name] = useState<string>(params.get('name') ?? '')
  const [email] = useState<string>(params.get('email') ?? '')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      document,
      name,
      email
    }
  })

  const router = useRouter()

  const { execute, isPending } = useAction(createSale, {
    onSuccess(data) {
      if (data.data?.success === true && data.data.data?.saleId) {
        router.push(`/pay/${data.data.data.saleId}`)
      } else {
        toast(data.data?.message)
      }
    },
  })


  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    execute(values)
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">

      <div className='bg-white rounded-lg p-6 space-y-2 relative'>

        <div className='absolute -top-3 left-7 rounded-2xl font-semibold text-white px-2 py-0.5 bg-[#1c7069]/60'>
          <div className='size-8 -left-4 -top-1 absolute rounded-full flex items-center justify-center text-white bg-[#1c7069]'>
            1
          </div>
          <h2 className='ml-3 text-sm'>DADOS PESSOAIS</h2>
        </div>

        <div className='space-y-1'>
          <label htmlFor="name" className='text-xs font-medium text-[#545454]'>NOME COMPLETO</label>
          <input
            type="text"
            {...register("name")}
            className="px-2 rounded-lg ring-1 focus:ring-2 ring-[#1c7069] outline-none border-0 w-full  h-10"
            placeholder="Nome completo"
          />
          {errors.name && (
            <p className="text-[11px] leading-3 font-semibold text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className='space-y-1'>

          <label htmlFor="email" className='text-xs font-medium text-[#545454]'>EMAIL</label>
          <input
            type="email"
            {...register("email")}
            className="px-2 rounded-lg ring-1 focus:ring-2 ring-[#1c7069] outline-none border-0 w-full  h-10"
            placeholder="Seu e-mail..."
          />
          {errors.email && (
            <p className="text-[11px] leading-3 font-semibold text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

      </div>

      <div className='bg-white rounded-lg p-6 space-y-2 relative'>

        <div className='absolute -top-3 left-7 rounded-2xl font-semibold text-white px-2 py-0.5 bg-[#1c7069]/60'>
          <div className='size-8 -left-4 -top-1 absolute rounded-full flex items-center justify-center text-white bg-[#1c7069]'>
            2
          </div>
          <h2 className='ml-3 text-sm'>PAGAMENTO</h2>
        </div>


        <div className='grid grid-cols-2 gap-4'>
          <button type='button' className='border-2 border-[#1c7069] rounded-lg flex flex-col gap-1 justify-start p-2 text-[#1c7069]'>
            <svg className='size-4' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
              <path fill="#1c7069" d="M11.9,12h-0.68l8.04-8.04c2.62-2.61,6.86-2.61,9.48,0L36.78,12H36.1c-1.6,0-3.11,0.62-4.24,1.76	l-6.8,6.77c-0.59,0.59-1.53,0.59-2.12,0l-6.8-6.77C15.01,12.62,13.5,12,11.9,12z"></path><path fill="#1c7069" d="M36.1,36h0.68l-8.04,8.04c-2.62,2.61-6.86,2.61-9.48,0L11.22,36h0.68c1.6,0,3.11-0.62,4.24-1.76	l6.8-6.77c0.59-0.59,1.53-0.59,2.12,0l6.8,6.77C32.99,35.38,34.5,36,36.1,36z"></path><path fill="#1c7069" d="M44.04,28.74L38.78,34H36.1c-1.07,0-2.07-0.42-2.83-1.17l-6.8-6.78c-1.36-1.36-3.58-1.36-4.94,0	l-6.8,6.78C13.97,33.58,12.97,34,11.9,34H9.22l-5.26-5.26c-2.61-2.62-2.61-6.86,0-9.48L9.22,14h2.68c1.07,0,2.07,0.42,2.83,1.17	l6.8,6.78c0.68,0.68,1.58,1.02,2.47,1.02s1.79-0.34,2.47-1.02l6.8-6.78C34.03,14.42,35.03,14,36.1,14h2.68l5.26,5.26	C46.65,21.88,46.65,26.12,44.04,28.74z"></path>
            </svg>
            <span className='text-xs'>
              PIX
            </span>
          </button>
          <button type='button' className='border-2 rounded-lg flex flex-col justify-start gap-1 p-2 text-[#545454]'>
            <CreditCard className='size-4 text-[#545454]' />
            <span className='text-xs'>
              Cartão
            </span>
          </button>
        </div>



        <div className='space-y-1'>
          <label htmlFor="document" className='text-xs font-medium text-[#545454]'>CPF</label>
          <InputMask
            mask="___.___.___-__"
            {...register("document")}
            replacement={{ _: /\d/ }}
            type="tel"
            name="document"
            placeholder="Digite seu CPF"
            className="px-2 rounded-lg ring-1 focus:ring-2 ring-[#1c7069] outline-none border-0 w-full  h-10"
          />
          {errors.document && (
            <p className="text-[11px] leading-3 font-semibold text-red-500">
              {errors.document.message}
            </p>
          )}
        </div>

      </div>

      <div className='bg-white rounded-lg p-6 space-y-4 relative'>

        <div className='absolute -top-3 left-7 rounded-2xl font-semibold text-white px-2 py-0.5 bg-[#1c7069]/60'>
          <div className='size-8 -left-4 -top-1 absolute rounded-full flex items-center justify-center text-white bg-[#1c7069]'>
            3
          </div>
          <h2 className='ml-3 text-sm'>LEVE JUNTO</h2>
        </div>


        <div className='border flex flex-col gap-2 border-dashed rounded-lg p-3 border-[#1c7069]'>
          <div className='flex gap-4'>

            <Image src={Saque} className='rounded-lg' width={70} height={70} alt='saque' />

            <div className='flex flex-col gap-1 w-full'>
              <div className='flex items-center justify-between'>
                <span className='font-medium text-sm'>Saque imediato</span>

                <input type="checkbox" {...register("orderBump")} />
              </div>
              <p className='text-xs font-light'>
                Adicionar saque imediato. Liberação em 1 minuto.
              </p>
            </div>
          </div>

          <div className='flex items-center justify-between'>

            <p className='text-xs font-medium text-[#1c7069]'>Total</p>
            <p className='text-xs font-medium text-[#1c7069]'>Por apenas R$ 9,99</p>

          </div>



        </div>

      </div>






      <button className="w-full bg-[#1c7069] h-12 text-center rounded-3xl flex items-center justify-center text-white font-medium" disabled={isPending}>
        {isPending ? (
          <Loader className="size-4 animate-spin" />

        ) : (
          <span>
            Receber PIX
          </span>
        )}
      </button>

      <div className='bg-white rounded-lg p-6 space-y-4 relative'>

        <div className='absolute -top-3 left-7 rounded-2xl font-semibold text-white px-2 py-0.5 bg-[#1c7069]'>
          <h2 className='text-sm'>RESUMO</h2>
        </div>

        <div className="space-y-2">
          <div className="border-b pb-1">
            <p className="text-xs">Valor:</p>
            <p className="text-xs">R$ 214,99</p>
          </div>
          <div className="border-b pb-1">
            <p className="text-xs">Desconto:</p>
            <p className="text-xs">-R$ 195,00 (91% OFF)</p>
          </div>
          <div className={`${watch("orderBump") === true ? 'border-b pb-1' : ''}`}>
            <p className="text-xs">Valor Total:</p>
            <p className="text-xs">R$ 19,99</p>
          </div>

          {watch("orderBump") === true && (
            <div>
              <p className="text-xs">Saque imediato:</p>
              <p className="text-xs">R$ 9,99</p>
            </div>
          )}


        </div>

      </div>


    </form>
  )
}