import Link from "next/link"
import { CircleDashed } from "lucide-react"
import { rankLabel } from "@/lib/domain"

export function OpenSeatCard({
  rank,
  signedIn,
  href = "/postular",
}: {
  rank: number
  signedIn: boolean
  href?: string
}) {
  return (
    <Link
      href={href}
      className="lift grid grid-cols-[4rem_1fr_auto] items-center gap-3 rounded-xl border border-dashed border-primary/40 bg-card/35 px-4 py-4 text-foreground/85"
    >
      <span className="font-mono text-2xl text-gold">{rankLabel(rank)}</span>
      <span className="min-w-0">
        <span className="flex items-center gap-2 font-medium">
          <CircleDashed className="size-4 text-primary" aria-hidden />
          Plaza disponible
        </span>
        <span className="block text-sm text-muted-foreground">Libre. El número lo pone la mesa, no quien postula.</span>
      </span>
      <span className="text-sm font-medium text-primary">
        {signedIn ? "Postular" : "Postular al ranking"}
      </span>
    </Link>
  )
}

export function OpenSeatRow({
  rank,
  signedIn,
}: {
  rank: number
  signedIn: boolean
}) {
  return (
    <Link
      href="/postular"
      className="lift grid gap-2 px-4 py-3 sm:grid-cols-[4.5rem_1fr_auto] sm:items-center"
    >
      <span className="font-mono text-lg text-gold">{rankLabel(rank)}</span>
      <span className="flex min-w-0 items-center gap-3">
        <CircleDashed className="size-4 shrink-0 text-primary" aria-hidden />
        <span className="min-w-0">
          <span className="block truncate font-medium text-foreground/85">Plaza disponible</span>
          <span className="block truncate text-sm text-muted-foreground">
            {signedIn ? "Postula. El puesto lo decide la revisión." : "Entra y postula. El número no se reserva."}
          </span>
        </span>
      </span>
      <span className="rounded-full border border-dashed border-primary/45 px-2.5 py-0.5 text-xs text-primary">
        Disponible
      </span>
    </Link>
  )
}
