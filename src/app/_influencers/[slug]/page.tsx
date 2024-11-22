import { influencers } from "@/functions/api"
import Image from "next/image"
import Logo from '@/assets/insta-pix-logo.png'
import { redirect } from "next/navigation"
import Verify from '@/assets/verify.png'
import { ChartNoAxesColumnIncreasing, CircleDollarSign, EllipsisIcon } from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import LogoInstaPremia from '@/assets/logo-insta-premia.png'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert } from "@/components/alert"
import { hasCookieT } from "@/functions/get-cookie"
import BC from '@/assets/bc.png'
import { ButtonLink } from "./button"
import { Header } from "../../../components/header"



interface InfluencerPageProps {
  params: { slug: string }
}


export default async function InfluencerPage({ params }: InfluencerPageProps) {

  const influencer = influencers.find((influencer) => influencer.slug === params.slug)


  if (!influencer) {
    redirect('/')
  }

  const cookie = await hasCookieT('user_set_payment')

  if (cookie) {
    redirect('/pagamento')
  }



  const InfluencerImage = `/images/${influencer.image}`;


  return (
    <>
      {influencer.slug === 'virginia-fonseca' ? (

        <Dialog defaultOpen>
          <DialogContent className="w-full max-w-[360px] rounded-lg bg-[#C0C0C0] border-0 outline-none mx-auto">
            <DialogHeader>
              <DialogTitle className="text-center text-3xl font-black">
                SEJA <span className="text-[#00bdae]">BEM VINDO(A)</span> AO NOSSO APP!
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-center font-medium">Você ja tem R$ 136,66 reais de saldo em sua conta, só por realizar seu cadastro, incrível né?</p>
              <p className="text-sm text-center font-medium">Para você continuar ganhando avalie mais 5 pesquisas e <strong>realiza seu saque imediatamente!</strong></p>


            </div>
            <DialogClose asChild>
              <button className="w-full bg-[#005952] rounded-lg h-11 p-2 text-white font-medium border-0 outline-none">
                Começar agora
              </button>
            </DialogClose>
          </DialogContent>
        </Dialog>

      ) : (
        <Alert />
      )}
      <div className="border-b border-[#939393]">
        <div className="w-full h-16 flex items-center justify-between p-5 pt-6">
          <Image src={Logo} alt="Logo" width={0} height={0} className="w-[180px] h-auto object-contain" />
          <div>
            <p className="text-[10px] font-bold text-center">Saldo a receber</p>
            <div className="bg-[#00bdae] rounded-lg py-1 px-4 text-center font-semibold text-sm flex items-center">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(influencer.amount)}

              <CircleDollarSign className="ml-2 size-4" />
            </div>
          </div>
        </div>
      </div>

      <Header />

      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={LogoInstaPremia} alt="Logo pix" width={0} height={0} className="size-10 rounded-full object-contain border-2 border-pink-600" priority />
            <span className="text-sm font-bold">Insta PIX Oficial</span>
            <Image src={Verify} alt="verificado" width={0} height={0} className="w-[18px] h-auto object-contain" priority />
          </div>
          <EllipsisIcon className="size-4" />
        </div>

        <p className="text-sm font-semibold">{influencer.text}</p>

        <div className="w-full max-w-[450px] mx-auto">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={InfluencerImage}
              alt={`Imagem de ${influencer.name}`}
              className="rounded-lg object-cover shadow-lg"
              width={450}
              height={450}
              priority
            />
          </AspectRatio>
        </div>

        <div className="flex items-center">
          <ChartNoAxesColumnIncreasing className="size-4 mr-1" />
          <span className="text-xs font-bold self-end">
            {influencer.following}{" "}mil avaliações
          </span>
        </div>


        <div className="flex flex-col gap-2 bg-white rounded-lg p-4">
          <p className="text-xs font-bold">Marque uma das opções:</p>
          <ButtonLink nextPage={influencer.nextPage} />
        </div>

        <div className="flex items-center justify-center flex-col pt-16 select-none space-y-1">
          <p className="text-sm text-white">
            Segurança pelo:
          </p>

          <Image src={BC} alt="bc" width={0} height={0} className="w-[200px] h-auto" />
        </div>


      </div>
    </>
  )


}