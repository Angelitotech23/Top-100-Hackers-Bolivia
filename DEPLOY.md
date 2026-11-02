# Despliegue — Bolivia 100 Hackers

Guía para volver a desplegar esta aplicación en otra cuenta de Vercel de forma casi idéntica al proyecto original `bolivia-100-hackers`.

## Proyecto y framework

| Campo | Valor |
| --- | --- |
| Nombre del producto | Bolivia 100 Hackers (paquete npm: `ranking-bolivia-100`) |
| Proyecto Vercel original | `bolivia-100-hackers` |
| Framework | **Next.js** `16.4.2` (App Router) |
| Runtime / Node | **24.x** en el proyecto Vercel original (`.nvmrc` = `24`; `engines.node` ≥ 20.9) |
| Auth / datos | **Clerk** (`@clerk/nextjs`). El ranking vive en metadatos de usuarios Clerk. |
| Base de datos | No usada por el código actual. En Vercel original había variables `NEXT_PUBLIC_SUPABASE_*` sin uso en el código. |

## Comandos y salida

| Paso | Comando / valor |
| --- | --- |
| Instalación | `npm install` |
| Build | `npm run build` |
| Start (local post-build) | `npm run start` |
| Dev | `npm run dev` |
| Directorio de salida | `.next` (gestionado por Vercel para Next.js; no configurar `outputDirectory` estático) |

En el dashboard de Vercel, deja Framework Preset = **Next.js**. No hace falta Build Command / Output Directory custom salvo que quieras forzar `npm run build`.

## Variables de entorno

Configura **los mismos nombres** en la cuenta nueva. **No copies valores desde este repositorio** (aquí solo hay nombres).

Todas estaban definidas en el proyecto original para **Production**, **Preview** y **Development**:

| Variable | Entornos | Para qué sirve |
| --- | --- | --- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Production, Preview, Development | Clave pública de Clerk |
| `CLERK_SECRET_KEY` | Production, Preview, Development | Clave secreta de Clerk (servidor) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Production, Preview, Development | Ruta de sign-in (`/sign-in`) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Production, Preview, Development | Ruta de sign-up (`/sign-up`) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | Production, Preview, Development | Redirect tras login (`/postular`) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | Production, Preview, Development | Redirect tras registro (`/postular`) |
| `RANKING_ADMIN_EMAILS` | Production, Preview, Development | Correos admin de `/revision`, separados por coma |
| `NEXT_PUBLIC_SUPABASE_URL` | Production, Preview, Development | Presente en Vercel original; **no usada por el código actual** |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production, Preview, Development | Presente en Vercel original; **no usada por el código actual** |

Plantilla vacía: [`.env.example`](./.env.example).

### Clerk (cuenta nueva)

1. Crea o reclama una aplicación Clerk (el producto original usaba claves de tipo desarrollo `*_test_*` en el proyecto observado).
2. Habilita los mismos métodos de login (correo / Google, según tu dashboard).
3. Añade el dominio `*.vercel.app` (y el custom, si hay) a Allowed Origins / Domains.
4. Pega publishable + secret keys en Vercel.
5. Los datos del ranking están en `publicMetadata` / `privateMetadata` de usuarios Clerk: migrar usuarios implica export/import o recreación; los IDs `user_*` cambian entre instancias.

## Dominios del proyecto original

| Dominio | Notas |
| --- | --- |
| `bolivia-100-hackers.vercel.app` | Dominio de producción del proyecto original |
| `bolivia-100-hackers-jangelitogames33-9362s-projects.vercel.app` | Alias del team en Vercel |
| Dominio custom (DNS propio) | **No había** en el proyecto original al inventariar |

La cuenta nueva obtendrá un `*.vercel.app` distinto hasta que reasignes el nombre de proyecto o un dominio custom.

## Crons, funciones y config especial

| Ítem | Estado en el original |
| --- | --- |
| Crons | Ninguno |
| `functions` / memoria / duración custom en `vercel.json` | Ninguno |
| Headers custom | Ninguno |
| Rewrites | Ninguno |
| Redirects | `/codigo` → `/reglamento` (comportamiento en producción; documentado en `vercel.json` y en `src/app/codigo/page.tsx`) |
| Middleware | `src/proxy.ts` con `clerkMiddleware` (convención Next.js 16) |
| Server Actions | `src/app/actions.ts` (perfil, postulación, revisión) |
| Password / SSO protection Vercel | Desactivados |
| Region de deploys observada | `iad1` |

Archivo [`vercel.json`](./vercel.json): framework Next.js + redirect de `/codigo`.

## Pasos para importar en una cuenta nueva de Vercel

1. En GitHub, asegúrate de tener esta rama/`main` con el código de la app (este repo) y haz merge si revisas desde un PR.
2. Entra a [vercel.com](https://vercel.com) con la cuenta destino → **Add New… → Project**.
3. **Import** el repositorio `Angelitotech23/Top-100-Hackers-Bolivia` (o el fork en tu cuenta).
4. Framework Preset: **Next.js**. Root Directory: `.` (raíz). Install: `npm install`. Build: `npm run build`. Node.js: **24.x** (o la del `.nvmrc`).
5. En **Environment Variables**, crea una por una las de la tabla de arriba para Production, Preview y Development. Usa valores de tu Clerk (y Supabase solo si quieres paridad; el código no las lee hoy).
6. Deploy. Anota la URL `*.vercel.app` generada.
7. En el dashboard de **Clerk**, añade esa URL a dominios permitidos y actualiza redirects si hace falta.
8. Pon al menos un correo real en `RANKING_ADMIN_EMAILS` y redespliega si lo cambias después del primer deploy.
9. Prueba: `/`, `/ranking`, `/reglamento`, sign-in, `/perfil`, `/postular`, `/mi-postulacion`, `/revision` (con admin).
10. (Opcional) Asigna un dominio custom y vuelve a actualizar Clerk.

## Documentación adicional en este repo

- `docs/` — reglamento, contexto e inventario histórico
- `data/` — snapshots del ranking
- `_mapa/` — mapa de reorganización documental

## Notas de paridad con el despliegue original

- El código de la app **no** estaba en este repo de GitHub hasta la rama de preparación de despliegue; el sitio en Vercel se alimentaba del árbol Next.js (despliegues sin metadatos Git visibles / CLI).
- En producción original existía `/reglamento` y `/codigo` redirigía allí; `/descargar` **no** estaba en ese deploy (sí está en este árbol de código).
- Había un proyecto Supabase “Raking 100 bolivia” y variables en Vercel, pero **0 uso** en el código Next.js; las tablas remotas estaban vacías de postulantes al inventariar.
