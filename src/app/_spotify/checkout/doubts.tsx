import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CircleHelp, MessageCircleMore } from "lucide-react";

export function Doubts() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="fixed z-50 bottom-5 space-y-2 right-3 flex flex-col items-center justify-center">
          <span className="text-white font-medium text-xs">Dúvidas?</span>
          <button className="flex items-center justify-center bg-[#01D661] rounded-t-full rounded-br-full size-10">
            <MessageCircleMore className="size-5 text-black" />
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#181818] border-black text-white max-sm:max-w-[350px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center">
            <CircleHelp className="size-4 mr-2" />
            Dúvidas frequentes
          </DialogTitle>
        </DialogHeader>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-[#01D661]">
            <AccordionTrigger className="text-[#01D661]">1. Por que preciso pagar uma taxa?</AccordionTrigger>
            <AccordionContent>
              A taxa é somente uma etapa de verificação, iremos enviar o valor de volta juntamente com o seu prêmio.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-[#01D661]">
            <AccordionTrigger className="text-[#01D661]">2. Posso fazer a pesquisa quantas vezes quiser?</AccordionTrigger>
            <AccordionContent>
              Você pode fazer a pesquisa somente 1 vez por dia com o mesmo CPF.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-[#01D661]">
            <AccordionTrigger className="text-[#01D661]">3. Toda vez que eu fizer a pesquisa preciso pagar a taxa de verificação?</AccordionTrigger>
            <AccordionContent>
              Essa etapa você só passa uma única vez, após finalizar você terá um acesso exclusivo com todas as informações diretamente no seu e-mail.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-none">
            <AccordionTrigger className="text-[#01D661]">4. Existe a possibilidade de eu não receber o valor?</AccordionTrigger>
            <AccordionContent>
              Somos o único aplicativo de pesquisa licenciado pela Spotify ® e o que mais prezamos é pela nossa credibilidade, por isso temos 100% de aprovação pelos usuários da plataforma mundial.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DialogContent>
    </Dialog>
  )
}