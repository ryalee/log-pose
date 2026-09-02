import type { Metadata } from "next";
import { Pirata_One, Cabin, Mulish } from "next/font/google";
import "./globals.css";

const pirataOne = Pirata_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pirata",
  display: "swap",
});

const cabin = Cabin({
  subsets: ["latin"],
  variable: "--font-cabin",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Log Pose | Quanto falta?",
  description:
    "Descubra quantos episódios de One Piece faltam para você alcançar o episódio mais recente, quanto tempo isso leva e a que capítulo do mangá corresponde.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${pirataOne.variable} ${cabin.variable} ${mulish.variable} font-body bg-sea-gradient min-h-screen text-parchment-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
