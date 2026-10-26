# Bolivia 100 Hackers

**Temporada 2026 · 100 plazas · mérito verificable · una sola tabla**

Un ranking público para visibilizar, incentivar y conectar el talento tecnológico boliviano. No es un ranking exclusivo de seguridad informática: compiten en la misma tabla quienes construyen, investigan, educan, protegen y hacen crecer el ecosistema —con evidencia que un tercero pueda comprobar.

> **Este repositorio es la fuente de verdad documental** (reglamento, contexto, fuentes y snapshots).  
> La aplicación en producción está en [bolivia-100-hackers.vercel.app](https://bolivia-100-hackers.vercel.app). El código de esa app **no** vive aquí.

---

## Por qué existe

Bolivia carece de un espacio de referencia sostenido que permita medir progreso frente a pares, con reglas claras y evidencia por encima del marketing personal. Bolivia 100 Hackers busca llenar ese vacío:

| Objetivo | Cómo se traduce |
|----------|-----------------|
| Visibilidad | 100 plazas públicas con ficha y evidencia |
| Incentivo | Ranking vivo: puntaje base + logros semanales |
| Confianza | Solo logros autorizados; revisión humana; apelación |
| Equidad de disciplinas | Misma tabla para software, seguridad, datos/IA, web3, diseño, comunidad, legal, etc. |

El sistema no pretende ser perfecto: pretende ser **auditable, corregible y transparente en sus reglas**.

---

## Estado del proyecto (gestión)

| Ítem | Estado |
|------|--------|
| Producto en producción | Activo en Vercel + Clerk |
| Temporada visible | **2026** |
| Plazas | 100 |
| Ocupadas (snapshot 2026-10-26, America/La_Paz) | **8** |
| Abiertas | **92** |
| Reglamento | v1.0 · Octubre 2026 |
| Este repo | Documentación + datos (sin deploy) |
| Código de la app | Fuera de este árbol (repo histórico citado no accesible) |

**Prioridad operativa:** llenar plazas con postulaciones de calidad, mantener el reglamento como referencia única y actualizar snapshots cuando el tablero cambie de forma relevante.

### Enlaces del producto

| Recurso | URL |
|---------|-----|
| Landing / tablero | https://bolivia-100-hackers.vercel.app |
| Ranking (100 asientos) | https://bolivia-100-hackers.vercel.app/ranking |
| Código público (reglas cortas) | https://bolivia-100-hackers.vercel.app/codigo |

---

## Cómo funciona (para quien decide o postula)

1. **Entrar** con Clerk (correo / Google).  
2. **Completar perfil** (bio, LinkedIn, foto).  
3. **Presentar logros** con evidencia pública.  
4. **La mesa** aprueba, observa o asigna puesto — postular **no reserva** un número.

### Puntaje (reglamento v1.0)

- **Base** (máx. 5000) al postular: dominio, proyectos con tracción, comunidad boliviana, trayectoria, formación.  
- **Acumulado:** logros semanales verificables, **sin techo**.  
- Panel: hasta **5 días hábiles** para confirmar un preliminar.  
- Tope: **3 solicitudes por mes** (postulación + updates + apelaciones).  
- Comunidad boliviana activa: requisito de facto para **Top 10**.

| Categoría (base) | Máx. |
|------------------|------|
| Dominio demostrado de su disciplina | 1500 |
| Proyectos o startups con tracción real | 1500 |
| Participación activa en comunidad boliviana | 1200 |
| Trayectoria profesional | 500 |
| Formación académica | 300 |
| **Total base** | **5000** |

Reglamento completo: [docs/REGLAMENTO.md](./docs/REGLAMENTO.md).

### Quién puede entrar (ejemplos de roles)

Bug bounty · CTF · AppSec · Red/Blue team ético · Ingeniería inversa · Criptografía · Privacidad · IoT · Educación · Ingeniería de software · Blockchain / Web3 · DevOps · Datos / IA · Fintech · Diseño / Producto · Investigación · Legal / Compliance · Emprendimiento · Embajador de plataforma *(etiqueta informativa; no puntúa por sí sola)*.

---

## Qué es este repo (y qué no es)

| Es | No es |
|----|--------|
| Fuente de verdad del **reglamento** y del **contexto** | El código fuente de la app |
| Archivo de **snapshots** del ranking por temporada | La base de datos en vivo |
| Inventario de migración **sin secretos** | Un lugar para pegar `.env` o claves |
| Mapa técnico de la estructura del repo | Un pipeline de CI/CD |

**Audiencias**

| Quién | Qué hacer aquí |
|-------|----------------|
| Postulante / ranking | Leer reglamento; postular **solo** en la app |
| Mesa / gobernanza | Usar este repo como referencia de reglas versionadas |
| Partner / prensa | Contexto + snapshot; cifras en vivo en el tablero |
| Ingeniería / migración | [docs/MIGRACION.md](./docs/MIGRACION.md) + [_mapa/](./_mapa/MAPA_PROYECTO.md) |

---

## Estructura del repositorio

```
├── README.md                      visión, estado y navegación
├── docs/
│   ├── REGLAMENTO.md              reglas de puntaje v1.0 (normativa)
│   ├── CONTEXTO.md                producto, stack, plazas, ética
│   └── MIGRACION.md               qué hay / qué falta al auditar
├── data/
│   ├── fuentes.md                 URLs y referencias consultadas
│   └── seasons/2026/
│       ├── ranking.md             snapshot legible (tabla + fichas)
│       └── ranking.json           snapshot estructurado
└── _mapa/                         inventario, grafo y plan de estructura
```

| Documento | Dueño de la pregunta |
|-----------|----------------------|
| [docs/REGLAMENTO.md](./docs/REGLAMENTO.md) | ¿Cómo se puntúa y qué queda fuera? |
| [docs/CONTEXTO.md](./docs/CONTEXTO.md) | ¿Qué es el producto y en qué estado está? |
| [docs/MIGRACION.md](./docs/MIGRACION.md) | ¿Qué hay en este repo al migrar o auditar? |
| [data/fuentes.md](./data/fuentes.md) | ¿De dónde salieron las referencias? |
| [data/seasons/2026/ranking.md](./data/seasons/2026/ranking.md) | ¿Cómo se veía el ranking en la fecha del snapshot? |
| [data/seasons/2026/ranking.json](./data/seasons/2026/ranking.json) | Misma foto, formato máquina |
| [_mapa/MAPA_PROYECTO.md](./_mapa/MAPA_PROYECTO.md) | ¿Cómo está organizado el repo y qué se movió? |

---

## Snapshot temporada 2026

**Capturado:** 2026-10-26 (America/La_Paz) · **Fuente:** [tablero en vivo](https://bolivia-100-hackers.vercel.app/ranking) · **8 / 100** ocupadas.

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

Fichas y evidencia: [data/seasons/2026/ranking.md](./data/seasons/2026/ranking.md).  
El tablero en vivo puede haber cambiado después de esta fecha; este archivo es una **foto**, no el sistema operativo del ranking.

---

## Gobernanza y cambios

- Cambios al reglamento: **nueva versión numérica**, con fecha y resumen; sin retroactividad; anuncio con al menos **7 días** de anticipación cuando sea relevante.  
- Apelaciones: hasta 15 días tras publicación/actualización (detalle en el reglamento).  
- Datos personales: uso para evaluar y mostrar perfil público; alias permitido; derecho a corrección/eliminación.

---

## Ética (línea roja)

Solo se documentan y puntúan actividades **autorizadas** y evidencia pública. Quedan fuera: acceso sin permiso, fraude, interrupciones y vanity metrics sin respaldo técnico.  
Ver [código público](https://bolivia-100-hackers.vercel.app/codigo) y [docs/REGLAMENTO.md](./docs/REGLAMENTO.md).

---

## Próximos pasos sugeridos (fuera del código de este repo)

1. Seguir ocupando plazas con evidencia sólida desde la app.  
2. Actualizar `data/seasons/2026/` cuando el tablero cambie de forma material.  
3. Mantener el reglamento como única referencia normativa versionada.  
4. Si se migra la app: inventariar env y persistencia en dashboards (Vercel/Clerk), **sin** pegar secretos en git — ver [docs/MIGRACION.md](./docs/MIGRACION.md).
