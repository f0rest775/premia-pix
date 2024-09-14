'use client'
import { toast } from 'sonner'

import { useState, type FormEvent } from "react"
import { InputMask } from '@react-input/mask'

import { useRouter } from 'next/navigation'


export function LoginForm() {

  const [email, setEmail] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")

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

    if (name.length < 3) {
      toast.info("Insira seu nome completo.")
      return
    }

    if (!name.split(" ")[1]) {
      toast.info("Insira seu nome completo.")
      return
    }

    if (phone.replace(/[^0-9]/g, "").length !== 11) {
      toast.info("Insira seu telefone correto, os 11 digitos Ex: (00) 0 0000-0000.")
      return
    }

    localStorage.setItem("name", name)
    localStorage.setItem("email", email.split("@")[0] + "@premiapix.com")
    localStorage.setItem("phone", phone.replace(/[^0-9]/g, ""))

    router.push('/influencers/virginia-fonseca')

  }


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome completo aqui..."
          className="p-2 rounded-lg ring-1 focus:ring-2 ring-[#005952] outline-none border-0 w-full text-sm h-10"
        />
        <input
          type="email"
          name="email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail abaixo aqui..."
          className="p-2 rounded-lg ring-1 ring-[#005952] focus:ring-2 outline-none border-0 w-full text-sm h-10"
        />
        <InputMask
          mask="(__) _____-____"
          replacement={{ _: /\d/ }}
          type="tel"
          name="phone"
          defaultValue={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Digite seu WhatsApp..."
          className="p-2 rounded-lg ring-1 focus:ring-2 ring-[#005952] outline-none border-0 w-full text-sm h-10"
        />
      </div>
      <button className="w-full bg-[#005952] h-12 text-center rounded-lg text-white font-medium">
        Cadastrar & Continuar
      </button>
    </form>
  )
}