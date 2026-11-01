import { auth } from "@clerk/nextjs/server"
import { RankBoard } from "@/components/rank-board"
import { getBoard } from "@/lib/applications"
import { BOARD_SIZE } from "@/lib/domain"

export const metadata = {
  title: "Ranking",
  description: "Las 100 plazas del ranking de hackers de Bolivia.",
}

export default async function RankingPage() {
  const { userId } = await auth()
  const board = await getBoard()
  const occupied = board.filter((seat) => !seat.open).length

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <p className="font-mono text-xs tracking-[0.22em] text-gold uppercase">Tablero</p>
      <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">Top 100</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        {occupied} plazas ocupadas y {BOARD_SIZE - occupied} abiertas. Clickear un asiento no lo reserva: el número
        lo asigna la mesa según la ficha, no según a qué plaza postulaste.
      </p>
      <div className="mt-8">
        <RankBoard seats={board} signedIn={Boolean(userId)} />
      </div>
    </div>
  )
}
