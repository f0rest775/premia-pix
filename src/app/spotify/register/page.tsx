import Image from "next/image";
import Logo from '@/assets/logowhite.png'
import { FormRegister } from "./form-register";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function CreateAccount() {

  const userCreated = cookies().has('user_created')

  if (userCreated) {
    redirect('/spotify/music/1okn8NTTHVQuP4hghJi2Ec')
  }

  return (
    <div className="w-full min-h-screen bg-[#181818] text-white flex items-center justify-center p-5 overflow-x-auto">

      <div className="bg-black rounded-lg px-5 py-10 flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center gap-4">
          <Image src={Logo} className="object-contain" width={120} height={35} alt="src" priority />
          <h2 className="font-bold text-2xl text-center"> Seja bem-vindo ao
            Spotify Brasil</h2>

          <p className="text-[#a8a8a8] text-center text-sm"> Faça seu <span className="font-bold text-white">cadastro</span> e ganhe
            dinheiro ouvindo músicas de
            grandes artistas e ajude a moldar o futuro da música no Brasil!</p>
        </div>

        <FormRegister />

        <p className="text-center text-xs text-[#a8a8a8] pt-6">
          Este site é protegido pelo reCAPTCHA e está sujeito à <b className="text-[#01d661]">Política de Privacidade</b> e aos <b className="text-[#01d661]">Termos de Serviço do Spotify ®.</b>
        </p>
      </div>

    </div>
  )
}