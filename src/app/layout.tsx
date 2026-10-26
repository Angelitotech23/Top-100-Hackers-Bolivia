import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Bolivia 100 Hackers",
    template: "%s · Bolivia 100 Hackers",
  },
  description:
    "Ranking de 100 plazas para referentes del ecosistema tecnológico boliviano. Evidencia verificable, meritocracia y visibilidad permanente.",
  openGraph: {
    title: "Bolivia 100 Hackers",
    description:
      "Un incentivo para revivir la competencia tecnológica y dar alcance a nuestros talentos.",
    locale: "es_BO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-[family-name:var(--font-body)]`}
      >
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
