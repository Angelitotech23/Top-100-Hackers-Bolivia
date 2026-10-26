# Plan de reorganización — Fase 3

**Fecha:** 2026-10-26 (America/La_Paz)  
**Tipo de proyecto:** documentación + datos (sin código ejecutable)  
**Principio:** no inventar capas de `src/api` / `services` que no aplican; organizar por dominio real.

---

## 1. Estructura objetivo

```
/
├── README.md                          # Índice (permanece en raíz)
├── docs/                              # Documentación normativa y de producto
│   ├── REGLAMENTO.md
│   ├── CONTEXTO.md
│   └── MIGRACION.md
├── data/                              # Datos y metadatos
│   ├── fuentes.md
│   └── seasons/
│       └── 2026/
│           ├── ranking.md             # ex ranking-2026.md
│           └── ranking.json           # ex ranking-2026.json
└── _mapa/                            # Artefactos de este análisis
    ├── 00_inventario.md
    ├── grafo.json
    ├── 03_plan.md
    ├── 04_hallazgos.md
    ├── 05_registro_cambios.md
    └── MAPA_PROYECTO.md
```

### Por qué esta estructura

| Carpeta | Motivo |
|---------|--------|
| `docs/` | Separa reglas/contexto/migración del índice y de los datos |
| `data/seasons/YYYY/` | Escala a nuevas temporadas sin archivos `ranking-YYYY.*` sueltos |
| `README.md` en raíz | Convención GitHub: punto de entrada visible |
| `_mapa/` | Trazabilidad del análisis sin mezclarse con docs de producto |

**No se crean** `src/`, `tests/`, `scripts/` ni `package.json`: no hay código que colocar ahí.

---

## 2. Movimientos previstos

Ordenados por **prioridad** (1 = primero) y **riesgo** (bajo → medio).

| # | Origen | Destino | Motivo | Enlaces / “imports” a actualizar | Riesgo |
|---|--------|---------|--------|----------------------------------|--------|
| 1 | `MIGRACION.md` | `docs/MIGRACION.md` | Agrupar docs; pocas referencias internas de contenido | `README.md` tabla de contenido | Bajo |
| 2 | `CONTEXTO.md` | `docs/CONTEXTO.md` | Idem | `README.md`; rutas internas a `data/` y `REGLAMENTO.md` | Bajo |
| 3 | `REGLAMENTO.md` | `docs/REGLAMENTO.md` | Idem | `README.md`, `docs/CONTEXTO.md` | Bajo |
| 4 | `data/ranking-2026.md` | `data/seasons/2026/ranking.md` | Agrupar por temporada | `README.md`, `docs/CONTEXTO.md`, `docs/MIGRACION.md` | Medio (más refs) |
| 5 | `data/ranking-2026.json` | `data/seasons/2026/ranking.json` | Par con el MD | Mismos + coherencia dual-format | Medio |
| 6 | — | Actualizar `README.md` y docs | Corregir todas las rutas relativas | — | Bajo (solo paths) |
| 7 | — | Actualizar `_mapa/grafo.json` rutas post-move | Mantener mapa alineado | — | Bajo |

`data/fuentes.md` **permanece** en `data/` (metadatos transversales a temporadas).

---

## 3. Actualizaciones de enlaces por archivo

### `README.md`
- `./REGLAMENTO.md` → `./docs/REGLAMENTO.md`
- `./CONTEXTO.md` → `./docs/CONTEXTO.md`
- `./MIGRACION.md` → `./docs/MIGRACION.md`
- `./data/ranking-2026.md` → `./data/seasons/2026/ranking.md`
- `./data/ranking-2026.json` → `./data/seasons/2026/ranking.json`

### `docs/CONTEXTO.md` (tras mover)
- `data/ranking-2026.md` → `../data/seasons/2026/ranking.md`
- `data/ranking-2026.json` → `../data/seasons/2026/ranking.json`
- `REGLAMENTO.md` → `./REGLAMENTO.md` (mismo directorio)

### `docs/MIGRACION.md` (tras mover)
- Rutas de inventario: `docs/*` y `data/seasons/2026/*`

### `docs/REGLAMENTO.md`
- Sin enlaces relativos a otros archivos del repo (solo menciones al sitio). Sin cambios de path esperados.

### Snapshots `ranking.md` / `ranking.json`
- Contenido de datos sin rutas relativas entre sí; sin cambio de lógica.

---

## 4. Salvaguardas (Fase 4)

1. Verificar working tree limpio → crear rama `cursor/reorganizar-mapa-docs-2d6c`.
2. Lotes: (A) mover docs, (B) mover seasons, (C) actualizar enlaces.
3. Verificación por lote: `git status`, `python3 -m json.tool` sobre JSON, comprobación de que cada destino existe y los links del README resuelven.
4. Sin pruebas unitarias en el repo → registrar “N/A (sin suite)” y no inventar tests.
5. No tocar secretos (no hay `.env`).
6. No corregir bugs de contenido (p. ej. typo `raking-Bolivia-100`); solo reportar en hallazgos.

---

## 5. Fuera de alcance (no aplicar)

- Migrar o clonar el código de la app Vercel.
- Regenerar el ranking desde la API.
- Renombrar handles/nombres en el JSON.
- Añadir CI, linters o dependencias.
