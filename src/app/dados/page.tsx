import Image from "next/image";
import Logo from "@/assets/insta-pix-logo.png";
import { Dados } from "./dados";
import { hasCookieT } from "@/functions/get-cookie";
import { redirect } from "next/navigation";
import BC from '@/assets/bc.png'

export default async function DadosPage() {

  const cookie = await hasCookieT('user_set_payment')

  if (cookie) {
    redirect('/pagamento')
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10 p-5">
      <Image src={Logo} alt="Logo" width={0} height={0} className="w-[250px] h-full object-contain" />

      <div className="space-y-10 bg-white p-6 rounded-lg">
        <Dados />
      </div>

      <div className="flex items-center justify-center flex-col pt-16 select-none space-y-1">
        <p className="text-sm text-white">
          Segurança pelo:
        </p>

        <Image src={BC} alt="bc" width={0} height={0} className="w-[200px] h-auto" />
      </div>
    </div>
  )
}