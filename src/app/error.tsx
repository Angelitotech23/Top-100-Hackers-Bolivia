"use client"

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-16">
      <h1 className="font-heading text-4xl font-semibold tracking-tight">El tablero no cargó</h1>
      <p className="mt-4 text-muted-foreground">
        La sesión o la lista de postulaciones no respondió. Puedes intentar de nuevo.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
      >
        Reintentar
      </button>
    </div>
  )
}
