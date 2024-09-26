import { getData } from "@/functions/get-cookie"
import { PersonIcon } from "@radix-ui/react-icons"
import { CircleDollarSign } from "lucide-react"
import Logo from '@/assets/insta-pix-logo.png'
import Image from "next/image"

interface NewHeaderProps {
  amount: number
}

export async function NewHeader({ amount }: NewHeaderProps) {

  const data = await getData('user_data')

  const user = data ? JSON.parse(data) : null

  return (
    <>
      <div className="bg-white pb-2">
        <div className="w-full h-16 flex items-center justify-between p-5 pt-8">
          <Image src={Logo} alt="Logo" width={0} height={0} className="w-[180px] h-auto object-contain" />
          <div>
            <p className="text-[10px] font-bold text-center">Saldo a receber</p>
            <div className="bg-[#00bdae] rounded-lg py-1 px-4 text-center font-semibold text-sm flex items-center">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(amount)}

              <CircleDollarSign className="ml-2 size-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between px-5 py-1.5 bg-white shadow-2xl rounded-b-2xl pb-4">
        <div className="flex items-center">
          <PersonIcon className="size-4 mr-2" />
          <span className="text-sm truncate">{user ? user.name.split(" ")[0] : "Usuário"}</span>
        </div>
        <div className="flex items-center gap-0.5">
          <span className="text-sm font-bold">CPF:</span>
          <span className="text-sm">{user ? user.document : "000.000.000-00"}</span>
        </div>
      </div>
    </>
  )
}
