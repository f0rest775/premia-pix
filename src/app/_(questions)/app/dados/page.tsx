import Image from "next/image";
import Logo from "@/assets/insta-pix-logo.png";
import { Dados } from "./dados";
import { hasCookieT } from "@/functions/get-cookie";
import { redirect } from "next/navigation";

export default async function DadosPage() {

  const cookie = await hasCookieT('user_set_payment')

  if (cookie) {
    redirect('/app/pagamento')
  }



  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10 p-5">
      <Image src={Logo} alt="Logo" width={0} height={0} className="w-[250px] h-full object-contain" />

      <div className="space-y-10 bg-white p-6 rounded-lg">
        <Dados />
      </div>

      <div className="text-zinc-600 text-sm">
        2024 &copy; Insta PIX
      </div>
    </div>
  )
}