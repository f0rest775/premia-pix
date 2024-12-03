'use client'
import { QRCodeCanvas } from 'qrcode.react'



export function QrCode({ brCode }: { brCode: string }) {
  return (
    <div className='w-full flex items-center justify-center'>
      <div className="w-[180px] h-[180px] bg-white flex items-center justify-center rounded-lg">
        <QRCodeCanvas value={brCode} size={150} />
      </div>
    </div>
  )
}