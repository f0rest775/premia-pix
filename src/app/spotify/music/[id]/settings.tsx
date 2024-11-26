'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import Sound from '@/assets/cash.mp3'
import useSound from "use-sound"

interface SettingsProps {
  question_one: string
  question_two: string
  next_page: string
  button_name: string
}

export function Settings({
  question_one,
  question_two,
  next_page,
  button_name
}: SettingsProps) {
  const [questionOne, setQuestionOne] = useState<'yes' | 'not' | null>(null)
  const [questionSecondary, setQuestionSecondary] = useState<'yes' | 'not' | null>(null)
  const [buttonRedirect, setButtonRedirect] = useState(false)

  const router = useRouter()
  const [play] = useSound(Sound);

  useEffect(() => {
    if (questionOne !== null && questionSecondary !== null) {
      setButtonRedirect(true)
    }
  }, [questionOne, questionSecondary])

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
    <div className='flex relative flex-col gap-4'>
      <div className='space-y-4'>
        <p className='text-white text-sm font-semibold text-center'>{question_one}</p>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => setQuestionOne('not')}
            className={`h-8 w-full text-sm text-black rounded-lg ${questionOne === 'not' ? 'bg-[#01d661]' : 'bg-[#8d8d8d]'}`}
          >
            Não
          </button>
          <button
            onClick={() => setQuestionOne('yes')}
            className={`h-8 w-full text-sm text-black rounded-lg ${questionOne === 'yes' ? 'bg-[#01d661]' : 'bg-[#8d8d8d]'}`}
          >
            Sim
          </button>
        </div>
      </div>

      <div className='space-y-4'>
        <p className='text-white text-sm font-semibold text-center'>{question_two}</p>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => setQuestionSecondary('not')}
            className={`h-8 w-full text-sm text-black rounded-lg ${questionSecondary === 'not' ? 'bg-[#01d661]' : 'bg-[#8d8d8d]'}`}
          >
            Não
          </button>
          <button
            onClick={() => setQuestionSecondary('yes')}
            className={`h-8 w-full text-sm text-black rounded-lg ${questionSecondary === 'yes' ? 'bg-[#01d661]' : 'bg-[#8d8d8d]'}`}
          >
            Sim
          </button>
        </div>
      </div>

      <button
        onClick={toNextPage}
        className={`rounded-3xl text-black font-semibold h-12 mt-4 ${!buttonRedirect ? 'bg-[#8d8d8d]' : 'bg-[#01D661]'}`}
        disabled={!buttonRedirect}
      >
        {buttonRedirect ? button_name : 'De play e faça um feedback'}
      </button>
    </div>
  )
}