'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import Sound from '@/assets/cash.mp3'
import useSound from "use-sound"

interface SettingsProps {
  question_one: string
  question_two: string
  next_page: string
}


export function Settings({ question_one, question_two, next_page }: SettingsProps) {

  const [questionOne, setQuestionOne] = useState<'yes' | 'not' | null>(null)
  const [questionSecondary, setQuestionSecondary] = useState<'yes' | 'not' | null>(null)

  const router = useRouter()
  const [play] = useSound(Sound);



  function toNextPage() {
    if (questionOne === null || questionSecondary === null) {
      toast.error('Responda as perguntas abaixo para continuar.')

      return
    }

    play()

    if (next_page.startsWith('/')) {
      router.push(next_page)
    } else {
      router.push(`/spotify/music/${next_page}`)
    }




  }


  return (
    <div className='flex flex-col gap-8'>
      <div className='space-y-4'>
        <p className='text-white text-lg font-semibold text-center'>{question_one}</p>
        <div className='flex items-center gap-4'>
          <button onClick={() => setQuestionOne('not')} className={`h-10 w-full rounded-lg ${questionOne === 'not' ? 'bg-[#01d661]' : 'bg-[#8d8d8d]'} `}>Não</button>
          <button onClick={() => setQuestionOne('yes')} className={`h-10 w-full rounded-lg ${questionOne === 'yes' ? 'bg-[#01d661]' : 'bg-[#8d8d8d]'} `}>Sim</button>
        </div>
      </div>

      <div className='space-y-4'>
        <p className='text-white text-lg font-semibold text-center'>{question_two}</p>
        <div className='flex items-center gap-4'>
          <button onClick={() => setQuestionSecondary('not')} className={`h-10 w-full rounded-lg ${questionSecondary === 'not' ? 'bg-[#01d661]' : 'bg-[#8d8d8d]'} `}>Não</button>
          <button onClick={() => setQuestionSecondary('yes')} className={`h-10 w-full rounded-lg ${questionSecondary === 'yes' ? 'bg-[#01d661]' : 'bg-[#8d8d8d]'} `}>Sim</button>
        </div>
      </div>

      <button onClick={toNextPage} className='bg-[#01D661] rounded-3xl text-black font-bold h-12 mt-10' >
        Avaliar próxima música
      </button>
    </div>
  )
}