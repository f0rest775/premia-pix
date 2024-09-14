import { influencers } from "@/functions/api"
import Image from "next/image"
import Logo from '@/assets/logo.png'
import { redirect } from "next/navigation"
import Verify from '@/assets/verify.png'
import { EllipsisIcon, ThumbsUp } from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import LogoInstaPremia from '@/assets/logo-insta-premia.png'


interface InfluencerPageProps {
  params: { slug: string }
}


export default function InfluencerPage({ params }: InfluencerPageProps) {

  const influencer = influencers.find((influencer) => influencer.slug === params.slug)


  if (!influencer) {
    redirect('/')
  }

  const InfluencerImage = `/images/${influencer.image}`;

  return (
    <>
      <div className="border-b border-zinc-500">
        <div className="w-full h-16 flex items-center justify-between p-5">
          <Image src={Logo} alt="Logo" width={0} height={0} className="w-[180px] h-auto object-contain" />
          <div>
            <p className="text-[10px] font-bold text-center">Saldo a receber</p>
            <div className="bg-[#00bdae] rounded-lg py-1 px-4 text-center font-semibold text-sm">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(influencer.amount)}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={LogoInstaPremia} alt="Logo pix" width={0} height={0} className="size-10 rounded-full object-contain border-2 border-pink-600" priority />
            <span className="text-sm font-bold">Premia PIX Oficial</span>
            <Image src={Verify} alt="verificado" width={0} height={0} className="w-[18px] h-auto object-contain" priority />
          </div>
          <EllipsisIcon className="size-4" />
        </div>

        <p className="text-sm font-semibold">Você seguiria{" "} {influencer.name}?</p>

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
          <ThumbsUp className="size-5 mr-2" />
          <span className="text-xs font-bold self-end">
            {influencer.following}{" "}mil avaliações
          </span>
        </div>


        <div className="flex flex-col gap-2 bg-white rounded-lg p-4">
          <p className="text-xs font-bold">Marque uma das opções:</p>
          <div className="flex items-center justify-between gap-10">
            <Button asChild className="bg-[#8B0101] hover:bg-[#8B0101] w-full h-10">
              <Link href={`/${influencer.nextPage}`}>
                Não
              </Link>
            </Button>
            <Button asChild className="bg-[#26C50C] hover:bg-[#26C50C] w-full h-10">
              <Link href={`/${influencer.nextPage}`}>
                Sim
              </Link>
            </Button>
          </div>
        </div>


      </div>
    </>
  )


}