import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function StatusPage() {

  return (
    <div className="w-full flex items-center justify-center flex-col min-h-screen bg-[#01D661] text-white space-y-6">

      <div className="space-y-8 flex flex-col justify-center items-center">
        <CheckCircle className="size-36 text-black" />

        <h2 className="text-black font-semibold text-2xl text-center">PIX cadastrado!</h2>
      </div>

      <p className="text-sm text-[#181818] text-center">Você recebeu o seu saque teste de <span className="font-semibold">R$ 0,01 CENTAVO</span> em nome de <span className="font-semibold">"PAGPIX"</span>. Verifique suas notificações ou extrato bancário!</p>


      <p className="text-sm text-[#181818] text-center">Agora basta <span className="font-semibold">realizar</span> seu <span className="font-semibold">1° saque!</span></p>


      <div className="w-full flex items-center justify-center">
        <Link
          className="w-full max-w-[300px] duration-1000 text-white animate-btn bg-[#181818] rounded-3xl h-12 font-bold flex items-center justify-center transition-opacity opacity-100"
          href="/spotify/checkout"
        >
          CONTINUAR & RECEBER
        </Link>
      </div>
    </div>
  )
}