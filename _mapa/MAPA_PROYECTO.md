# Mapa del proyecto — Top 100 Hackers Bolivia

**Fecha:** 2026-10-26 (America/La_Paz)  
**Repo:** `Angelitotech23/Top-100-Hackers-Bolivia`

---

## Propósito

Bolivia 100 Hackers es un ranking de **100 plazas** para visibilizar talento tecnológico boliviano (seguridad autorizada, software, datos/IA, blockchain y roles de apoyo al ecosistema).

Este repositorio es la **fuente de verdad documental**: reglamento de puntaje, contexto de producto, fuentes consultadas y snapshots del ranking. **No** contiene la aplicación web.

La app en producción está en Vercel (`https://bolivia-100-hackers.vercel.app`) con autenticación Clerk. El código de esa app no vive en este árbol.

---

## Estructura antes → después

### Antes

```
/
├── README.md
├── REGLAMENTO.md
├── CONTEXTO.md
├── MIGRACION.md
└── data/
    ├── fuentes.md
    ├── ranking-2026.md
    └── ranking-2026.json
```

### Después

```
/
├── README.md
├── docs/
│   ├── REGLAMENTO.md
│   ├── CONTEXTO.md
│   └── MIGRACION.md
├── data/
│   ├── fuentes.md
│   └── seasons/
│       └── 2026/
│           ├── ranking.md
│           └── ranking.json
└── _mapa/
    ├── 00_inventario.md
    ├── grafo.json
    ├── 03_plan.md
    ├── 04_hallazgos.md
    ├── 05_registro_cambios.md
    └── MAPA_PROYECTO.md
```

---

## Módulos y relaciones

| Módulo | Contenido | Relaciones principales |
|--------|-----------|------------------------|
| **Índice** (`README.md`) | Propósito y tabla de contenidos | Enlaza a `docs/*`, `data/*` y al producto Vercel |
| **docs/** | Reglamento, contexto, migración | CONTEXTO ↔ REGLAMENTO; CONTEXTO → snapshots; MIGRACION inventaría todo |
| **data/** | Fuentes + seasons | `fuentes.md` → URLs externas; `seasons/2026/*` → snapshot dual MD/JSON del tablero |
| **_mapa/** | Análisis de reorganización | Grafo y registro; no es contenido de producto |
| **Externos** | Vercel, Clerk, referencias CGII/Hackers.bo/etc. | Solo citados; no implementados aquí |

Detalle máquina-legible: [`grafo.json`](./grafo.json).

Nodos marcados sospechosos: repo histórico `rank-quest` (404) y CGII muro de fama (404 al inventariar). Duplicación MD↔JSON del ranking: intencional.

---

## Cómo ejecutar, probar y desplegar

| Acción | Estado |
|--------|--------|
| Ejecutar | N/A — no hay runtime ni dependencias en este repo |
| Probar | N/A — sin suite. Verificación aplicada: existencia de rutas del README + `python3 -m json.tool` sobre `data/seasons/2026/ranking.json` |
| Desplegar | N/A para este repo. El producto se despliega desde **otro** proyecto (Vercel). Ver `docs/MIGRACION.md` y `docs/CONTEXTO.md` |

Para **consultar** el ranking en vivo: https://bolivia-100-hackers.vercel.app/ranking  
Para **leer** el snapshot local: `data/seasons/2026/ranking.md` o `.json`.

---

## Riesgos pendientes y cambios no aplicados

- Snapshot puede divergir del tablero en vivo.
- Typo probable en URL del puesto 01 (`raking-…`) — no corregido (H1).
- App y secretos de Vercel/Clerk/BD fuera de alcance.
- Sin CI: roturas de enlaces solo se detectan manualmente.
- No se añadió `src/`, tests ni package.json (no aplican).

Ver [`04_hallazgos.md`](./04_hallazgos.md) y [`05_registro_cambios.md`](./05_registro_cambios.md).
