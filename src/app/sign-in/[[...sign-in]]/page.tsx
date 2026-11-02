import { SignIn } from "@clerk/nextjs"

export const metadata = {
  title: "Entrar",
}

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center px-4 py-16">
      <p className="mb-6 max-w-sm text-center text-sm text-muted-foreground">
        Entra para postular al top 100 de hackers de Bolivia.
      </p>
      <SignIn />
    </div>
  )
}
