# Registro de cambios — Fase 4

**Rama:** `cursor/reorganizar-mapa-docs-2d6c`  
**Fecha:** 2026-10-26 (America/La_Paz)  
**Estado previo:** working tree limpio en `main` antes de crear la rama.

---

## Lote A — Mover documentación a `docs/`

| Archivo original | Archivo nuevo | Motivo | Pruebas |
|------------------|---------------|--------|---------|
| `REGLAMENTO.md` | `docs/REGLAMENTO.md` | Agrupar normativa | N/A (sin suite). Verificado: archivo existe tras `git mv`. |
| `CONTEXTO.md` | `docs/CONTEXTO.md` | Agrupar docs de producto | Idem |
| `MIGRACION.md` | `docs/MIGRACION.md` | Agrupar docs operativos | Idem |

**Resultado:** OK

---

## Lote B — Snapshots por temporada

| Archivo original | Archivo nuevo | Motivo | Pruebas |
|------------------|---------------|--------|---------|
| `data/ranking-2026.md` | `data/seasons/2026/ranking.md` | Estructura escalable por año | N/A. Archivo existe. |
| `data/ranking-2026.json` | `data/seasons/2026/ranking.json` | Par dual-format | `python3 -m json.tool` → OK |

**Resultado:** OK

---

## Lote C — Actualizar rutas / enlaces

| Archivo | Cambio | Motivo | Pruebas |
|---------|--------|--------|---------|
| `README.md` | Enlaces a `docs/*` y `data/seasons/2026/*`; enlace a `_mapa/MAPA_PROYECTO.md` | Mantener índice coherente | Todos los destinos del índice existen (salvo MAPA creado en Fase 5) |
| `docs/CONTEXTO.md` | Rutas a ranking y reglamento | Paths relativos/repo tras move | Grep sin referencias rotas a `ranking-2026` |
| `docs/MIGRACION.md` | Tabla de rutas actualizada | Inventario alineado | Idem |

**Resultado:** OK — sin referencias rotas a rutas antiguas en archivos de producto.

---

## Artefactos `_mapa/` (análisis)

| Archivo | Acción |
|---------|--------|
| `_mapa/00_inventario.md` | Creado (estado pre-reorg) |
| `_mapa/grafo.json` | Creado y actualizado post-reorg |
| `_mapa/03_plan.md` | Creado |
| `_mapa/04_hallazgos.md` | Creado |
| `_mapa/05_registro_cambios.md` | Este archivo |
| `_mapa/MAPA_PROYECTO.md` | Documento final Fase 5 |

---

## No aplicado / no tocado

- Secretos / `.env`: no existían.
- Contenido de plazas, bios, scores: sin cambios.
- Corrección del typo `raking-Bolivia-100` (ver hallazgos H1).
- Código de la app Vercel: fuera de este repo.
