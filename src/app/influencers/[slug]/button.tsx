'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button"
import Sound from '@/assets/cash.mp3'
import { useRef } from "react";

interface ButtonLinkProps {
  nextPage: string
}

export function ButtonLink({ nextPage }: ButtonLinkProps) {



  var audio = new Audio(Sound);
  const audioPlayer = useRef(audio);



  return (
    <div className="flex items-center justify-between gap-10">
      <Button onClick={() => audioPlayer.current.play()} asChild className="bg-[#8B0101] hover:bg-[#8B0101] w-full h-10">
        <Link href={`/${nextPage}`}>
          Não
        </Link>
      </Button>
      <Button onClick={() => audioPlayer.current.play()} asChild className="bg-[#26C50C] hover:bg-[#26C50C] w-full h-10">
        <Link href={`/${nextPage}`}>
          Sim
        </Link>
      </Button>
    </div>
  )
}