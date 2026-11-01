import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ApplyForm } from "@/components/apply-form"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { requireUser } from "@/lib/applications"
import { isProfileComplete, readApplication, readProfile } from "@/lib/domain"

export const metadata = {
  title: "Postular",
  description: "Envía tu postulación al ranking de hackers de Bolivia.",
}

export default async function ApplyPage() {
  const { userId } = await auth()

  if (!userId) {
    return (
      <div className="mx-auto w-full max-w-xl px-4 py-16">
        <p className="font-mono text-xs tracking-[0.22em] text-gold uppercase">Postulación</p>
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight">Primero entra.</h1>
        <p className="mt-4 text-muted-foreground">
          El ranking solo recibe postulaciones de una sesión iniciada. Crea tu cuenta o entra con la que ya tienes.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/sign-in" className={buttonVariants({ className: "h-10 px-4" })}>
            Entrar
          </Link>
          <Link href="/sign-up" className={buttonVariants({ variant: "outline", className: "h-10 px-4" })}>
            Crear cuenta
          </Link>
        </div>
      </div>
    )
  }

  const user = await requireUser()
  if (!user) redirect("/sign-in")
  if (!isProfileComplete(readProfile(user.publicMetadata), user.hasImage)) {
    redirect("/perfil?aviso=perfil")
  }
  const current = readApplication(user.publicMetadata, user.privateMetadata)

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12">
      <p className="font-mono text-xs tracking-[0.22em] text-gold uppercase">Postulación</p>
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight">Postula al ranking</h1>
        <p className="mt-4 text-muted-foreground">
        Envías una ficha, no un número. La mesa mira alias, logro, evidencia y perfil, y recién ahí te asigna un
        puesto — o te observa. Si ya estabas en el tablero y actualizas la ficha, sales hasta una nueva aprobación.
      </p>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Ficha pública</CardTitle>
          <CardDescription>El alias, el logro y la evidencia pueden verse si entras al ranking. El texto de motivación no se publica.</CardDescription>
        </CardHeader>
        <CardContent>
          <ApplyForm current={current} />
        </CardContent>
      </Card>
    </div>
  )
}
