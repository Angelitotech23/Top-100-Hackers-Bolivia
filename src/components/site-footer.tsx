import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>Bolivia 100 Hackers · temporada 2026</p>
        <div className="flex gap-4">
          <Link href="/reglamento" className="hover:text-foreground">
            Reglamento
          </Link>
          <Link href="/postular" className="hover:text-foreground">
            Enviar postulación
          </Link>
        </div>
      </div>
    </footer>
  )
}
