import { getData } from "@/functions/get-cookie"
import { PersonIcon } from "@radix-ui/react-icons"

export async function Header() {

  const data = await getData('user_data')

  const user = data ? JSON.parse(data) : null

  return (
    <div className="w-full flex items-center justify-between px-5 py-1.5 border-b border-[#939393]">
      <div className="flex items-center">
        <PersonIcon className="size-4 mr-2" />
        <span className="text-sm">{user ? user.name : "Guest"}</span>
      </div>
      <div className="flex items-center gap-0.5">
        <span className="text-sm font-bold">CPF:</span>
        <span className="text-sm">{user ? user.document : "000.000.000-00"}</span>
      </div>
    </div>
  )
}
