import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { Toaster } from "sonner";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Premia PIX",
  description: "Premia PIX",
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
        <div className="w-full max-w-xl mx-auto bg-gradient-to-t from-[#00bdae] to-white min-h-screen">
          {children}
          <Toaster position="top-center" />
        </div>
      </body>
    </html>
  );
}
