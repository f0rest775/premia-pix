'use client'

import { Check, Dot, Loader2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Details() {
  const [steps, setSteps] = useState([
    { isVisible: false, isCompleted: false },
    { isVisible: false, isCompleted: false },
    { isVisible: false, isCompleted: false },
    { isVisible: false, isCompleted: false },
    { isVisible: false, isCompleted: false }
  ])
  const [showLink, setShowLink] = useState(false)

  useEffect(() => {
    steps.forEach((_, index) => {
      setTimeout(() => {
        setSteps(prev => prev.map((step, i) =>
          i === index ? { ...step, isVisible: true } : step
        ))
      }, index * 2000)


      setTimeout(() => {
        setSteps(prev => prev.map((step, i) =>
          i === index ? { ...step, isCompleted: true } : step
        ))


        if (index === steps.length - 1) {
          setTimeout(() => {
            setShowLink(true)
          }, 500)
        }
      }, (index * 2000) + 1500)
    })
  }, [])

  const verificationSteps = [
    {
      text: "Verificando sua chave PIX",
      singleLine: true
    },
    {
      text: "Validando chave com Banco Central",
      singleLine: false
    },
    {
      text: "Enviando valor de validação será R$ 0,01 até R$ 2,00",
      singleLine: false
    },
    {
      text: "Valor enviado com sucesso",
      singleLine: true
    },
    {
      text: "Clique em continuar para receber",
      singleLine: true
    }
  ]

  return (
    <>
      <div className="space-y-4">
        {verificationSteps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center justify-between transition-opacity duration-500 ${steps[index].isVisible ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div className="flex items-center">
              <Dot className="size-10 mr-1" />
              <span className="text-sm">
                {step.singleLine ? (
                  step.text
                ) : (
                  <>
                    {step.text.split(' ').slice(0, 2).join(' ')}
                    <br />
                    {step.text.split(' ').slice(2).join(' ')}
                  </>
                )}
              </span>
            </div>
            {steps[index].isVisible && (
              steps[index].isCompleted ? (
                <Check className="size-5 ml-2 text-[#01D661]" />
              ) : (
                <Loader2 className="size-5 ml-2 animate-spin text-[#01D661]" />
              )
            )}
          </div>
        ))}
      </div>

      {showLink && (
        <Link
          className="w-full text-black bg-[#01D661] rounded-3xl h-12 font-bold flex items-center justify-center transition-opacity duration-500 opacity-100"
          href="/spotify/gift"
        >
          CONTINUAR & RECEBER
        </Link>
      )}
    </>
  )
}