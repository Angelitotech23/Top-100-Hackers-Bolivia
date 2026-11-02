"use client"

import { useActionState } from "react"
import { submitApplication, type FormState } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DEPARTMENTS, ROLES, ROLES_MAX, type ApplicationRecord } from "@/lib/domain"
import { nativeControlClassName } from "@/lib/utils"

const initialState: FormState = { error: "", done: false }

const fieldClass = "h-10"

export function ApplyForm({ current }: { current: ApplicationRecord | null }) {
  const [state, action, pending] = useActionState(submitApplication, initialState)

  return (
    <form action={action} className="grid gap-5">
      {state.error ? (
        <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}
      <div className="grid gap-2">
        <Label htmlFor="alias">Alias público</Label>
        <Input id="alias" name="alias" required defaultValue={current?.alias ?? ""} className={fieldClass} placeholder="Ej. ande.null" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="department">Departamento</Label>
          <select
            id="department"
            name="department"
            required
            defaultValue={current?.department ?? ""}
            className={nativeControlClassName}
          >
            <option value="" disabled className="bg-background text-foreground">
              Elige uno
            </option>
            {DEPARTMENTS.map((item) => (
              <option key={item} value={item} className="bg-background text-foreground">
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="city">Ciudad</Label>
          <Input id="city" name="city" required defaultValue={current?.city ?? ""} className={fieldClass} placeholder="El Alto" />
        </div>
      </div>
      <fieldset className="grid gap-3">
        <legend className="text-sm font-medium">Roles</legend>
        <p className="text-sm text-muted-foreground">Marca entre 1 y {ROLES_MAX}. Lo que haces, no un puesto del tablero.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {ROLES.map((item) => (
            <label key={item.id} className="flex items-start gap-2 text-sm leading-5">
              <input
                type="checkbox"
                name="roles"
                value={item.id}
                defaultChecked={current?.roles?.includes(item.id)}
                className="mt-0.5 size-4 accent-primary"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-2">
          <Label htmlFor="years">Años de trayectoria</Label>
          <Input
            id="years"
            name="years"
            type="number"
            min={0}
            max={60}
            required
            defaultValue={current?.years ?? 1}
            className={fieldClass}
          />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="handles">Handles públicos</Label>
        <Input
          id="handles"
          name="handles"
          required
          defaultValue={current?.handles ?? ""}
          className={fieldClass}
          placeholder="github.com/tu-usuario · CTFtime · HackerOne"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="achievement">Logro público</Label>
        <Textarea
          id="achievement"
          name="achievement"
          required
          minLength={20}
          defaultValue={current?.achievement ?? ""}
          placeholder="Final nacional de CTF, reporte aceptado en un programa autorizado, CVE propio, herramienta open source o charla pública."
          className="min-h-24"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="pitch">Por qué entras al top 100</Label>
        <Textarea
          id="pitch"
          name="pitch"
          required
          minLength={40}
          defaultValue={current?.pitch ?? ""}
          placeholder="Qué aportas a la escena boliviana y qué quieres demostrar esta temporada."
          className="min-h-28"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="evidenceUrl">Enlace de evidencia</Label>
        <Input
          id="evidenceUrl"
          name="evidenceUrl"
          type="url"
          required
          defaultValue={current?.evidenceUrl ?? ""}
          className={fieldClass}
          placeholder="https://"
        />
      </div>
      <label className="flex items-start gap-3 text-sm leading-5">
        <input name="conduct" type="checkbox" required className="mt-0.5 size-4 accent-primary" />
        <span>
          Acepto el código: mi lugar se sostiene en CTF, bug bounty autorizado, investigación, defensa o
          proyectos propios. No postulo por accesos no autorizados.
        </span>
      </label>
      <Button type="submit" disabled={pending} className="h-10">
        {pending ? "Enviando…" : current ? "Actualizar postulación" : "Enviar postulación"}
      </Button>
    </form>
  )
}
