# Bolivia 100 Hackers

Ranking de **100 plazas** para referentes del ecosistema tecnológico boliviano: seguridad (autorizada), software, datos/IA, blockchain y roles de apoyo a la comunidad.

Este repositorio incluye la **aplicación web** (Next.js) del tablero, el código del ranking y un resumen del reglamento de puntaje v1.0.

## Qué incluye

- Landing con identidad visual propia
- Tablero `/ranking` (100 asientos, filtros y búsqueda)
- Fichas `/ranking/[n]` con perfiles publicados
- `/codigo` y `/reglamento`
- Postulación demo en `/postular` + API `POST /api/applications`

## Desarrollo local

```bash
npm install
npm run dev -- --port 43127
```

Abre [http://127.0.0.1:43127](http://127.0.0.1:43127).

## Scripts

| Comando        | Descripción        |
|----------------|--------------------|
| `npm run dev`  | Servidor de desarrollo |
| `npm run build`| Build de producción |
| `npm run start`| Servidor de producción |
| `npm run lint` | ESLint |

## Datos

Los perfiles ocupados en `src/data/hackers.ts` reflejan el tablero público de la temporada 2026. Las postulaciones en demo se guardan en memoria del proceso (y una copia opcional en `localStorage`).

## Seguridad y ética

Solo se puntúan logros **autorizados** y evidencia pública. Accesos sin permiso, fraude o interrupciones no entran al ranking. Ver `/codigo`.

## Enlaces

- Repo de documentación / origen del reglamento: [Angelitotech23/Top-100-Hackers-Bolivia](https://github.com/Angelitotech23/Top-100-Hackers-Bolivia)
- Temporada: 2026
