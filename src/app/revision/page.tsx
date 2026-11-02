import { redirect } from "next/navigation"
import { ReviewForm } from "@/components/review-form"
import { Badge } from "@/components/ui/badge"
import { isAdminUser, listApplications, primaryEmail, requireUser, sortForReview } from "@/lib/applications"
import { RoleChips } from "@/components/role-chips"
import { APPLICATION_STATUS_LABELS } from "@/lib/domain"

export const metadata = {
  title: "Revisión",
}

export default async function ReviewPage() {
  const user = await requireUser()
  if (!user) redirect("/sign-in")
  if (!isAdminUser(user)) {
    return (
      <div className="mx-auto w-full max-w-xl px-4 py-16">
        <h1 className="font-heading text-4xl font-semibold tracking-tight">Mesa de revisión</h1>
        <p className="mt-4 text-muted-foreground">
          Tu cuenta no está en la mesa. Si debes revisar postulaciones, hay que agregar tu correo a la lista de revisión.
        </p>
      </div>
    )
  }

  const applications = sortForReview(await listApplications())
  const reviewerEmail = primaryEmail(user)

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      <p className="font-mono text-xs tracking-[0.22em] text-gold uppercase">Mesa</p>
      <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight">Revisión</h1>
      <p className="mt-3 text-sm text-muted-foreground">Estás revisando como {reviewerEmail}.</p>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        El postulante no elige puesto. Tú asignas el número al aprobar, según habilidades, evidencia y ficha. Vacío
        = primera plaza libre. Observar saca el número y pide correcciones.
      </p>
      {applications.length === 0 ? (
        <p className="mt-8 rounded-xl bg-card px-4 py-8 text-sm text-muted-foreground ring-1 ring-foreground/10">
          Todavía no hay postulaciones.
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {applications.map((application) => (
            <li key={application.userId} className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-heading text-xl">{application.alias}</h2>
                <Badge variant={application.status === "aprobada" ? "default" : "outline"}>
                  {APPLICATION_STATUS_LABELS[application.status]}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {[application.firstName, application.lastName].filter(Boolean).join(" ") || "Sin nombre"} ·{" "}
                {application.email} · {application.years} años · {application.city}, {application.department}
              </p>
              <div className="mt-3">
                <RoleChips roles={application.roles} />
              </div>
              {application.profile?.bio ? (
                <p className="mt-3 text-sm text-muted-foreground">{application.profile.bio}</p>
              ) : null}
              <p className="mt-3 text-sm">{application.achievement}</p>
              {application.handles ? <p className="mt-2 text-sm text-muted-foreground">{application.handles}</p> : null}
              <p className="mt-2 text-sm text-muted-foreground">{application.pitch}</p>
              {application.evidenceUrl ? (
                <a
                  href={application.evidenceUrl}
                  className="mt-2 inline-block text-sm text-primary hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Evidencia
                </a>
              ) : (
                <p className="mt-2 text-sm text-destructive">Esta ficha no tiene un enlace https válido.</p>
              )}
              <ReviewForm userId={application.userId} rank={application.rank} reviewNote={application.reviewNote} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
