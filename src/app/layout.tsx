import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";


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

        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '986429856352502');
          fbq('track', 'PageView');
          fbq('track', 'ViewContent');
          </script>
          <noscript><img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=986429856352502&ev=PageView&noscript=1"
        `}
        </Script>


        <Script
          src="//widget.manychat.com/1369769_f6b1f.js"
          strategy="afterInteractive"
          defer
        />

        <Script
          src="https://mccdn.me/assets/js/widget.js"
          strategy="afterInteractive"
          defer
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
