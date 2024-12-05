import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { Toaster } from "sonner";
import { FacebookPixel } from "@/components/facebook-pixel";
import { ClarityScript } from "@/components/clarity";
import { Providers } from "./providers";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "InstaPIX - Avalie e ganhe",
  description: "oferta",
  metadataBase: new URL('https://pixpremia.online'),
  openGraph: {
    title: "InstaPIX - Avalie e ganhe",
    description: 'Ganhe por cada avaliação.',
    images: [
      {
        url: '/images/thumbnail.png',
        width: 1200,
        height: 630,
        alt: "Insta PIX",
      },
      {
        url: '/images/thumbnail.png',
        width: 1080,
        height: 1080,
        alt: "Insta PIX",
      },
      {
        url: '/images/thumbnail.png',
        width: 1080,
        height: 1350,
        alt: "Insta PIX",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <meta name="viewport"
          content="width=device-width, initial-scale=1.0 ,maximum-scale=1.0 , user-scalable=no"
        />
      </head>
      <body
        className={`${inter.className} antialiased`}
      >
        <Providers>
          <FacebookPixel pixel="" />
          {/* <ClarityScript /> */}
          <div className="w-full max-w-xl mx-auto bg-gradient-to-t from-[#00bdae] to-white min-h-screen">
            {children}
            <Toaster position="top-center" />
          </div>
        </Providers>
      </body>
    </html>
  );
}
