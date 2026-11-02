import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { getBoard } from "@/lib/applications"
import { RoleChips } from "@/components/role-chips"
import { BOARD_SIZE, rankLabel, socialLabel } from "@/lib/domain"

export async function generateMetadata({ params }: { params: Promise<{ puesto: string }> }) {
  const { puesto } = await params
  return { title: `Puesto ${puesto}` }
}

export default async function SeatPage({ params }: { params: Promise<{ puesto: string }> }) {
  const { puesto } = await params
  const rank = Number(puesto)
  if (!Number.isInteger(rank) || rank < 1 || rank > BOARD_SIZE) notFound()

  const seat = (await getBoard()).find((item) => item.rank === rank)
  if (!seat) notFound()

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <Link href="/ranking" className="text-sm text-muted-foreground hover:text-foreground">
        Volver al tablero
      </Link>
      <p className="mt-6 font-mono text-5xl text-gold">{rankLabel(seat.rank)}</p>
      <div className="mt-3 flex items-center gap-4">
        {seat.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={seat.imageUrl} alt="" className="size-16 rounded-full object-cover ring-1 ring-foreground/10" />
        ) : null}
        <div>
          <h1 className="font-heading text-4xl font-semibold tracking-tight">
            {seat.open ? "Plaza abierta" : seat.displayName ?? seat.alias}
          </h1>
          {seat.title ? <p className="mt-1 text-muted-foreground">{seat.title}</p> : null}
        </div>
      </div>
      {seat.open ? (
        <div className="mt-6 space-y-4 rounded-xl border border-dashed border-primary/40 bg-card/35 p-5">
          <p className="text-muted-foreground">
            Este número está libre, pero no se reserva. Postulas al ranking; la mesa decide qué puesto te toca según
            la ficha.
          </p>
          <Link href="/postular" className={`${buttonVariants({ className: "h-10 px-4" })} lift`}>
            Postular al ranking
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          <div className="flex flex-wrap gap-2">
            <RoleChips roles={seat.roles} />
            <Badge variant="outline">
              {seat.city}, {seat.department}
            </Badge>
            <Badge variant="secondary">{seat.years} años</Badge>
          </div>
          {seat.bio ? <p className="text-base leading-7 text-muted-foreground">{seat.bio}</p> : null}
          <p className="text-lg leading-7">{seat.achievement}</p>
          <p className="text-sm text-muted-foreground">{seat.handles}</p>
          <div className="flex flex-col gap-2 text-sm">
            {seat.linkedinUrl ? (
              <a href={seat.linkedinUrl} className="text-primary hover:underline" rel="noreferrer" target="_blank">
                LinkedIn
              </a>
            ) : null}
            {seat.socialLinks.map((link) => (
              <a
                key={`${link.platform}-${link.url}`}
                href={link.url}
                className="text-primary hover:underline"
                rel="noreferrer"
                target="_blank"
              >
                {socialLabel(link.platform)}
              </a>
            ))}
            {seat.evidenceUrl ? (
              <a href={seat.evidenceUrl} className="text-primary hover:underline" rel="noreferrer" target="_blank">
                Ver evidencia
              </a>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}
