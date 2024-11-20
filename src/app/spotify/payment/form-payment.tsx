'use client'

import { FileIcon, MailIcon, PhoneIcon } from "lucide-react"
import { useState } from "react";
import { PaymentSchema } from "./types";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";



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


  function changePixKey(key: 'CPF' | 'EMAIL' | 'PHONE') {
    switch (key) {
      case 'CPF':
        setIsVisible(true)
        setTypeInput('tel')
        setPixType('CPF')
        form.setValue('pixType', 'CPF')
        break;
      case 'EMAIL':
        setIsVisible(true)
        setTypeInput('email')
        setPixType('EMAIL')
        form.setValue('pixType', 'EMAIL')
        break;
      case 'PHONE':
        setIsVisible(true)
        setTypeInput('tel')
        setPixType('PHONE')
        form.setValue('pixType', 'PHONE')
        break;
    }
  }



  const onSubmit = (values: z.infer<typeof PaymentSchema>) => {
    //execute(values)

    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, (errors) => console.error(errors))} className="space-y-6">

      <input type="hidden" {...register('pixType')} value={pixType} />


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

      <div className='space-y-2'>
        <input
          type="text"
          placeholder="Seu nome aqui"
          className="h-12 bg-[#181818] rounded-lg ring-2 ring-[#A8A8A8] w-full px-4 text-[#A8A8A8] border-none outline-none"
          value={name}
          {...register('name')}
          readOnly
        />
      </div>

      <div className='space-y-2'>
        <input
          type="text"
          placeholder="Seu documento aqui"
          className="h-12 bg-[#181818] rounded-lg ring-2 ring-[#A8A8A8] w-full px-4 text-[#A8A8A8] border-none outline-none"
          value={document}
          {...register('document')}
          readOnly
        />
      </div>

      {isVisible && (
        <div className='space-y-2'>
          <input
            type={typeInput}
            placeholder="Digite sua chave PIX"
            className="h-12 bg-[#181818] rounded-lg ring-2 ring-[#A8A8A8] w-full px-4 text-[#A8A8A8] border-none outline-none"
            {...register('pixKey')}
          />
        </div>
      )}

      <button type='submit' className="w-full bg-[#01D661] rounded-3xl h-12 font-bold flex items-center justify-center">
        Realizar saque
      </button>



    </form>
  )
}