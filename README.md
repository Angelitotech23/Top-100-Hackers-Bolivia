# Bolivia 100 Hackers

Tablero competitivo de los 100 hackers de Bolivia. Hay 100 plazas. Cualquiera puede postular: entra con [Clerk](https://clerk.com) y envía una ficha con un logro público (CTF, bug bounty autorizado, investigación, defensa, hardware o educación). Clickear un asiento no reserva ese número.

El puesto lo asigna la mesa de revisión según la ficha. El alias, la especialidad, la ciudad y el logro quedan visibles si se aprueba. La motivación se guarda en metadatos privados de Clerk y el correo no se publica.

## Requisitos

- Node.js 20.9 o superior (recomendado: **24**, ver `.nvmrc`)
- Una aplicación de [Clerk](https://clerk.com)

## Arranque local

```bash
npm install
cp .env.example .env.local
```

Completa `.env.local` con las claves de Clerk y, si vas a revisar postulaciones, tu correo en `RANKING_ADMIN_EMAILS`.

```bash
npm run dev
```

## Rutas

- `/` — presentación y podio
- `/ranking` — las 100 plazas, con búsqueda
- `/perfil` — perfil público
- `/postular` — formulario de ficha
- `/mi-postulacion` — estado de tu ficha
- `/revision` — aprobar u observar (`RANKING_ADMIN_EMAILS`)
- `/reglamento` — reglas y puntaje públicos (`/codigo` redirige aquí)
- `/descargar` — presentación PowerPoint

## Despliegue en Vercel

Instrucciones completas (variables, dominios, pasos de importación): **[DEPLOY.md](./DEPLOY.md)**.

Plantilla de variables (solo nombres): [`.env.example`](./.env.example).

## Documentación y datos

Además del código de la app:

| Ruta | Contenido |
| --- | --- |
| [docs/](./docs/) | Reglamento, contexto, notas de migración |
| [data/](./data/) | Snapshots del ranking |
| [_mapa/](./_mapa/) | Mapa de estructura documental |
