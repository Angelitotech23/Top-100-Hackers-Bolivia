# Bolivia 100 Hackers

Ranking de **100 plazas** para referentes del ecosistema tecnológico boliviano: seguridad ofensiva y defensiva (autorizada), desarrollo, datos/IA, blockchain y roles de apoyo (educación, producto, comunidad, legal, emprendimiento).

Un incentivo para revivir la competencia tecnológica y dar más alcance y visibilidad a nuestros talentos.

> **Este repositorio es de documentación y datos.** La aplicación web ya corre en producción; aquí vive el reglamento, el contexto y los snapshots del ranking.

## Producto en vivo

| Recurso | URL |
|---------|-----|
| Tablero | [bolivia-100-hackers.vercel.app](https://bolivia-100-hackers.vercel.app) |
| Ranking | [Ver las 100 plazas](https://bolivia-100-hackers.vercel.app/ranking) |
| Código del ranking | [Reglas públicas cortas](https://bolivia-100-hackers.vercel.app/codigo) |

**Temporada 2026** · 100 plazas · evidencia verificable · el puesto lo asigna la mesa (postular no reserva número).

## Principios

- Solo logros **autorizados** y evidencia **pública** (links verificables).
- Puntaje base (máx. 5000) + logros semanales acumulados (sin techo).
- Máximo 3 solicitudes por mes calendario.
- Participación en comunidad boliviana es requisito de facto para el Top 10.

Detalle completo: [docs/REGLAMENTO.md](./docs/REGLAMENTO.md).

## Contenido de este repo

```
├── README.md                 ← estás aquí
├── docs/                     normativa y contexto
│   ├── REGLAMENTO.md         reglamento de puntaje v1.0
│   ├── CONTEXTO.md           producto, stack y estado
│   └── MIGRACION.md          inventario de migración (sin secretos)
├── data/
│   ├── fuentes.md            URLs y referencias consultadas
│   └── seasons/2026/         snapshot de la temporada
│       ├── ranking.md        legible (tabla + fichas)
│       └── ranking.json      estructurado (máquina)
└── _mapa/                    mapa técnico del repositorio
```

| Documento | Para qué sirve |
|-----------|----------------|
| [docs/REGLAMENTO.md](./docs/REGLAMENTO.md) | Cómo se calcula el puntaje y las reglas de la temporada |
| [docs/CONTEXTO.md](./docs/CONTEXTO.md) | Qué es el producto, plazas ocupadas y stack de la app |
| [docs/MIGRACION.md](./docs/MIGRACION.md) | Qué hay (y qué no) en este repo al migrar o auditar |
| [data/fuentes.md](./data/fuentes.md) | Fuentes y enlaces usados para documentar |
| [data/seasons/2026/ranking.md](./data/seasons/2026/ranking.md) | Foto legible del ranking (8/100 al 2026-10-26) |
| [data/seasons/2026/ranking.json](./data/seasons/2026/ranking.json) | Misma foto en JSON |
| [_mapa/MAPA_PROYECTO.md](./_mapa/MAPA_PROYECTO.md) | Estructura, relaciones y notas de reorganización |

## Snapshot temporada 2026

Capturado el **2026-10-26** (America/La_Paz) desde el tablero en vivo: **8 plazas ocupadas**, 92 abiertas.

| Puesto | Nombre | Handle |
|--------|--------|--------|
| 01 | Jhon Angelo Rivera Cartagena | `Angel_tech` |
| 02 | Nicolás Emir Mejía Agreda | `nemejia` |
| 03 | Vanessa Cárdenas de la Fuente | `vanelncripto` |
| 04 | Yeisa Torrico | `yeisa` |
| 05 | Sergio Mauricio Núñez | `mauricio` |
| 07 | Jhenny Solis | `jhennysolis` |
| 08 | Dax Kenji Tellez Duran | `kenyi001` |
| 13 | Ariane Somoza Rocha | `arianesomoza` |

Fichas y evidencia: [ranking.md](./data/seasons/2026/ranking.md). El tablero en vivo puede haber cambiado después de esta fecha.

## Cómo usar este repo

1. **Leer reglas** → [docs/REGLAMENTO.md](./docs/REGLAMENTO.md)
2. **Entender el producto** → [docs/CONTEXTO.md](./docs/CONTEXTO.md) o el [sitio](https://bolivia-100-hackers.vercel.app)
3. **Consultar un snapshot** → [data/seasons/2026/](./data/seasons/2026/)
4. **Postular o actualizar logros** → solo en la app (Clerk), no abriendo issues de puntaje aquí

No hay código de aplicación, `package.json` ni despliegue en este árbol. La app está en Vercel con auth Clerk; ver [docs/MIGRACION.md](./docs/MIGRACION.md).

## Ética

Solo se documentan y puntúan actividades autorizadas. Acceso sin permiso, fraude o interrupciones quedan fuera del ranking. Ver el [código público](https://bolivia-100-hackers.vercel.app/codigo) y el [reglamento](./docs/REGLAMENTO.md).
