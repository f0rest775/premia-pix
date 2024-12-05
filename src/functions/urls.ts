const urls = [
  //"https://go.perfectpay.com.br/PPU38COPTO0?",
  "https://go.perfectpay.com.br/PPU38CP21JN?"
  //"https://checkout.perfectpay.com.br/pay/PPU38CP1ULO?"
];

export const CHECKOUT_URL = urls[Math.floor(Math.random() * urls.length)];
