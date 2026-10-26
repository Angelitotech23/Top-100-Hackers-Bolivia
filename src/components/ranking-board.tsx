"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ROLES, buildBoard, type HackerProfile } from "@/data/hackers";
import { cn } from "@/lib/utils";

function SeatRow({
  rank,
  profile,
}: {
  rank: number;
  profile: HackerProfile | null;
}) {
  const occupied = Boolean(profile);
  const content = (
    <div
      className={cn(
        "group grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 border-b border-white/8 px-3 py-4 transition md:grid-cols-[4.5rem_1fr_auto] md:gap-5 md:px-4",
        occupied
          ? "hover:bg-white/[0.04]"
          : "opacity-55 hover:opacity-80 hover:bg-white/[0.02]"
      )}
    >
      <span
        className={cn(
          "font-[family-name:var(--font-display)] text-2xl tabular-nums tracking-tight md:text-3xl",
          occupied ? "text-[var(--gold)]" : "text-white/25"
        )}
      >
        {String(rank).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        {profile ? (
          <>
            <p className="truncate font-medium text-[var(--sand)]">
              {profile.name}{" "}
              <span className="text-[var(--mist)]">· {profile.handle}</span>
            </p>
            <p className="mt-0.5 truncate text-sm text-[var(--mist)]">
              {profile.title ?? profile.city}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {profile.roles.slice(0, 3).map((role) => (
                <Badge key={role} variant="gold">
                  {role}
                </Badge>
              ))}
              {profile.roles.length > 3 ? (
                <Badge variant="outline">+{profile.roles.length - 3}</Badge>
              ) : null}
            </div>
          </>
        ) : (
          <>
            <p className="font-medium text-white/45">Plaza disponible</p>
            <p className="mt-0.5 text-sm text-white/30">
              Entra y postula. El número no se reserva.
            </p>
          </>
        )}
      </div>
      <div className="hidden text-right sm:block">
        {profile?.score != null ? (
          <p className="font-[family-name:var(--font-mono)] text-sm tabular-nums text-[var(--gold)]">
            {profile.score.toLocaleString("es-BO")}
          </p>
        ) : (
          <Badge variant="outline" className="border-white/15 text-white/40">
            Disponible
          </Badge>
        )}
      </div>
    </div>
  );

  if (profile) {
    return (
      <Link href={`/ranking/${rank}`} className="block">
        {content}
      </Link>
    );
  }

  return (
    <Link href="/postular" className="block">
      {content}
    </Link>
  );
}

export function RankingBoard() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("Todos");

  const rows = useMemo(() => {
    let board = buildBoard(role === "Todos" ? null : role);
    const q = query.trim().toLowerCase();
    if (q) {
      board = board.filter(({ profile }) => {
        if (!profile) return false;
        return (
          profile.name.toLowerCase().includes(q) ||
          profile.handle.toLowerCase().includes(q) ||
          profile.roles.some((r) => r.toLowerCase().includes(q)) ||
          (profile.title?.toLowerCase().includes(q) ?? false)
        );
      });
    }
    return board;
  }, [query, role]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, handle o rol…"
          className="border-white/15 bg-white/5 text-[var(--sand)] placeholder:text-white/35 md:max-w-sm"
          aria-label="Buscar en el ranking"
        />
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setRole("Todos")}
            className={cn(
              "shrink-0 rounded-md border px-3 py-1.5 text-xs transition",
              role === "Todos"
                ? "border-[var(--gold)]/50 bg-[var(--gold)]/15 text-[var(--gold)]"
                : "border-white/15 text-[var(--mist)] hover:border-white/30"
            )}
          >
            Todos
          </button>
          {ROLES.slice(0, 10).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={cn(
                "shrink-0 rounded-md border px-3 py-1.5 text-xs transition",
                role === r
                  ? "border-[var(--gold)]/50 bg-[var(--gold)]/15 text-[var(--gold)]"
                  : "border-white/15 text-[var(--mist)] hover:border-white/30"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-[var(--panel)]/70 backdrop-blur">
        {rows.length === 0 ? (
          <p className="px-5 py-16 text-center text-[var(--mist)]">
            No hay resultados para ese filtro.
          </p>
        ) : (
          rows.map(({ rank, profile }) => (
            <SeatRow key={rank} rank={rank} profile={profile} />
          ))
        )}
      </div>
    </div>
  );
}
