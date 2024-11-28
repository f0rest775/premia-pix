import Image from "next/image";
import Logo from "@/assets/insta-pix-logo.png"
import { redirect } from "next/navigation";
import { hasCookieT } from "@/functions/get-cookie";
import { LoginForm } from "./login-form";
import BC from '@/assets/bc.png'

export default async function OrboringPage() {

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
            app, cadastre seu e-mail abaixo e ganhe até
            R$ 1.519,99 agora.
          </p>
        </div>

        <LoginForm />

      </div>

      <div className="flex items-center justify-center flex-col pt-16 select-none space-y-1">
        <p className="text-sm text-white">
          Segurança pelo:
        </p>

        <Image src={BC} alt="bc" width={0} height={0} className="w-[200px] h-auto" />
      </div>
    </div>
  );
}
