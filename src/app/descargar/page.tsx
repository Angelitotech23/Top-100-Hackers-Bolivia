import { buttonVariants } from "@/components/ui/button"

export const metadata = {
  title: "Descargar presentación",
  description: "Descarga el PowerPoint de Bolivia 100 Hackers.",
}

export default function DownloadDeckPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <p className="font-mono text-xs tracking-[0.22em] text-gold uppercase">Presentación · 7 diapositivas</p>
      <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
        Bolivia 100 Hackers.pptx
      </h1>
      <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
        Archivo PowerPoint real (16:9). El visor de Cursor no abre binarios: usa este botón para
        bajarlo y ábrelo en PowerPoint o Google Slides.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="/descargar/archivo"
          className={`${buttonVariants({ className: "h-10 px-4" })} lift`}
          download="Bolivia-100-Hackers.pptx"
        >
          Descargar PowerPoint
        </a>
        <a
          href="/Bolivia-100-Hackers.pptx"
          className={`${buttonVariants({ variant: "outline", className: "h-10 px-4" })} lift`}
          download="Bolivia-100-Hackers.pptx"
        >
          Archivo directo
        </a>
      </div>
      <p className="mt-6 font-mono text-xs text-muted-foreground">
        ~367 KB · Office Open XML · notas de orador incluidas
      </p>
    </div>
  )
}
