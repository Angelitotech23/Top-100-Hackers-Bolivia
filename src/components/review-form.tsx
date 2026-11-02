"use client"

import { useActionState } from "react"
import { reviewApplication, type FormState } from "@/app/actions"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const initialState: FormState = { error: "", done: false }

export function ReviewForm({
  userId,
  rank,
  reviewNote,
}: {
  userId: string
  rank: number | null
  reviewNote: string
}) {
  const [state, action, pending] = useActionState(reviewApplication, initialState)

  return (
    <form action={action} className="mt-4 grid gap-3">
      <input type="hidden" name="userId" value={userId} />
      {state.error ? (
        <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}
      <label className="grid gap-1 text-sm">
        Puesto
        <Input
          name="rank"
          type="number"
          min={1}
          max={100}
          defaultValue={rank ?? ""}
          placeholder="Vacío = primera plaza libre. Tú eliges el número."
          className="h-10"
        />
      </label>
      <label className="grid gap-1 text-sm">
        Nota
        <Textarea name="reviewNote" defaultValue={reviewNote} className="min-h-20" />
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          name="decision"
          value="aprobada"
          type="submit"
          disabled={pending}
          className={buttonVariants({ className: "h-10" })}
        >
          {pending ? "Guardando…" : "Aprobar"}
        </button>
        <button
          name="decision"
          value="observada"
          type="submit"
          disabled={pending}
          className={buttonVariants({ variant: "outline", className: "h-10" })}
        >
          Observar
        </button>
      </div>
    </form>
  )
}
