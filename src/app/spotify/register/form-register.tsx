'use client'

import { InputMask } from '@react-input/mask';

import { useForm } from 'react-hook-form'
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterAccountSchema } from './types';
import { useAction } from 'next-safe-action/hooks'
import { registerAccount } from './actions';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';


export function FormRegister() {

  const form = useForm<z.infer<typeof RegisterAccountSchema>>({
    resolver: zodResolver(RegisterAccountSchema),
  })

  const { register, handleSubmit } = form

  const router = useRouter()

  const { execute, isPending } = useAction(registerAccount, {
    onSuccess(data) {
      if (data.data?.success) {
        router.push('/spotify/music/1okn8NTTHVQuP4hghJi2Ec')
      }
    },
  })

  const onSubmit = (values: z.infer<typeof RegisterAccountSchema>) => {
    execute(values)
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div className='space-y-2'>
        <input
          type="text"
          placeholder="Nome"
          className="h-12 bg-[#181818] rounded-lg ring-2 ring-[#A8A8A8] w-full px-4 text-[#A8A8A8] border-none outline-none"
          {...register("name")}
        />
        {form.formState.errors.name && (
          <p className="text-xs font-semibold text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>
      <div className='space-y-2'>
        <input
          type="email"
          placeholder="Seu melhor e-mail aqui"
          className="h-12 bg-[#181818] rounded-lg ring-2 ring-[#A8A8A8] w-full px-4 text-[#A8A8A8] border-none outline-none"
          {...register("email")}
        />
        {form.formState.errors.email && (
          <p className="text-xs font-semibold text-red-500">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className='space-y-2'>
        <InputMask
          mask="___.___.___-__"
          replacement={{ _: /\d/ }}
          type="tel"
          placeholder="Digite seu CPF"
          className="h-12 bg-[#181818] rounded-lg ring-2 ring-[#A8A8A8] w-full px-4 text-[#A8A8A8] border-none outline-none"
          {...register("document")}
        />
        {form.formState.errors.document && (
          <p className="text-xs font-semibold text-red-500">
            {form.formState.errors.document.message}
          </p>
        )}
      </div>

      <button disabled={isPending} type='submit' className="w-full bg-[#01D661] rounded-3xl h-12 font-bold flex items-center justify-center">

        {isPending && <Loader2 className='size-5 animate-spin mr-2' />}

        Cadastrar e ganhar
      </button>


    </form>
  )
}