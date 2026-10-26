# Inventario de migración — Top 100 Hackers Bolivia

**Repositorio inventariado:** `Angelitotech23/Top-100-Hackers-Bolivia`  
**Fecha:** 2026-10-26 (America/La_Paz)  
**Alcance:** documentación y datos de este repo. Sin secretos ni datos privados de usuarios.  
**Nota de estructura:** tras reorganización 2026-10-26, la documentación vive en `docs/` y los snapshots por temporada en `data/seasons/<año>/`.

---

## Hallazgo principal

Este repositorio es de **documentación y datos del ranking**, no de la aplicación desplegable.

| Ruta | Rol |
|------|-----|
| `README.md` | Índice del proyecto |
| `docs/REGLAMENTO.md` | Reglamento de puntaje v1.0 |
| `docs/CONTEXTO.md` | Contexto de producto, plazas y stack |
| `data/fuentes.md` | Fuentes y URLs |
| `data/seasons/2026/ranking.md` | Snapshot legible |
| `data/seasons/2026/ranking.json` | Snapshot estructurado |
| `docs/MIGRACION.md` | Este inventario |
| `_mapa/` | Mapa de reorganización y grafo de relaciones |

La app en producción está en **Vercel**: `https://bolivia-100-hackers.vercel.app` (Clerk). El código de esa app **no** está en este árbol.

---

## 1. Stack en este repo

| Componente | Presente |
|------------|----------|
| Next.js / React / package.json | No |
| Clerk / Supabase SDK | No |
| Migraciones SQL | No |
| `.env*` | No |

---

## 2. Variables de entorno

Ninguna en este código. Las de la app en Vercel/Clerk/Supabase **requieren revisión en el dashboard** (no se listan valores).

---

## 3. Tablas / IDs Clerk

**0 tablas** definidas aquí. Remap de `user_xxx` no verificable desde este repo.

---

## 4. Secretos en historial

Escaneo de patrones comunes en este repo: **ningún secreto encontrado** (no imprimir valores).

---

## 5. Pasos manuales si se migra la *app* (otro repo / Vercel)

1. Identificar proyecto Vercel de `bolivia-100-hackers.vercel.app`.  
2. Inventariar env solo por **nombres** en el dashboard.  
3. Confirmar Clerk (export usuarios) y persistencia si existe.  
4. Obtener acceso al repo real de la aplicación.  
5. No pegar secretos en git.

---

## 6. Archivos revisados

README, docs/CONTEXTO, docs/REGLAMENTO, data/*, historial de docs. Sin `package.json` ni código de app en el estado actual del repo.
