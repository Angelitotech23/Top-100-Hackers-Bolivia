"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { OpenSeatRow } from "@/components/open-seat"
import { RoleChips } from "@/components/role-chips"
import { Input } from "@/components/ui/input"
import { ROLES, rankLabel, type RoleId, type Seat } from "@/lib/domain"

export function RankBoard({ seats, signedIn }: { seats: Seat[]; signedIn: boolean }) {
  const [query, setQuery] = useState("")
  const [roles, setRoles] = useState<RoleId[]>([])

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return seats.filter((seat) => {
      if (roles.length > 0) {
        if (seat.open || !seat.roles.some((role) => roles.includes(role))) return false
      }
      if (!needle) return true
      const haystack = [
        seat.alias,
        seat.displayName,
        seat.title,
        seat.city,
        seat.department,
        seat.achievement,
        seat.handles,
        ...seat.roleLabels,
        seat.bio,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
      return haystack.includes(needle)
    })
  }, [query, roles, seats])

  function toggleRole(id: RoleId) {
    setRoles((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Busca alias, ciudad o logro"
        aria-label="Buscar en el ranking"
        className="h-10"
      />
      <fieldset>
        <legend className="mb-2 text-sm font-medium">Roles</legend>
        <div className="flex flex-wrap gap-2">
          {ROLES.map((item) => {
            const active = roles.includes(item.id)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleRole(item.id)}
                aria-pressed={active}
                className={
                  active
                    ? "rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground"
                    : "rounded-full bg-card px-3 py-1 text-xs text-muted-foreground ring-1 ring-foreground/12"
                }
              >
                {item.label}
              </button>
            )
          })}
        </div>
        {roles.length > 0 ? (
          <button type="button" onClick={() => setRoles([])} className="mt-2 text-xs text-primary hover:underline">
            Limpiar filtros
          </button>
        ) : null}
      </fieldset>
      <p className="text-sm text-muted-foreground">
        {visible.length} {visible.length === 1 ? "fila" : "filas"} en esta vista.
      </p>
      <ol className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
        {visible.length === 0 ? (
          <li className="bg-card px-4 py-10 text-sm text-muted-foreground">
            {roles.length > 0 && !query.trim()
              ? "Nadie ocupó todavía una plaza con esos roles. La postulación sigue abierta."
              : "Ninguna plaza coincide con esa búsqueda."}
          </li>
        ) : (
          visible.map((seat) => (
            <li
              key={seat.rank}
              className={
                seat.open
                  ? "border-b border-dashed border-primary/20 bg-card/30 last:border-b-0"
                  : "border-b border-border/80 bg-card last:border-b-0"
              }
            >
              {seat.open ? (
                <OpenSeatRow rank={seat.rank} signedIn={signedIn} />
              ) : (
                <Link
                  href={`/ranking/${seat.rank}`}
                  className="lift grid gap-2 px-4 py-3 sm:grid-cols-[4.5rem_1fr_auto] sm:items-center"
                >
                  <span className="font-mono text-lg text-gold">{rankLabel(seat.rank)}</span>
                  <span className="flex min-w-0 items-center gap-3">
                    {seat.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={seat.imageUrl} alt="" className="size-8 shrink-0 rounded-full object-cover ring-1 ring-foreground/10" />
                    ) : null}
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{seat.displayName ?? seat.alias}</span>
                      {seat.title ? (
                        <span className="block truncate text-sm text-foreground/80">{seat.title}</span>
                      ) : null}
                      <span className="block truncate text-sm text-muted-foreground">
                        {seat.city}, {seat.department}
                      </span>
                    </span>
                  </span>
                  <RoleChips roles={seat.roles} limit={2} className="justify-end" />
                </Link>
              )}
            </li>
          ))
        )}
      </ol>
    </div>
  )
}
