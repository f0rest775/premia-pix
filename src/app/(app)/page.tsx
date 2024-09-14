import Image from "next/image";
import Logo from "@/assets/logo.png"
import { LoginForm } from "./login-form";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10 p-5">
      <Image src={Logo} alt="Logo" width={0} height={0} className="w-[250px] h-full object-contain" />

      <div className="space-y-4">
        <div className="flex items-center justify-center bg-[#91e3dc] p-4 rounded-lg shadow-2xl">
          <p className="text-sm font-medium text-center">Você ganhou uma licença gratuita para testar nosso app, cadastre seu E-mail abaixo e ganhe até 819,00 agora.</p>
        </div>

        <LoginForm />

      </div>
    </div>
  );
}
