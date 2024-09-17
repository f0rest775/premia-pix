'use client'
import { toast } from 'sonner'

import { useState, type FormEvent } from "react"
import { InputMask } from '@react-input/mask'

import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next';


export function LoginForm() {

  const [email, setEmail] = useState<string>("")
  const [document, setDocument] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [name, setName] = useState<string>("")

  const router = useRouter()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()


    if (email.length < 10) {
      toast.info("Insira um e-mail valido.")
      return
    }

    if (!email.includes("@")) {
      toast.info("Insira um e-mail valido.")
      return
    }

    if (password.length < 6) {
      toast.info("Insira uma senha de no minimo 6 digitos.")
      return
    }

    if (name.length < 3) {
      toast.info("Digite seu nome completo.")
      return
    }


    // if (document.replace(/[^0-9]/g, "").length !== 11) {
    //   toast.info("Insira seu telefone correto, os 11 digitos Ex: (00) 0 0000-0000.")
    //   return
    // }

    const data = {
      document,
      email: email.split("@")[0] + "@premiapix.com",
      name
    }

    setCookie('user_data', data, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })

    router.push('/influencers/virginia-fonseca')
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <input
          type="email"
          name="email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail abaixo aqui..."
          className="p-2 rounded-lg ring-1 ring-[#005952] focus:ring-2 outline-none border-0 w-full  h-11"
        />


        <input
          type="text"
          name="name"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome completo"
          className="p-2 rounded-lg ring-1 focus:ring-2 ring-[#005952] outline-none border-0 w-full h-11"
        />

        <InputMask
          mask="___.___.___-__"
          replacement={{ _: /\d/ }}
          type="tel"
          name="document"
          defaultValue={document}
          onChange={(e) => setDocument(e.target.value)}
          placeholder="Digite seu CPF"
          className="p-2 rounded-lg ring-1 focus:ring-2 ring-[#005952] outline-none border-0 w-full  h-11"
        />


        <input
          type="password"
          name="password"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite uma senha segura"
          className="p-2 rounded-lg ring-1 focus:ring-2 ring-[#005952] outline-none border-0 w-full h-11"
        />
      </div>
      <button className="w-full bg-[#005952] h-12 text-center rounded-lg text-white font-medium">
        Cadastrar & Continuar
      </button>
    </form>
  )
}