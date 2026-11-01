"use client"

import { UserButton } from "@clerk/nextjs"
import { useActionState } from "react"
import { submitProfile, type FormState } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BIO_MAX, SOCIAL_PLATFORMS, TITLE_MAX, type ProfileRecord } from "@/lib/domain"

const initialState: FormState = { error: "", done: false }
const fieldClass = "h-10"

export function ProfileForm({
  current,
  hasImage,
  imageUrl,
  notice,
}: {
  current: ProfileRecord | null
  hasImage: boolean
  imageUrl: string | null
  notice?: string
}) {
  const [state, action, pending] = useActionState(submitProfile, initialState)
  const socialByPlatform = Object.fromEntries((current?.socialLinks ?? []).map((item) => [item.platform, item.url]))

  return (
    <form action={action} className="grid gap-5">
      {notice ? (
        <p role="status" className="rounded-lg border border-gold/40 bg-gold/10 px-3 py-2 text-sm">
          {notice}
        </p>
      ) : null}
      {state.error ? (
        <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <div className="flex items-center gap-4 rounded-xl bg-muted/40 px-4 py-3">
        {hasImage && imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="Foto de perfil" className="size-16 rounded-full object-cover ring-1 ring-foreground/10" />
        ) : (
          <div className="grid size-16 place-items-center rounded-full bg-card text-xs text-muted-foreground ring-1 ring-foreground/10">
            Sin foto
          </div>
        )}
        <div className="min-w-0 flex-1 text-sm">
          <p className="font-medium">Foto de Clerk</p>
          <p className="text-muted-foreground">
            {hasImage
              ? "Esta es la imagen de tu cuenta. Cámbiala desde el menú de usuario."
              : "Sube una foto desde el menú de tu cuenta. Sin foto no puedes postular."}
          </p>
        </div>
        <UserButton />
      </div>

      <label className="flex items-start gap-3 text-sm leading-5">
        <input
          name="showRealName"
          type="checkbox"
          defaultChecked={current?.showRealName ?? false}
          className="mt-0.5 size-4 accent-primary"
        />
        <span>Mostrar mi nombre real de Clerk junto al alias en el tablero.</span>
      </label>

      <div className="grid gap-2">
        <Label htmlFor="title">Título público</Label>
        <Input
          id="title"
          name="title"
          maxLength={TITLE_MAX}
          defaultValue={current?.title ?? ""}
          className={fieldClass}
          placeholder="Ej. Founder, Team Zephy · Co-founder, YAIS Lab"
        />
        <p className="text-xs text-muted-foreground">Opcional. Cargo o comunidad, no un puesto del ranking. Máximo {TITLE_MAX} caracteres.</p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          required
          maxLength={BIO_MAX}
          defaultValue={current?.bio ?? ""}
          placeholder="Quién eres en la escena boliviana, en pocas líneas."
          className="min-h-28"
        />
        <p className="text-xs text-muted-foreground">Máximo {BIO_MAX} caracteres. Queda visible en tu ficha.</p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="linkedinUrl">LinkedIn</Label>
        <Input
          id="linkedinUrl"
          name="linkedinUrl"
          type="url"
          required
          defaultValue={current?.linkedinUrl ?? ""}
          className={fieldClass}
          placeholder="https://www.linkedin.com/in/tu-perfil"
        />
      </div>

      <fieldset className="grid gap-3">
        <legend className="text-sm font-medium">Otras redes (opcional)</legend>
        {SOCIAL_PLATFORMS.map((item) => (
          <div key={item.id} className="grid gap-2">
            <Label htmlFor={`social_${item.id}`}>{item.label}</Label>
            <Input
              id={`social_${item.id}`}
              name={`social_${item.id}`}
              type="url"
              defaultValue={socialByPlatform[item.id] ?? ""}
              className={fieldClass}
              placeholder="https://"
            />
          </div>
        ))}
      </fieldset>

      <Button type="submit" disabled={pending} className="h-10">
        {pending ? "Guardando…" : "Guardar perfil"}
      </Button>
    </form>
  )
}
