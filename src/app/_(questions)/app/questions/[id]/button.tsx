'use client'
import { Button } from "@/components/ui/button"
import useSound from 'use-sound';
import Sound from '@/assets/cash.mp3'
import { Loader } from "lucide-react";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { setCookie } from "cookies-next";

interface ButtonLinkProps {
  nextPage: string
  question: string
}

export function ButtonLink({ nextPage, question }: ButtonLinkProps) {
  const router = useRouter()


  const [play] = useSound(Sound);

  const [loading, setLoading] = useState(false)


  async function handleNewPageYes() {
    play()

    setCookie(`question_${question}`, true, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });



    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000));

    router.push(`/${nextPage}`)

  }

  async function handleNewPageNot() {
    play()

    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000));

    router.push(`/${nextPage}`)

  }


  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/90">
          <div className="w-full h-screen flex justify-center items-center">
            <Loader className="size-6 animate-spin text-white mr-2" />
            <span className="text-white text-sm">Avaliação sendo processada...</span>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between gap-10">
        <Button onClick={handleNewPageNot} className="bg-[#8B0101] hover:bg-[#8B0101] w-full h-10">
          Não
        </Button>
        <Button onClick={handleNewPageYes} className="bg-[#26C50C] hover:bg-[#26C50C] w-full h-10">
          Sim
        </Button>
      </div>
    </>
  )
}