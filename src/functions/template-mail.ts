export const htmlMailPix = (link: string, name: string, saudacao: string) => `
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PremiaPIX</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

    body {
      margin: 0;
      padding: 0;
      width: 100%;
      background-color: #f4f4f4;
      font-family: 'Inter', sans-serif;
      color: #333;
    }

    p {
      font-size: 14px;
    }

    .container {
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      margin: 20px auto;
      max-width: 600px;
    }

    img {
      width: 100%;
      max-width: 600px;
      border-radius: 10px;
    }

    .content {
      padding: 20px;
    }

    .content p {
      color: #333;
      margin: 0 0 10px;
    }

    .steps {
      text-align: left;
      margin-bottom: 16px;
    }

    .steps p {
      margin: 8px 0;
    }

    .button-container {
      text-align: center;
      margin-top: 20px;
      width: 100%;
    }

    .button {
      display: inline-block;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 20px;
      background-color: #1C7069;
      color: #fff !important;
      font-weight: 700;
      font-size: 16px;
      width: 90%;
    }

    @media (max-width: 600px) {
      .container {
        margin: 10px;
      }

      .content {
        padding: 10px;
      }

      .button {
        font-size: 14px;
        padding: 10px 20px;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <img
      src="https://perfectpay-files.s3.us-east-2.amazonaws.com/app/img/plan/PPPBAKSB/pplqqjutgimageheaderpathhead_perfect_pay_2.png"
      alt="InstaPremium">
    <div class="content">
      <p>Olá ${name} ${saudacao}, seu saldo de <strong>R$ 819,99</strong> está bloqueado. Mas não se preocupe, siga os
        passos abaixo para desbloquear e sacar seu dinheiro agora.</p>

      <div class="steps">
        <p><strong>1° - Clique no botão "SACAR PIX" abaixo.</strong></p>
        <p><strong>2° - Abra o seu aplicativo do banco, copie o código ou escaneie o QRCode da página.</strong></p>
        <p><strong>3° - Confirme o pagamento e responda este e-mail com o comprovante.</strong></p>
        <p><strong>4° - Aguarde de 3 a 5 minutos para que o seu saldo seja liberado e transferido para sua
            conta.</strong></p>
        <p><strong>Obs: A taxa de R$ 19,99 é uma forma de confirmar que você é uma pessoa real. O valor da taxa será
            reembolsado.</strong></p>
      </div>

      <div class="button-container">
        <a class="button" href="${link}?src=RecuperadoSM&src=RecuperadoSM">SACAR PIX</a>
      </div>
    </div>
  </div>
</body>

</html>
`

export const htmlPaymentSuccessfly = (name: string, saudacao: string) =>
  `
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PremiaPIX</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

    body {
      margin: 0;
      padding: 0;
      width: 100%;
      background-color: #f4f4f4;
      font-family: 'Inter', sans-serif;
      color: #333;
    }

    p {
      font-size: 14px;
    }

    .container {
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      margin: 20px auto;
      max-width: 600px;
    }

    img {
      width: 100%;
      max-width: 600px;
      border-radius: 10px;
    }

    .content {
      padding: 20px;
    }

    .content p {
      color: #333;
      margin: 0 0 10px;
    }

    .steps {
      text-align: left;
      margin-bottom: 16px;
    }

    .steps p {
      margin: 8px 0;
    }

    .button-container {
      text-align: center;
      margin-top: 20px;
      width: 100%;
    }

    .button {
      display: inline-block;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 10px;
      background-color: #8A2BE2;
      color: #fff !important;
      font-weight: 700;
      font-size: 16px;
      width: 100%;
    }

    @media (max-width: 600px) {
      .container {
        margin: 10px;
      }

      .content {
        padding: 10px;
      }

      .button {
        font-size: 14px;
        padding: 10px 20px;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <img
      src="https://perfectpay-files.s3.us-east-2.amazonaws.com/app/img/plan/PPPBAKSB/pplqqjutgimageheaderpathhead_perfect_pay_2.png"
      alt="PremiaPIX">
    <div class="content">
      <p>Olá ${name} ${saudacao},</p>
      <p>Obrigado por sua compra! Seu pedido #90006 foi confirmado.</p>
      <p>Aqui estão as informações de acesso do seu aplicativo <strong>Premia PIX:</strong></p>

      
  <br>
      <div class="steps">
        <p><strong>Instruções</strong></p>
        <p>1° - Clique no link de acesso.</p>
      </div>

      <br>

      <p><strong>Link de acesso:</strong> <a href="https://pagueereceba.online/paidwork/">Acessar a plataforma</a></p>

      <br>



      <p>Se precisar de ajuda, estamos à disposição.</p>

      <br><br>

      <p>Atenciosamente, Staff de Comunicação Premia PIX</p>

      <p>Contato: sac@atendimento-rapido.click</p>
    </div>
  </div>
</body>

</html>

`