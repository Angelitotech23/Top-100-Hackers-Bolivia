import Link from "next/link"
import { redirect } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { requireUser } from "@/lib/applications"
import {
  APPLICATION_STATUS_LABELS,
  isProfileComplete,
  publicDisplayName,
  rankLabel,
  readApplication,
  readProfile,
  socialLabel,
} from "@/lib/domain"
import { RoleChips } from "@/components/role-chips"

export const metadata = {
  title: "Mi postulación",
}

export default async function MyApplicationPage() {
  const user = await requireUser()
  if (!user) redirect("/sign-in")
  const application = readApplication(user.publicMetadata, user.privateMetadata)
  const profile = readProfile(user.publicMetadata)
  const complete = isProfileComplete(profile, user.hasImage)
  const name = application
    ? publicDisplayName(application.alias, profile, user)
    : publicDisplayName(user.firstName || "Tu perfil", profile, user)

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12">
      <p className="font-mono text-xs tracking-[0.22em] text-gold uppercase">Tu ficha</p>
      <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight">Mi postulación</h1>

      <div className="mt-8 space-y-4 rounded-xl bg-card p-6 ring-1 ring-foreground/10">
        <div className="flex items-center gap-4">
          {user.hasImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.imageUrl} alt="" className="size-14 rounded-full object-cover ring-1 ring-foreground/10" />
          ) : (
            <div className="grid size-14 place-items-center rounded-full bg-muted text-xs text-muted-foreground">
              Sin foto
            </div>
          )}
          <div>
            <h2 className="font-heading text-2xl">{application ? name : "Perfil"}</h2>
            {profile?.title ? <p className="text-sm text-muted-foreground">{profile.title}</p> : null}
            {application ? <Badge>{APPLICATION_STATUS_LABELS[application.status]}</Badge> : null}
          </div>
        </div>
        {profile?.bio ? <p className="text-muted-foreground">{profile.bio}</p> : null}
        {profile?.linkedinUrl ? (
          <a href={profile.linkedinUrl} className="block text-sm text-primary hover:underline" rel="noreferrer" target="_blank">
            LinkedIn
          </a>
        ) : null}
        {profile?.socialLinks.map((link) => (
          <a
            key={`${link.platform}-${link.url}`}
            href={link.url}
            className="block text-sm text-primary hover:underline"
            rel="noreferrer"
            target="_blank"
          >
            {socialLabel(link.platform)}
          </a>
        ))}
        <Link href="/perfil" className={buttonVariants({ variant: "outline", className: "h-10 px-4" })}>
          {complete ? "Editar perfil" : "Completar perfil"}
        </Link>
      </div>

      {!application ? (
        <div className="mt-4 rounded-xl bg-card p-6 ring-1 ring-foreground/10">
          <p>Todavía no enviaste una ficha.</p>
          <Link
            href={complete ? "/postular" : "/perfil?aviso=perfil"}
            className={buttonVariants({ className: "mt-4 h-10 px-4" })}
          >
            {complete ? "Postular" : "Completa el perfil para postular"}
          </Link>
        </div>
      ) : (
        <div className="mt-4 space-y-4 rounded-xl bg-card p-6 ring-1 ring-foreground/10">
          <RoleChips roles={application.roles} />
          <p className="text-sm text-muted-foreground">
            {application.city}, {application.department}
          </p>
          <p>{application.achievement}</p>
          {application.status === "aprobada" && application.rank ? (
            <p className="font-mono text-gold">Puesto {rankLabel(application.rank)}</p>
          ) : null}
          {application.reviewNote ? (
            <p className="text-sm text-muted-foreground">Nota de revisión: {application.reviewNote}</p>
          ) : null}
          <Link href="/postular" className={buttonVariants({ variant: "outline", className: "h-10 px-4" })}>
            Editar ficha
          </Link>
        </div>
      )}
    </div>
  )
}
