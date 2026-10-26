import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroRidges } from "@/components/hero-ridges";
import { getStats } from "@/data/hackers";

export default function HomePage() {
  const stats = getStats();

  return (
    <>
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-28 md:pb-24 md:pt-32">
        <HeroRidges />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-8">
          <p className="animate-rise font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.28em] text-[var(--gold)] md:text-base">
            Bolivia 100 Hackers
          </p>
          <h1 className="animate-rise-delay-1 mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-[1.05] tracking-tight text-[var(--sand)] sm:text-5xl md:text-7xl">
            Los 100 hackers de Bolivia.
          </h1>
          <p className="animate-rise-delay-2 mt-5 max-w-xl text-base leading-relaxed text-[var(--mist)] md:text-lg">
            Un tablero competitivo para quien investiga, compite y construye
            desde el país. Cien plazas. Evidencia pública. El puesto lo asigna
            la mesa.
          </p>
          <div className="animate-rise-delay-3 mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/ranking">
                Ver ranking
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-[var(--sand)] hover:bg-white/5">
              <Link href="/postular">Postular ficha</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[var(--panel)]/40">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-px px-5 md:px-8">
          {[
            { label: "plazas", value: stats.seats },
            { label: "ocupadas", value: stats.occupied },
            { label: "abiertas", value: stats.open },
          ].map((item) => (
            <div key={item.label} className="px-2 py-8 text-center md:py-10">
              <p className="font-[family-name:var(--font-display)] text-3xl tabular-nums text-[var(--gold)] md:text-5xl">
                {item.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--mist)] md:text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="gold-line mb-10 max-w-xs" />
        <h2 className="max-w-2xl font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--sand)] md:text-4xl">
          Un incentivo que no se apaga cuando termina el evento.
        </h2>
        <p className="mt-5 max-w-2xl text-[var(--mist)] md:text-lg">
          En Bolivia la escena se enciende en un CTF o una charla y después se
          apaga. Falta un lugar permanente donde se vea quién investiga, compite
          y construye — y donde valga la pena volver a intentarlo.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--sand)] md:text-3xl">
          Cómo se entra
        </h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-2">
          {[
            {
              n: "01",
              t: "Completas tu perfil",
              d: "Nombre o alias, LinkedIn, ciudad y evidencia verificable por categoría.",
            },
            {
              n: "02",
              t: "Cuentas un logro público",
              d: "CTF, bug bounty autorizado, investigación, defensa, software, datos o educación.",
            },
            {
              n: "03",
              t: "La mesa revisa",
              d: "Hasta 5 días hábiles para confirmar o ajustar el puntaje preliminar.",
            },
            {
              n: "04",
              t: "Se asigna el puesto",
              d: "Postular no reserva el 33 ni ningún otro. El número lo mereces con la ficha.",
            },
          ].map((step) => (
            <li key={step.n} className="border-l border-[var(--gold)]/40 pl-5">
              <p className="font-[family-name:var(--font-display)] text-sm text-[var(--gold)]">
                {step.n}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[var(--sand)]">
                {step.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--mist)]">
                {step.d}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <Button asChild>
            <Link href="/codigo">Leer el código del ranking</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
