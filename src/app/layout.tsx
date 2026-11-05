import type { Metadata } from "next";
import { Fraunces, Nunito, DM_Mono } from "next/font/google";
import "./globals.css";
import Grain from "@/components/Grain";
import Providers from "@/components/Providers";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-nunito",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["italic"],
  axes: ["SOFT", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deepdev Vyas · Product Manager",
  description:
    "A stop-motion career in four acts: student, engineer, consultant, product manager. AI products that ship.",
  openGraph: {
    title: "Deepdev Vyas · Product Manager",
    description:
      "A stop-motion career in four acts. Student → Engineer → Consultant → PM.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${fraunces.variable} ${mono.variable}`}>
      <body>
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:border focus:border-ink focus:bg-paper focus:px-3 focus:py-2 focus:font-mono focus:text-xs"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <div className="vignette-layer" aria-hidden />
        <Grain />
      </body>
    </html>
  );
}
