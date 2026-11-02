import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { isAdminUser, requireUser } from "@/lib/applications"
import { buttonVariants } from "@/components/ui/button"

export async function SiteHeader() {
  const user = await requireUser()
  const admin = isAdminUser(user)

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3">
        <Link href="/" className="mr-auto flex items-center gap-2 font-heading text-sm font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-md bg-primary font-mono text-xs text-primary-foreground">
            100
          </span>
          Bolivia Hackers
        </Link>
        <nav className="flex flex-wrap items-center gap-1 text-sm">
          <Link href="/ranking" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Ranking
          </Link>
          <Link href="/reglamento" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Reglamento
          </Link>
          <Link href="/postular" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Postular
          </Link>
          {user ? (
            <Link href="/perfil" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              Perfil
            </Link>
          ) : null}
          {user ? (
            <Link href="/mi-postulacion" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              Mi postulación
            </Link>
          ) : null}
          {admin ? (
            <Link href="/revision" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              Revisión
            </Link>
          ) : null}
        </nav>
        {user ? (
          <UserButton />
        ) : (
          <Link href="/sign-in" className={buttonVariants({ size: "sm" })}>
            Entrar
          </Link>
        )}
      </div>
    </header>
  )
}
