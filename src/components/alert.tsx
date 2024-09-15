'use client'

import Image from 'next/image';
import { useEffect } from 'react';
import { toast } from 'sonner';
import Pix from '@/assets/icon-pix.png'

export function Alert() {
  useEffect(() => {
    toast(
      <div className='flex items-center gap-3'>
        <Image src={Pix} alt="bank" className='w-[30px] h-auto object-cover' width={0} height={0} priority />
        <div className='space-y-0'>
          <p className='text-black tracking-wide leading-4 font-medium'>Você avaliou a publicação e ganhou {" "}

            {
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(Number(136.66))
            }
            .
          </p>
        </div>
      </div>,
      {
        className: 'bg-white p-4 rounded-xl',
      }
    );
  }, [])

  return <></>
}