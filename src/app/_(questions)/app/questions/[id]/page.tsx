import { NewHeader } from "@/components/new-header";
import Image from "next/image";
import Tigre from "@/assets/tigre.png"
import { ButtonLink } from "./button";
import { questions } from "@/functions/api";
import { redirect } from "next/navigation";



interface QuestionPageProps {
  params: { id: string }
}

export default function QuestionPage({ params }: QuestionPageProps) {

  const question = questions.find((question) => question.id === params.id)

  if (!question) {
    redirect('/')
  }


  return (
    <div className="w-full h-screen">
      <NewHeader amount={question.amount} />

      <div className="p-5">


        <div className="w-full max-w-[500px] p-5 rounded-lg bg-white mx-auto mt-10 space-y-6 flex items-center justify-center flex-col">

          <h2 className="text-xl text-[#005952] font-bold">Responda e ganhe:</h2>

          <div className="bg-white p-10 rounded-lg max-w-[350px] mx-auto flex items-center justify-center shadow-lg">
            <Image src={`/images/${question.image}`} className="object-cover" alt="image" width={250} height={250} />
          </div>


          <span className="font-medium">{question.question}</span>
        </div>

      </div>


      <div className="fixed bottom-5 left-5 right-5 bg-white rounded-lg p-4">
        <ButtonLink nextPage={question.nextPage} question={question.id} />
      </div>


    </div>
  )
}