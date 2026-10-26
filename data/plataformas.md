# Plataformas de ranking y visibilidad (Bolivia)

Documento comparativo. La **plataforma de referencia** para el dataset principal es **Bolivia 100 Hackers**. No se encontró evidencia pública de una plataforma llamada «Blovia» (consulta 2026-10-26).

---

## 1. Bolivia 100 Hackers (referencia)

| Aspecto | Detalle |
| --- | --- |
| **Qué es** | Tablero web de 100 plazas para talento tech / seguridad en Bolivia (temporada 2026). |
| **Operador** | Iniciativa comunitaria / equipo del proyecto (repositorio de app: [rank-quest](https://github.com/angelitotzy23/rank-quest)); no es un organismo estatal. |
| **Fundación / lanzamiento** | Despliegue público en Vercel documentado en 2026; temporada declarada «2026» en la web. **Año exacto de fundación legal:** no verificado. |
| **Modelo** | Sin monetización visible en el sitio; incentivo de visibilidad y reputación. Postulación gratuita con cuenta. |
| **Público** | Personas en Bolivia (y exterior en fichas) con logros en CTF, bug bounty autorizado, investigación, defensa, hardware, educación, etc. |
| **Ranking** | 100 asientos numerados; mesa humana asigna puesto tras revisar ficha. Búsqueda y filtros por rol en `/ranking`. |
| **Stack visible** | Next.js 16, React 19, Clerk (auth), despliegue en **Vercel** (`bolivia-100-hackers.vercel.app`). Metadatos de postulaciones en Clerk (público + privado para motivación). |
| **Dominios** | `bolivia-100-hackers.vercel.app` (producción pública). |
| **APIs públicas** | No hay API REST documentada; datos vía HTML SSR del sitio. |
| **Diferencia clave** | Enfoque **multidisciplina tech**, no solo reportes a gobierno; evidencia y perfil LinkedIn obligatorios para postular. |

---

## 2. CGII — Muro de la Fama (Bolivia)

| Aspecto | Detalle |
| --- | --- |
| **Qué es** | Ranking oficial de **reportantes éticos** de vulnerabilidades e incidentes al Estado boliviano. |
| **Operador** | [Centro de Gestión de Incidentes Informáticos (CGII)](https://www.cgii.gob.bo/) / AGETIC. |
| **Modelo** | Servicio público; puntos por reportes validados vía formulario oficial. |
| **Público** | Cualquier persona que reporte de forma ética y legal. |
| **Ranking** | Orden por **puntos** descendentes; publica alias, avatar, total de puntos y reportes (según bases). |
| **Infraestructura** | Sitio institucional `cgii.gob.bo`; formulario en `/es/reportar-incidente`. Stack backend no documentado públicamente en detalle. |
| **Competencia / diferencia** | Complementario a Bolivia 100: **solo** reportes al CGII; no cubre CTF privados ni carrera general fuera del canal estatal. |
| **Estado de fuente** | Página del muro con **404** en fetch directo 2026-10-26; ranking histórico en índice web (~47 alias visibles, no 100). |

---

## 3. Hackers.bo (AGETIC)

| Aspecto | Detalle |
| --- | --- |
| **Qué es** | Programa de **bug bounty / hall of fame** para sistemas del Estado (marca «HACKERS BO»). |
| **Operador** | AGETIC (Agencia de Gobierno Electrónico y Tecnologías de la Información y Comunicación). |
| **Ranking** | Tablas por **temporadas** (2018–2025 visibles en la web); puntos y reportes por gestión. |
| **Infraestructura** | `hackers.bo`; contenido estático por año. |
| **Diferencia** | Histórico estatal por campañas; no un top 100 continuo de carrera general. Prensa especializada cita líderes por temporada (p. ej. gestión 2024–2025). |

---

## 4. HackerDNA (Bolivia)

| Aspecto | Detalle |
| --- | --- |
| **Qué es** | Plataforma global de retos / XP con **sub-ranking por país**. |
| **Operador** | HackerDNA (producto comercial / comunidad). |
| **Ranking** | **XP** y estadísticas de retos; actualización frecuente (página indica «Updated Hourly» en índice 2026-10-25). |
| **Infraestructura** | `hackerdna.com`; aplicación web; sin API pública documentada en este estudio. |
| **Diferencia** | Gamificación y laboratorios; al corte solo **7 usuarios** listados para Bolivia (no 100). |

---

## 5. WeChall (agregador CTF)

| Aspecto | Detalle |
| --- | --- |
| **Qué es** | Agregador internacional de retos; ranking por país por **puntuación WeChall**. |
| **Ranking Bolivia** | Muestra mínima (p. ej. tres usuarios en página indexada). |
| **Diferencia** | Solo refleja retos enlazados a WeChall, no el ecosistema completo boliviano. |

---

## Matriz resumida

| Plataforma | Métrica | ¿100 plazas? | Ámbito |
| --- | --- | --- | --- |
| Bolivia 100 Hackers | Mesa + ficha | Sí (estructura fija) | Carrera tech amplia |
| CGII Muro de la Fama | Puntos de reporte | No (lista abierta) | Seguridad al Estado |
| Hackers.bo | Puntos por temporada | No | Bug bounty estatal |
| HackerDNA | XP | No | Retos / labs |
| WeChall | Score agregado | No | CTF enlazados |
