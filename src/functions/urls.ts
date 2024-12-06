// const urls = [
//   //"https://go.perfectpay.com.br/PPU38COPTO0?",
//   "https://go.perfectpay.com.br/PPU38CP21JN?"

import { env } from "@/lib/env";

// ];

const urls = env.NEXT_PUBLIC_URLS.split(',')


export const CHECKOUT_URL = urls[Math.floor(Math.random() * urls.length)];
