import { FacebookPixel } from "@/components/facebook-pixel";
import type { Metadata } from "next";
import { Poppins } from 'next/font/google'


const poppins = Poppins({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Spotify",
  description: "Spotify",
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
};

export default function SpotifyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${poppins.className}`}>
      <FacebookPixel pixel="1657725324958554" />
      {children}
    </div>
  );
}
