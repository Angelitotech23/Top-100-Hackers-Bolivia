# Top 100 Hackers Bolivia — documentación y datos

Repositorio de **investigación y datos abiertos** sobre el tablero competitivo de talento tecnológico en Bolivia. Conserva el espíritu del README original: *un incentivo para revivir la competencia tecnológica, dar más alcance y visibilidad a nuestros talentos*.

**Última actualización del dataset:** 2026-10-26 (America/La_Paz).

## Plataforma de referencia

La referencia para `data/ranking.*` es **[Bolivia 100 Hackers](https://bolivia-100-hackers.vercel.app/)** (temporada 2026), no una plataforma llamada «Blovia» — nombre que **no apareció en fuentes públicas** en la búsqueda del 2026-10-26.

Aplicación relacionada (código): [github.com/angelitotzy23/rank-quest](https://github.com/angelitotzy23/rank-quest).

## Índice

- [Cómo leer el ranking](#cómo-leer-el-ranking)
- [Hallazgos principales](#hallazgos-principales)
- [Archivos del repositorio](#archivos-del-repositorio)
- [Metodología y privacidad](#metodología-y-privacidad)
- [Limitaciones](#limitaciones)

## Cómo leer el ranking

| Archivo | Contenido |
| --- | --- |
| [`data/ranking.csv`](data/ranking.csv) | 100 filas (una por plaza), UTF-8, separador coma |
| [`data/ranking.json`](data/ranking.json) | Mismo contenido en JSON |

- **`estado=ocupada`:** ficha aprobada con persona en el tablero al corte.
- **`estado=abierta`:** plaza sin titular aprobado; sin datos personales.
- **`metrica`:** para plazas ocupadas, `puesto_asignado=N` (el número lo asigna la mesa, no el postulante).
- **`verificacion`:** grado de comprobación de cada fila (ver metodología).

Cada fila incluye `fuente_url` y `fecha_consulta`.

## Hallazgos principales

1. **Estructura completa:** el tablero tiene **100 plazas numeradas**; el dataset refleja las 100 posiciones.
2. **Ocupación al corte:** **8 ocupadas**, **92 abiertas** (incluye la plaza **06** libre).
3. **Titulares verificados (puesto → alias):** 01 Angel_tech, 02 nemejia, 03 vanelncripto, 04 yeisa, 05 mauricio, 07 jhennysolis, 08 kenyi001, 13 arianesomoza.
4. **Perfiles:** la mayoría enlaza **LinkedIn profesional** publicado en la ficha; solo el puesto 01 muestra URL de evidencia GitHub en el HTML capturado.
5. **Ecosistema paralelo:** rankings estatales (CGII, hackers.bo) miden **reportes al Estado**; HackerDNA y WeChall miden **retos/XP** con cobertura boliviana mucho menor que 100 personas.

Detalle comparativo en [`data/plataformas.md`](data/plataformas.md).

## Archivos del repositorio

| Ruta | Descripción |
| --- | --- |
| `README.md` | Este documento |
| `CHANGELOG.md` | Historial de cambios |
| `data/ranking.csv` / `data/ranking.json` | Tablero al corte |
| `data/fuentes.md` | URLs y fechas de consulta |
| `data/plataformas.md` | Contexto e infraestructura de plataformas similares |
| `docs/metodologia.md` | Criterios, privacidad y limitaciones |

## Metodología y privacidad

Ver [`docs/metodologia.md`](docs/metodologia.md).

**Omisiones por privacidad en este dataset:**

- Correos, teléfonos y direcciones (incluidos los que las bases del CGII mencionan como opcionales para avatar/contacto).
- Texto de motivación de postulaciones (privado en Clerk).
- Datos de personas en plazas abiertas.

Los nombres completos en filas ocupadas provienen **solo** de lo que el propio tablero público muestra (cuando el postulante activó nombre real).

## Limitaciones

- Instantánea **2026-10-26**; el tablero en vivo puede cambiar sin aviso.
- **Evidencia HTTPS:** plazas 2–5, 7–8 y 13 sin `evidencia_url` en el HTML público capturado (logro y LinkedIn sí verificados).
- **CGII Muro de la Fama:** URL institucional con **404** en consulta directa; datos comparativos **no verificados en vivo** (ver `data/fuentes.md`).
- No se realizó escaneo activo ni acceso a sistemas no públicos.

## Contribuir

1. Revisar metodología antes de proponer cambios en `data/ranking.*`.
2. Cada dato nuevo debe traer `fuente_url` y `fecha_consulta`.
3. No incluir datos personales prohibidos en la sección de privacidad.

---

*Bolivia 100 Hackers · temporada 2026 · documentación mantenida en este repositorio.*
