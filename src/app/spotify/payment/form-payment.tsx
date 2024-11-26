'use client'

import { FileIcon, Loader2, MailIcon, PhoneIcon } from "lucide-react"
import { useState } from "react";
import { PaymentSchema } from "./types";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { createPayment } from "./actions";
import { InputMask } from '@react-input/mask';
import { useRouter } from "next/navigation";
import { toast } from "sonner";



export function FormPayment({ name, document }: { name: string; document: string }) {

  const form = useForm<z.infer<typeof PaymentSchema>>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      document,
      name
    }
  })

  const { register, handleSubmit } = form

  const [isVisible, setIsVisible] = useState(false)
  const [typeInput, setTypeInput] = useState<React.HTMLInputTypeAttribute | "">("")
  const [pixType, setPixType] = useState<'CPF' | 'EMAIL' | 'PHONE' | ''>('')
  const [mask, setMask] = useState<'___.___.___-__' | '(__) _ ____-____' | undefined>(undefined)


  function changePixKey(key: 'CPF' | 'EMAIL' | 'PHONE') {
    switch (key) {
      case 'CPF':
        setIsVisible(true)
        setTypeInput('tel')
        setPixType('CPF')
        setMask('___.___.___-__')
        form.setValue('pixType', 'CPF')
        form.setValue('pixKey', '')
        break;
      case 'EMAIL':
        setIsVisible(true)
        setTypeInput('email')
        setPixType('EMAIL')
        setMask(undefined)
        form.setValue('pixType', 'EMAIL')
        form.setValue('pixKey', '')
        break;
      case 'PHONE':
        setIsVisible(true)
        setTypeInput('tel')
        setPixType('PHONE')
        setMask('(__) _ ____-____')
        form.setValue('pixType', 'PHONE')
        form.setValue('pixKey', '')
        break;
    }
  }

  const router = useRouter()

  const { execute, isPending } = useAction(createPayment, {
    onSuccess(data) {
      if (data.data?.success) {
        router.push('/spotify/status')
      } else {
        toast.error(data.data?.message)
        router.push('/spotify/status')
      }
    },
  })



  const onSubmit = (values: z.infer<typeof PaymentSchema>) => {
    execute(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, (errors) => console.error(errors))} className="space-y-6">

      <input type="hidden" {...register('pixType')} value={pixType} />

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <button onClick={() => changePixKey('CPF')} type="button" className={`${pixType === 'CPF' ? 'bg-[#01D661]' : 'bg-[#808080]'}  w-28 h-20 rounded-lg flex flex-col items-center justify-center gap-2`}>
            <FileIcon className="size-5" />
            <span className="font-semibold">
              CPF
            </span>
          </button>

          <button onClick={() => changePixKey('EMAIL')} type="button" className={`${pixType === 'EMAIL' ? 'bg-[#01D661]' : 'bg-[#808080]'}  w-28 h-20 rounded-lg flex flex-col items-center justify-center gap-2`}>
            <MailIcon className="size-5" />
            <span className="font-semibold">
              E-mail
            </span>
          </button>

          <button onClick={() => changePixKey('PHONE')} type="button" className={`${pixType === 'PHONE' ? 'bg-[#01D661]' : 'bg-[#808080]'}  w-28 h-20 rounded-lg flex flex-col items-center justify-center gap-2`}>
            <PhoneIcon className="size-5" />
            <span className="font-semibold">
              Telefone
            </span>
          </button>

        </div>
        {form.formState.errors.pixType && (
          <p className="text-xs font-semibold text-center text-red-500">
            {form.formState.errors.pixType.message}
          </p>
        )}
      </div>


      <div className='space-y-2'>
        <input
          type="hidden"
          placeholder="Seu nome aqui"
          className="h-12 bg-[#181818] rounded-lg ring-2 ring-[#A8A8A8] w-full px-4 text-[#A8A8A8] border-none outline-none"
          value={name}
          {...register('name')}
          readOnly
        />
        {form.formState.errors.name && (
          <p className="text-xs font-semibold text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className='space-y-2'>
        <input
          type="hidden"
          placeholder="Seu documento aqui"
          className="h-12 bg-[#181818] rounded-lg ring-2 ring-[#A8A8A8] w-full px-4 text-[#A8A8A8] border-none outline-none"
          value={document}
          {...register('document')}
          readOnly
        />
        {form.formState.errors.document && (
          <p className="text-xs font-semibold text-red-500">
            {form.formState.errors.document.message}
          </p>
        )}
      </div>

      {isVisible && (
        <div className='space-y-2'>
          {mask === undefined ? (
            <input
              type={typeInput}
              placeholder="Digite sua chave PIX"
              className="h-10 bg-[#181818] text-sm rounded-lg ring-1 ring-[#A8A8A8] w-full px-4 text-[#A8A8A8] border-none outline-none"
              {...register('pixKey')}
            />
          ) : (
            <InputMask
              mask={mask}
              replacement={{ _: /\d/ }}
              type={typeInput}
              placeholder="Digite sua chave PIX"
              className="h-10 text-sm bg-[#181818] rounded-lg ring-1 ring-[#A8A8A8] w-full px-4 text-[#A8A8A8] border-none outline-none"
              {...register('pixKey')}
            />
          )}

          {form.formState.errors.pixKey && (
            <p className="text-xs font-semibold text-red-500">
              {form.formState.errors.pixKey.message}
            </p>
          )}
        </div>
      )}

      <button disabled={isPending} type='submit' className="w-full bg-[#01D661] text-black rounded-3xl h-12 font-semibold flex items-center justify-center">
        {isPending && <Loader2 className="size-5 animate-spin mr-2" />}
        Receber saque
      </button>



    </form>
  )
}