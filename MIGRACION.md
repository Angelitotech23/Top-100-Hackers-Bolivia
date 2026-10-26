# Inventario de migración — Top 100 Hackers Bolivia

**Repositorio inventariado:** `Angelitotech23/Top-100-Hackers-Bolivia`  
**Fecha del inventario:** 2026-10-26 (America/La_Paz)  
**Alcance:** solo código e historial de este repo. Sin modificar la aplicación, sin migraciones, sin datos de usuarios.

---

## Hallazgo principal

Este repositorio **no contiene la aplicación** desplegable (no hay `package.json`, Next.js, Clerk, Supabase ni migraciones SQL).

Es un repo de **documentación**:

| Ruta | Rol |
|------|-----|
| `README.md` | Descripción breve del incentivo / ranking |
| `data/fuentes.md` | Lista de fuentes y URLs consultadas (metodología) |

La aplicación relacionada se **menciona** en `data/fuentes.md` (tablero en Vercel y un repo de código), pero **ese código no está en este árbol**. Todo lo relativo a stack, env, tablas y Clerk de la app queda marcado como **requiere revisión en el dashboard** o acceso al repo de la aplicación.

---

## 1. Stack detectado y versiones

| Componente | En este repo |
|------------|--------------|
| Next.js | No presente |
| React | No presente |
| Clerk (`@clerk/*`) | No presente |
| Supabase (`@supabase/*`) | No presente |
| `package.json` / lockfile | No presente |
| `next.config.*` | No presente |
| `middleware.ts` / `proxy.ts` | No presente |
| `.env.example` | No presente |
| Carpeta `supabase/` / migraciones | No presente |

**Versiones:** no aplicables (sin dependencias en este repo).

**Referencias externas citadas en código/docs de este repo** (`data/fuentes.md`):

- Tablero desplegado: `https://bolivia-100-hackers.vercel.app` (y rutas `/ranking`, `/codigo`, etc.)
- Repo de aplicación citado: `https://github.com/angelitotzy23/rank-quest` — **no accesible** desde este inventario (404 / sin permiso). **Requiere revisión en el dashboard / acceso al repo de aplicación.**

---

## 2. Variables de entorno requeridas (solo nombres)

### Detectadas en el código de este repo

Ninguna (`process.env.*` / `import.meta.env.*` = 0 coincidencias).

### Agrupación esperada para migrar la *aplicación* (no verificable aquí)

| Grupo | Nombres | Estado |
|-------|---------|--------|
| **Vercel** | (ningún nombre leído en este repo) | **Requiere revisión en el dashboard** del proyecto Vercel vinculado al tablero |
| **Supabase** | (ningún nombre leído en este repo) | **Requiere revisión en el dashboard** / repo de aplicación |
| **Clerk** | (ningún nombre leído en este repo) | **Requiere revisión en el dashboard** / repo de aplicación |

No se listan valores. No se inventan nombres de variables no presentes en este código.

---

## 3. Tablas de Supabase y columnas con IDs de Clerk

**Número de tablas definidas en este repo: 0**

- No hay `supabase/migrations`, SQL de esquema, ni cliente Supabase.
- No hay columnas `user_id` / `clerk_id` / `owner_id` en migraciones locales.
- Funciones, triggers y storage buckets: **ninguno** definido en este código.

Si la app en Vercel usa Supabase u otra persistencia, eso **requiere revisión en el dashboard** y en el repo de aplicación citado en `data/fuentes.md`.

---

## 4. Clerk (desde el código de este repo)

| Elemento | Hallazgo |
|----------|----------|
| `ClerkProvider` | No presente |
| Middleware de auth | No presente |
| Rutas `/sign-in` / `/sign-up` | No definidas en este repo |
| URLs de redirección | No definidas en este repo |
| Proveedores de login (Google, etc.) | No sugeridos por código de este repo |

La existencia de login en el producto publicado se infiere solo por las URLs del tablero en `data/fuentes.md`, no por SDK. **Requiere revisión en el dashboard de Clerk** y en el repo de aplicación.

