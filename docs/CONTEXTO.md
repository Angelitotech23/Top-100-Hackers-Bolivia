# Contexto del proyecto — Bolivia 100 Hackers

**Fecha de este documento:** 2026-10-26 (America/La_Paz)  
**Repo de documentación:** `Angelitotech23/Top-100-Hackers-Bolivia`

## Qué es

Ranking competitivo de **100 plazas** para visibilizar talento tecnológico boliviano. No es solo seguridad informática: incluye software, datos/IA, blockchain, educación, diseño/producto, comunidad, etc.

Principios clave documentados en el producto y el reglamento:

- Evidencia **verificable** (links públicos).
- Postular **no reserva** un número: la mesa asigna el puesto.
- Solo logros **autorizados** (bug bounty con programa, CTF públicos, etc.). No entra acceso sin permiso, fraude ni interrupciones.
- Puntaje base (máx. 5000) + logros semanales acumulados (sin techo).
- Máximo 3 solicitudes por mes calendario.
- Participación en comunidad boliviana es requisito de facto para Top 10.

## Producto en producción

| Ítem | Valor |
|------|-------|
| Host | `https://bolivia-100-hackers.vercel.app` |
| Auth | Clerk (correo / Google) |
| Temporada visible | 2026 |
| Plazas | 100 |
| Ocupadas (snapshot 2026-10-26) | 8 |
| Abiertas | 92 |
| En revisión (UI) | 0 |

### Rutas conocidas del tablero

- `/` — landing
- `/ranking` — tablero de 100 asientos
- `/ranking/[n]` — ficha de puesto
- `/codigo` — reglas públicas cortas

### Flujo de entrada (producto)

1. Entrar con Clerk  
2. Completar perfil (bio, LinkedIn, foto)  
3. Contar un logro público con evidencia  
4. La mesa aprueba / observa / asigna puesto  

## Plazas ocupadas (snapshot 2026-10-26)

Ver detalle en `data/seasons/2026/ranking.md` y `data/seasons/2026/ranking.json`.

| Puesto | Nombre | Handle |
|--------|--------|--------|
| 01 | Jhon Angelo Rivera Cartagena | Angel_tech |
| 02 | Nicolás Emir Mejía Agreda | nemejia |
| 03 | Vanessa Cárdenas de la Fuente | vanelncripto |
| 04 | Yeisa Torrico | yeisa |
| 05 | Sergio Mauricio Núñez | mauricio |
| 07 | Jhenny Solis | jhennysolis |
| 08 | Dax Kenji Tellez Duran | kenyi001 |
| 13 | Ariane Somoza Rocha | arianesomoza |

## Roles que filtra el tablero

Bug bounty · CTF · Seguridad de aplicaciones · Red team ético · Blue team y defensa · Ingeniería inversa · Criptografía · Privacidad · IoT / Hardware embebido · Educación · Ingeniería de Software · Blockchain · Criptomonedas / Web3 · Contratos inteligentes · DevOps / Infraestructura · Datos / Inteligencia Artificial · Redes · Finanzas / Fintech · Marketing · Diseño / Producto · Investigación académica · Legal / Compliance / Regulación · Emprendimiento · Embajador de plataforma

## Categorías de puntaje (reglamento v1.0)

| Categoría | Máx. |
|-----------|------|
| Dominio demostrado de su disciplina | 1500 |
| Proyectos o startups con tracción real | 1500 |
| Participación activa en comunidad boliviana | 1200 |
| Trayectoria profesional | 500 |
| Formación académica | 300 |
| **Total base** | **5000** |

## Stack de la app (no está en este repo)

Este repositorio **no** contiene el código desplegable. Referencias históricas:

| Componente | Notas |
|------------|-------|
| Frontend / hosting | Vercel (`bolivia-100-hackers.vercel.app`) |
| Auth | Clerk |
| Persistencia | No inventariada aquí (posible Supabase u otro; requiere dashboard) |
| Repo de app citado antes | `angelitotzy23/rank-quest` — inaccesible / 404 al inventariar |

## Qué SÍ vive aquí

Documentación, reglamento, fuentes, snapshot de ranking y notas de migración. Sirve como fuente de verdad de reglas y contexto, no como deploy.

## Ética

Solo se documentan y puntúan actividades autorizadas y evidencia pública. Cualquier claim de acceso no autorizado queda fuera del ranking (ver `/codigo` y `docs/REGLAMENTO.md`).
