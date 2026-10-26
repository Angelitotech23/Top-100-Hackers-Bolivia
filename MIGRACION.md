# Inventario de migración — Top 100 Hackers Bolivia

**Repositorio:** `Angelitotech23/Top-100-Hackers-Bolivia`  
**Actualizado:** 2026-10-26 (America/La_Paz)

## Estado actual

Este repositorio ahora incluye la **aplicación Next.js** del tablero (App Router, TypeScript, Tailwind):

| Ruta | Rol |
|------|-----|
| `src/app` | Páginas: home, ranking, fichas, código, reglamento, postular |
| `src/data/hackers.ts` | Perfiles ocupados temporada 2026 |
| `src/app/api/applications` | API demo de postulaciones (memoria de proceso) |
| `data/fuentes.md` | Fuentes consultadas |
| `README.md` | Cómo correr el proyecto |

## Auth / datos

- **Clerk / Supabase:** no estánados en este código (postulación demo local).
- **Secretos:** ninguno requerido para `npm run dev`.
- Variables de entorno: ninguna obligatoria.

## Cómo correr

```bash
npm install
npm run dev
```

Puerto por defecto del script: `43127`.

## Pendiente opcional

1. Conectar Clerk si se desea login real (como en el tablero histórico de Vercel).
2. Persistencia (Supabase u otro) para postulaciones y revisión de mesa.
3. Publicar en Vercel y apuntar dominio/alias.
