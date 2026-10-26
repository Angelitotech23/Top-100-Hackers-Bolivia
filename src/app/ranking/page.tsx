import type { Metadata } from "next";
import { RankingBoard } from "@/components/ranking-board";
import { getStats } from "@/data/hackers";

export const metadata: Metadata = {
  title: "Ranking",
  description:
    "Top 100 del ecosistema tecnológico boliviano. Plazas ocupadas y abiertas.",
};

export default function RankingPage() {
  const stats = getStats();

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <p className="text-sm uppercase tracking-[0.22em] text-[var(--gold)]">
        Ranking · temporada 2026
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-[var(--sand)] md:text-6xl">
        Top 100
      </h1>
      <p className="mt-4 max-w-2xl text-[var(--mist)]">
        {stats.occupied} plazas ocupadas y {stats.open} abiertas. Clickear un
        asiento no lo reserva: el número lo asigna la mesa según la ficha.
      </p>
      <div className="mt-10">
        <RankingBoard />
      </div>
    </div>
  );
}
