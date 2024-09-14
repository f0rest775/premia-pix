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
