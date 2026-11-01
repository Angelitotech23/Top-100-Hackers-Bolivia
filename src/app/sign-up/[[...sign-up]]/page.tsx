import { SignUp } from "@clerk/nextjs"

export const metadata = {
  title: "Crear cuenta",
}

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center px-4 py-16">
      <p className="mb-6 max-w-sm text-center text-sm text-muted-foreground">
        Crea tu cuenta. Después puedes enviar la postulación.
      </p>
      <SignUp />
    </div>
  )
}
