# Inventario del repositorio — Fase 1

**Fecha:** 2026-10-26 (America/La_Paz)  
**Repositorio:** `Angelitotech23/Top-100-Hackers-Bolivia`  
**Rama base:** `main` (working tree limpio al inventariar)  
**Alcance:** solo lectura; sin dependencias ni artefactos excluidos.

---

## 1. Resumen ejecutivo

Este repositorio **no es una aplicación ni un backend**. Es un repo de **documentación + datos** del ranking público **Bolivia 100 Hackers** (temporada 2026). La aplicación web vive en Vercel (`bolivia-100-hackers.vercel.app`) con Clerk; su código **no** está en este árbol.

| Aspecto | Valor observado |
|---------|-----------------|
| Lenguaje principal | Markdown + JSON (datos) |
| Framework / runtime | Ninguno en este repo |
| package.json / requirements / pyproject | Ausentes |
| Dockerfile / .env.example | Ausentes |
| Punto de entrada | `README.md` (índice humano) |
| Pruebas automatizadas | Ninguna |

---

## 2. Árbol de archivos (excluyendo `.git`)

```
/
├── README.md                 # Índice del proyecto
├── REGLAMENTO.md             # Reglamento de puntaje v1.0
├── CONTEXTO.md               # Contexto de producto, stack y snapshot
├── MIGRACION.md              # Inventario de migración (sin secretos)
└── data/
    ├── fuentes.md            # Fuentes consultadas (URLs)
    ├── ranking-2026.md       # Snapshot legible del ranking
    └── ranking-2026.json     # Snapshot estructurado (8 plazas ocupadas)
```

**Total de archivos de contenido:** 7

---

## 3. Archivos de configuración

| Archivo típico | ¿Presente? |
|----------------|------------|
| `package.json` | No |
| `requirements.txt` / `pyproject.toml` | No |
| `Dockerfile` / `docker-compose*` | No |
| `.env` / `.env.example` | No |
| `tsconfig` / `wrangler.toml` / `vercel.json` | No |
| `.gitignore` | No (solo `.git`) |

**Conclusión:** no hay toolchain de build/deploy en este repo.

---

## 4. Puntos de entrada

| Entrada | Tipo | Rol |
|---------|------|-----|
| `README.md` | Documentación | Índice: enlaces al producto, al reglamento y a `data/` |
| `data/ranking-2026.json` | Datos | Snapshot máquina-legible de plazas ocupadas |
| Producto externo | URL | https://bolivia-100-hackers.vercel.app (fuera de este repo) |

No existen `main.py`, `app.ts`, `server.js`, `index.ts`, `manage.py`, etc.

---

## 5. Documentación existente vs. código

| Documento | Qué afirma | Contrastado con el árbol |
|-----------|------------|--------------------------|
| `README.md` | Repo de docs/datos; app en Vercel | Coincide: solo `.md` + JSON |
| `CONTEXTO.md` | Stack de app no está aquí; Clerk + Vercel | Coincide; no hay SDKs |
| `MIGRACION.md` | Sin package.json, sin secretos, 0 tablas | Coincide |
| `REGLAMENTO.md` | Reglas de puntaje v1.0 | Contenido normativo; no ejecutable |
| `data/*` | Snapshot 8/100 plazas (2026-10-26) | JSON y MD alineados en plazas 1–5, 7, 8, 13 |

**Suposición documentada:** el ranking “en vivo” puede divergir del snapshot; este repo es una foto congelada del 2026-10-26, no la fuente operativa de la UI.

---

## 6. Clasificación por capa (adaptada a docs/datos)

| Archivo | Capa | Responsabilidad |
|---------|------|-----------------|
| `README.md` | índice / entrada | Navegación y propósito |
| `REGLAMENTO.md` | gobernanza / reglas | Reglamento de puntaje |
| `CONTEXTO.md` | documentación de producto | Estado, rutas UI, roles, stack |
| `MIGRACION.md` | documentación operativa | Inventario de migración |
| `data/fuentes.md` | datos / metadatos | Citas y URLs de origen |
| `data/ranking-2026.md` | datos (humano) | Snapshot tabular + fichas |
| `data/ranking-2026.json` | datos (máquina) | Mismo snapshot estructurado |

---

## 7. Servicios externos referidos (no implementados aquí)

| Servicio | Evidencia en repo |
|----------|-------------------|
| Vercel (app) | URLs en README, CONTEXTO, fuentes, JSON |
| Clerk (auth) | Mencionado en CONTEXTO / MIGRACION |
| Persistencia (posible Supabase u otro) | Explícitamente “no inventariada” |
| CGII, Hackers.bo, HackerDNA, WeChall | Solo URLs de referencia en `fuentes.md` |

---

## 8. Observaciones para fases siguientes

- No hay imports de código: las “dependencias” son **enlaces Markdown** y **duplicación MD↔JSON** del ranking.
- Reorganización viable: separar `docs/` (normativa/contexto) de `data/seasons/<año>/` (snapshots por temporada).
- No hay suite de tests que ejecutar; la verificación será integridad de enlaces y validez JSON.
