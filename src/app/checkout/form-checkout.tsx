'use client'

import { InputMask } from '@react-input/mask';
import { useForm } from 'react-hook-form';
import { FormSchema } from './types';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useAction } from 'next-safe-action/hooks';
import { createSale } from './actions';
import { Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';


export function FormCheckout() {

  const params = useSearchParams()

  const [document] = useState<string>(params.get('document') ?? '')
  const [name] = useState<string>(params.get('name') ?? '')
  const [email] = useState<string>(params.get('email') ?? '')

  const {
    register,
    handleSubmit,
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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <div className='space-y-1'>

        <input
          type="email"
          {...register("email")}
          className="p-2 rounded-lg ring-1 focus:ring-2 ring-[#1c7069] outline-none border-0 w-full  h-11"
          placeholder="Seu e-mail..."
        />
        {errors.email && (
          <p className="text-[11px] leading-3 font-semibold text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className='space-y-1'>
        <input
          type="text"
          {...register("name")}
          className="p-2 rounded-lg ring-1 focus:ring-2 ring-[#1c7069] outline-none border-0 w-full  h-11"
          placeholder="Nome e sobrenome"
        />
        {errors.name && (
          <p className="text-[11px] leading-3 font-semibold text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className='space-y-1'>
        <InputMask
          mask="___.___.___-__"
          {...register("document")}
          replacement={{ _: /\d/ }}
          type="tel"
          name="document"
          placeholder="Digite seu CPF"
          className="p-2 rounded-lg ring-1 focus:ring-2 ring-[#1c7069] outline-none border-0 w-full  h-11"
        />
        {errors.document && (
          <p className="text-[11px] leading-3 font-semibold text-red-500">
            {errors.document.message}
          </p>
        )}
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
    </form>
  )
}