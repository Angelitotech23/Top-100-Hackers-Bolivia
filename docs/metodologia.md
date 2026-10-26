# Metodología

**Proyecto:** Top 100 Hackers Bolivia (repositorio de documentación)  
**Plataforma de referencia:** [Bolivia 100 Hackers](https://bolivia-100-hackers.vercel.app/) (no existe una plataforma pública llamada «Blovia»; se descartó ese nombre tras búsqueda web el 2026-10-26).  
**Fecha de corte del tablero:** 2026-10-26 (America/La_Paz).

## Qué mide el ranking de referencia

Bolivia 100 Hackers es un **tablero de 100 plazas numeradas** (puestos 01–100) para visibilizar talento tecnológico y de seguridad en Bolivia. No es una liga automática por puntos en tiempo real:

- Cualquier persona con cuenta puede **postular** con una ficha (logro público, evidencia HTTPS, roles, ciudad).
- Una **mesa de revisión** aprueba u observa la ficha y **asigna el número** en el tablero; postular no reserva un puesto concreto.
- Solo las fichas **aprobadas** ocupan plaza; el resto permanece como **plaza abierta**.

La métrica registrada en este repositorio para plazas ocupadas es `puesto_asignado=N` (posición oficial en el tablero al corte). No hay puntuación numérica comparable con bug bounty estatal.

## Quién puntúa / valida

- **Bolivia 100 Hackers:** revisores autorizados vía variable de entorno `RANKING_ADMIN_EMAILS` en la aplicación (correos no publicados en este dataset).
- **Plataformas comparadas** (ver `data/plataformas.md`): cada una define sus propias reglas (puntos CGII, XP en HackerDNA, etc.).

## Fuentes permitidas

- Tablero y fichas públicas de Bolivia 100 Hackers.
- Rankings y documentación pública de organismos y plataformas listadas en `data/fuentes.md`.
- Perfiles profesionales enlazados explícitamente en las fichas públicas (p. ej. LinkedIn, GitHub, URL de evidencia).

## Privacidad

Se excluyen del dataset:

- Correos personales, teléfonos, domicilios y documentos de identidad.
- Motivación privada de postulaciones (almacenada en metadatos privados de Clerk en la app, no expuesta en el tablero).

Los **nombres completos** solo se incluyen cuando la propia ficha pública del tablero los muestra (opción de mostrar nombre real del postulante). Si en el futuro una fuente mezclara datos no publicados por el titular, deben omitirse y anotarse en `notas`.

## Limitaciones

1. **Cobertura:** al corte solo **8 de 100** plazas estaban ocupadas; las filas 9–100 (y la plaza 06) están documentadas como `abierta` sin datos personales.
2. **Evidencia externa:** varias fichas verificadas no publican URL de evidencia en el HTML visible; esas URLs quedan vacías y se marca la limitación en el README.
3. **CGII / hackers.bo:** la URL del Muro de la Fama del CGII devolvió **404** en consulta directa el 2026-10-26; los datos comparativos de esa plataforma se tomaron de índice web y figuran como **no verificado** en vivo hasta nueva comprobación.
4. **Desfase temporal:** el tablero puede cambiar cuando la mesa aprueba nuevas fichas; este repositorio es una instantánea fechada.

## Campos del dataset (`data/ranking.csv` / `.json`)

| Campo | Descripción |
| --- | --- |
| `posicion` | Número de plaza (1–100) |
| `estado` | `ocupada` \| `abierta` |
| `alias` | Alias público en el tablero |
| `nombre_publico` | Texto mostrado en el tablero |
| `metrica` | Métrica usada (p. ej. `puesto_asignado=7`) |
| `titulo_perfil` | Título opcional del perfil |
| `ubicacion` | Ciudad y departamento si aparecen en el listado |
| `roles` | Roles visibles en el tablero |
| `logro_publico` | Logro en ficha pública |
| `perfil_publico` | Enlace principal (p. ej. LinkedIn) |
| `evidencia_url` | Enlace HTTPS de evidencia si está publicado |
| `fuente_url` | URL consultada |
| `fecha_consulta` | Fecha ISO de la captura |
| `verificacion` | `verificado` \| `parcial` \| `no verificado` |
| `notas` | Aclaraciones, omisiones o conflictos |
