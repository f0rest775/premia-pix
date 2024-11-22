import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageCircleMore } from "lucide-react";

export function Doubts() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="fixed z-50 bottom-5 right-5 flex flex-col items-center justify-center">
          <span className="text-white font-medium text-xs">Duvidas?</span>
          <button className="flex items-center justify-center bg-[#01D661] rounded-full size-10">
            <MessageCircleMore className="size-5 text-black" />
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#181818] border-black text-white">
        <DialogHeader>
          <DialogTitle className="text-center">Are you absolutely sure?</DialogTitle>
        </DialogHeader>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Por que preciso pagar uma taxa?</AccordionTrigger>
            <AccordionContent>
              A taxa é somente uma etapa de verificação, iremos enviar o valor de volta juntamente com o seu prêmio.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Posso fazer a pesquisa quantas vezes quiser?</AccordionTrigger>
            <AccordionContent>
              Você pode fazer a pesquisa somente 1 vez por dia com o mesmo CPF.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Toda vez que eu fizer a pesquisa preciso pagar a taxa de verificação?</AccordionTrigger>
            <AccordionContent>
              Essa etapa você só passa uma única vez, após finalizar você terá um acesso exclusivo com todas as informações diretamente no seu e-mail.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Existe a possibilidade de eu não receber o valor?</AccordionTrigger>
            <AccordionContent>
              Somos o único aplicativo de pesquisa licenciado pela Spotify ® e o que mais prezamos é pela nossa credibilidade, por isso temos 100% de aprovação pelos usuários da plataforma mundial.
            </AccordionContent>
          </AccordionItem>
        </Accordion>


      </DialogContent>
    </Dialog>
  )
}