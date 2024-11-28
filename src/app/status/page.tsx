import { CheckCircle } from "lucide-react";
import { ButtonCheckout } from "./button-checkout";

export default function StatusPage() {
  return (
    <div className="w-full flex items-center justify-center flex-col min-h-screen text-white space-y-6 p-5">

      <div className="space-y-8 flex flex-col justify-center items-center">
        <CheckCircle className="size-36 text-black" />

        <h2 className="text-black font-semibold text-2xl text-center">Chave <span className="font-bold">PIX</span> cadastrada com sucesso!</h2>
      </div>

      <p className="text-sm text-[#181818] text-center">
        Após a confirmação do pagamento da taxa anti-fraude você receberá o valor de <span className="font-semibold">R$ 819,99</span> imediatamente em sua conta!
      </p>


      <p className="text-sm text-[#181818] text-center">Agora basta <span className="font-semibold">realizar</span> seu <span className="font-semibold">1° saque!</span><br /> Clique no botão abaixo.</p>


      <ButtonCheckout />
    </div>
  )
}