import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { buildBoard, listApplications } from "@/lib/applications"
import { buttonVariants } from "@/components/ui/button"
import { CountUp } from "@/components/count-up"
import { OpenSeatCard } from "@/components/open-seat"
import { Reveal } from "@/components/reveal"
import { RoleChips } from "@/components/role-chips"
import { rankLabel } from "@/lib/domain"

export default async function HomePage() {
  const { userId } = await auth()
  const signedIn = Boolean(userId)
  const applications = await listApplications()
  const board = buildBoard(applications)
  const occupied = board.filter((seat) => !seat.open)
  const pending = applications.filter((item) => item.status === "en_revision").length
  const podium = board.slice(0, 3)

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/80">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(1 0 0 / 7%) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 7%) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:py-24 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.22em] text-gold uppercase">Temporada 2026 · Bolivia</p>
            <h1 className="mt-4 max-w-xl font-heading text-5xl leading-[0.92] font-semibold tracking-tight sm:text-7xl">
              Los 100 hackers de Bolivia.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Un tablero competitivo para quien investiga, compite y construye desde el país. Hay 100 plazas.
              Cualquiera puede postular. El número en el tablero lo asigna la mesa según la ficha, no el asiento
              que clickeaste.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/postular" className={`${buttonVariants({ className: "h-10 px-4" })} lift`}>
                Postular al ranking
              </Link>
              <Link href="/ranking" className={`${buttonVariants({ variant: "outline", className: "h-10 px-4" })} lift`}>
                Ver las 100 plazas
              </Link>
            </div>
          </div>
          <Reveal>
            <dl className="grid grid-cols-3 gap-3">
              {[
                [100, "plazas"],
                [occupied.length, "ocupadas"],
                [pending, "en revisión"],
              ].map(([value, label], index) => (
                <div
                  key={String(label)}
                  className="lift rounded-xl bg-card px-3 py-4 ring-1 ring-foreground/10"
                  style={{ transitionDelay: `${index * 70}ms` }}
                >
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="mt-2 font-mono text-3xl text-primary">
                    <CountUp value={Number(value)} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border/80 bg-card/40">
        <Reveal className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-14">
          <p className="font-mono text-xs tracking-[0.22em] text-gold uppercase">Por qué existe</p>
          <h2 className="mt-3 max-w-3xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Un incentivo que no se apaga cuando termina el evento.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            En Bolivia la escena se enciende en un CTF o una charla y después se apaga. Falta un lugar permanente
            donde se vea quién investiga, compite y construye — y donde valga la pena volver a intentarlo. Este
            ranking es ese incentivo: 100 plazas, evidencia pública, un tablero que se gana.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold tracking-tight">Cómo se entra</h2>
          <ol className="mt-6 space-y-4 text-sm leading-6">
            {[
              ["01", "Entras con Clerk", "Correo o Google. Sin sesión no se envía ninguna postulación."],
              ["02", "Completas tu perfil", "Bio, LinkedIn y foto de tu cuenta. Sin eso no se abre el formulario de ficha."],
              ["03", "Cuentas un logro público", "CTF, bug bounty autorizado, investigación, defensa, hardware o educación."],
              ["04", "La mesa asigna el puesto", "Aprueba, observa o te coloca en el número que merezca la ficha. Postular no reserva el 33 ni ningún otro."],
            ].map(([step, title, copy], index) => (
              <li
                key={step}
                className="lift rounded-xl bg-card p-4 ring-1 ring-foreground/10"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <span className="font-mono text-gold">{step}</span>
                <p className="mt-1 font-medium">{title}</p>
                <p className="text-muted-foreground">{copy}</p>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={80}>
          <div className="flex items-end justify-between gap-3">
            <h2 className="font-heading text-3xl font-semibold tracking-tight">Podio</h2>
            <Link href="/ranking" className="text-sm text-primary hover:underline">
              Tablero completo
            </Link>
          </div>
          <div className="mt-6 grid gap-3">
            {podium.map((seat) =>
              seat.open ? (
                <OpenSeatCard key={seat.rank} rank={seat.rank} signedIn={signedIn} />
              ) : (
                <Link
                  key={seat.rank}
                  href={`/ranking/${seat.rank}`}
                  className="lift grid grid-cols-[3.5rem_auto_1fr] items-center gap-3 rounded-xl bg-card px-4 py-4 ring-1 ring-foreground/10"
                >
                  <span className="font-mono text-2xl text-gold">{rankLabel(seat.rank)}</span>
                  {seat.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={seat.imageUrl}
                      alt={seat.displayName ?? seat.alias ?? ""}
                      className="size-12 shrink-0 rounded-full object-cover ring-1 ring-foreground/10"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="grid size-12 place-items-center rounded-full bg-secondary font-mono text-xs text-muted-foreground ring-1 ring-foreground/10"
                    >
                      {rankLabel(seat.rank)}
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{seat.displayName ?? seat.alias}</span>
                    {seat.title ? <span className="block truncate text-sm text-foreground/80">{seat.title}</span> : null}
                    <RoleChips roles={seat.roles} limit={1} className="mt-1" />
                  </span>
                </Link>
              ),
            )}
          </div>
        </Reveal>
      </section>
    </div>
  )
}
