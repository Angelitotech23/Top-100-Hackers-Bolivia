import { clerkMiddleware } from "@clerk/nextjs/server"

function isProtectedPath(pathname: string) {
  return (
    pathname === "/mi-postulacion" ||
    pathname.startsWith("/mi-postulacion/") ||
    pathname === "/perfil" ||
    pathname.startsWith("/perfil/") ||
    pathname === "/revision" ||
    pathname.startsWith("/revision/")
  )
}

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedPath(req.nextUrl.pathname)) await auth.protect()
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|pptx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
