import type { Metadata } from "next";
import { Poppins } from 'next/font/google'


const poppins = Poppins({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Spotify",
  description: "Spotify",
};

export default function SpotifyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${poppins.className}`}>
      {children}
    </div>
  );
}