---

## 5. Puntos de riesgo

| Riesgo | Origen en este repo | Notas |
|--------|---------------------|-------|
| Inventario incompleto para migración Vercel/Supabase/Clerk | Estructura del repo (solo `README.md`, `data/fuentes.md`) | Sin código de app no se pueden listar env, RLS ni remap de `user_xxx` |
| Dependencia de repo de aplicación externo | `data/fuentes.md` (entrada 11) | `angelitotzy23/rank-quest` no inventariable aquí (inaccesible) |
| Dominios/URLs fijas documentadas | `data/fuentes.md` | Host `bolivia-100-hackers.vercel.app` y rutas `/ranking`, `/ranking/N`, `/codigo` — al migrar de cuenta Vercel hay que verificar alias/dominio |
| IDs de Clerk a remapear | — | **No verificable en este repo** (sin columnas ni metadata en código) |
| Claves que cambian al migrar | — | **Requiere revisión en el dashboard** (Vercel env, Clerk keys, Supabase anon/service_role si aplica) |
| RLS / políticas | — | Sin migraciones en este repo |
| Secretos commiteados | Escaneo de working tree + historial (`git rev-list --all`) | **Ningún secreto encontrado** (patrones `sk_`, `pk_`, `eyJ`, `service_role`, `CLERK_SECRET`, `SUPABASE_SERVICE`, claves PEM: 0) |

---

## 6. Pasos manuales pendientes

1. **Vercel:** identificar el proyecto que sirve `bolivia-100-hackers.vercel.app`, inventariar variables (solo nombres) en el dashboard, transferir el proyecto a la cuenta destino y verificar dominio/HTTPS.  
2. **Supabase:** confirmar en dashboard si existe un proyecto ligado a la app; si hay esquema/datos, exportar/transferir y rotar `anon` / `service_role`. **No verificable desde este repo.**  
3. **Clerk:** exportar usuarios desde la instancia que usa la app; mapear `user_xxx` antiguos → nuevos si hay FKs o metadata. **No verificable desde este repo.**  
4. **Repo de aplicación:** obtener acceso a `angelitotzy23/rank-quest` (u otro tip de código) y repetir este inventario sobre ese código.  
5. **Actualizar variables** en la cuenta nueva tras el transfer (sin pegar secretos en git).  
6. **Re-escanear secretos** en el historial del repo de aplicación cuando haya acceso.

---

## 7. Lo no verificado (dashboard / otro repo)

- Nombre exacto del proyecto Vercel y lista completa de env.  
- Existencia real de proyecto Supabase, tablas, RLS, buckets.  
- Instancia Clerk (dev vs production), proveedores OAuth, número de usuarios.  
- Si los IDs `user_xxx` viven en DB, metadata Clerk u otro store.  
- Contenido y secretos del historial de `rank-quest`.  
- Lockfiles y versiones de `@clerk/nextjs`, `@supabase/*`, `next`.

---

## 8. Archivos revisados

| Archivo | Revisado |
|---------|----------|
| `README.md` | Sí |
| `data/fuentes.md` | Sí |
| Historial git (3 commits: `ffc7216`, `f11ed0e`, `fcd052a`) | Sí (scan de patrones sin imprimir valores) |
| `package.json`, `next.config.*`, `.env*`, `supabase/**`, `middleware.ts` | No existen en este repo |

**Commits en historial:**  
`ffc7216` Initial commit · `f11ed0e` docs: metodología, fuentes y plataformas · `fcd052a` Merge PR #1

---

## 9. Verificación de este documento

- [x] Sin valores de secretos  
- [x] Sin filas de datos de usuarios ni del ranking  
- [x] Cada riesgo cita origen en este repo o se marca “requiere revisión en el dashboard”  
- [x] Número de tablas en este código: **0**  
- [x] Nombres de env detectados en código: **(ninguno)**  
- [x] Secretos commiteados: **ninguno encontrado**
