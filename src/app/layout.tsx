import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { IBM_Plex_Mono, Outfit, Syne } from "next/font/google"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import "./globals.css"

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
})

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
})

const plex = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: {
    default: "Bolivia 100 Hackers",
    template: "%s · Bolivia 100 Hackers",
  },
  description:
    "Ranking abierto de los 100 hackers de Bolivia. Entra con tu cuenta y postula para ocupar una plaza.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${outfit.variable} ${syne.variable} ${plex.variable} dark h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#c6f04d",
              colorBackground: "#171d14",
              colorForeground: "#f4f1e6",
              colorInput: "#22291c",
              colorInputForeground: "#f4f1e6",
              borderRadius: "0.5rem",
            },
          }}
        >
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ClerkProvider>
      </body>
    </html>
  )
}
