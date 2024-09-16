import Image from "next/image";
import Logo from "@/assets/logo.png"
import { LoginForm } from "./login-form";
import { redirect } from "next/navigation";
import { hasCookieT } from "@/functions/get-cookie";

export default async function Home() {

  const cookie = await hasCookieT('user_set_payment')

  if (cookie) {
    redirect('/pagamento')
  }


  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10 p-5">
      <Image src={Logo} alt="Logo" width={0} height={0} className="w-[250px] h-full object-contain" />

      <div className="space-y-10">

        <div className="flex items-center justify-center bg-[#bdeeea] p-4 rounded-lg shadow-2xl">
          <p className="text-sm font-medium text-center">
            Você ganhou uma licença gratuita para testar nosso
            app cadastre seu e-mail abaixo e ganhe até
            R$ 819,00 agora.
          </p>
        </div>

        <LoginForm />

      </div>

      <div className="text-zinc-600 text-sm">
        2024 &copy; Premia PIX
      </div>
    </div>
  );
}
