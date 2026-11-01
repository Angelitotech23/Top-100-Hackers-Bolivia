import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-16">
      <h1 className="font-heading text-4xl font-semibold tracking-tight">Esa plaza no existe</h1>
      <p className="mt-4 text-muted-foreground">El tablero va del puesto 01 al 100.</p>
      <Link href="/ranking" className="mt-6 inline-block text-sm text-primary hover:underline">
        Volver al ranking
      </Link>
    </div>
  )
}
