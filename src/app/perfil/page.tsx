import { redirect } from "next/navigation"
import { ProfileForm } from "@/components/profile-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { requireUser } from "@/lib/applications"
import { isProfileComplete, readProfile } from "@/lib/domain"

export const metadata = {
  title: "Perfil",
  description: "Completa tu perfil público antes de postular al ranking.",
}

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ aviso?: string }>
}) {
  const user = await requireUser()
  if (!user) redirect("/sign-in")

  const profile = readProfile(user.publicMetadata)
  const params = await searchParams
  const incomplete = !isProfileComplete(profile, user.hasImage)
  const notice =
    params.aviso === "perfil"
      ? "Completa tu perfil antes de postular."
      : incomplete
        ? "Para postular hacen falta bio, LinkedIn y una foto en tu cuenta de Clerk."
        : undefined

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12">
      <p className="font-mono text-xs tracking-[0.22em] text-gold uppercase">Perfil público</p>
      <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight">Tu cara en el tablero</h1>
      <p className="mt-4 text-muted-foreground">
        Esto no pide plaza. La mesa solo ve la ficha cuando postulas. Editar el perfil no te saca del ranking.
      </p>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Datos visibles</CardTitle>
          <CardDescription>
            El título, la bio, el LinkedIn y las redes salen en tu ficha si te aprueban. El nombre real solo si lo marcas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm
            current={profile}
            hasImage={user.hasImage}
            imageUrl={user.hasImage ? user.imageUrl : null}
            notice={notice}
          />
        </CardContent>
      </Card>
    </div>
  )
}
