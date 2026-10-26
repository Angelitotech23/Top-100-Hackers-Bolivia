import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reglamento",
  description:
    "Reglamento de puntaje v1.0 — Bolivia 100 Hackers. Categorías, evidencia y gobernanza.",
};

const categories = [
  { name: "Dominio demostrado de su disciplina", max: 1500 },
  { name: "Proyectos o startups con tracción real", max: 1500 },
  { name: "Participación activa en comunidad boliviana", max: 1200 },
  { name: "Trayectoria profesional (cargo / seniority)", max: 500 },
  { name: "Formación académica", max: 300 },
];

export default function ReglamentoPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <p className="text-sm uppercase tracking-[0.22em] text-[var(--gold)]">
        Reglamento · versión 1.0 · octubre 2026
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-[var(--sand)] md:text-5xl">
        Reglamento de puntaje
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-[var(--mist)]">
        Bolivia 100 Hackers es un ranking de 100 plazas para referentes del
        ecosistema tecnológico boliviano: seguridad ofensiva y defensiva,
        desarrollo, datos/IA, blockchain y roles de apoyo al ecosistema. No es
        exclusivamente un ranking de seguridad informática. Todas las plazas
        compiten en una sola tabla.
      </p>

      <section className="mt-14 space-y-4">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--sand)]">
          Cómo se calcula
        </h2>
        <p className="text-[var(--mist)] leading-relaxed">
          <strong className="text-[var(--sand)]">Puntaje base</strong> (hasta
          5000): postulación inicial con CV y evidencia.{" "}
          <strong className="text-[var(--sand)]">Puntaje acumulado</strong>: cada
          semana puedes sumar logros nuevos verificables, sin techo. No hay
          decaimiento por antigüedad. El panel tiene hasta 5 días hábiles para
          confirmar el preliminar.
        </p>
        <p className="text-[var(--mist)] leading-relaxed">
          Máximo 3 solicitudes por mes (postulación + actualizaciones +
          apelaciones). Logros anteriores a la postulación van en la ficha
          inicial; presentarlos después no suma como logro nuevo.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--sand)]">
          Categorías
        </h2>
        <ul className="mt-6 divide-y divide-white/10 border border-white/10 rounded-xl overflow-hidden">
          {categories.map((c) => (
            <li
              key={c.name}
              className="flex items-center justify-between gap-4 bg-[var(--panel)]/50 px-4 py-3"
            >
              <span className="text-[var(--sand)]">{c.name}</span>
              <span className="font-[family-name:var(--font-mono)] tabular-nums text-[var(--gold)]">
                {c.max}
              </span>
            </li>
          ))}
          <li className="flex items-center justify-between gap-4 bg-[var(--gold)]/10 px-4 py-3">
            <span className="font-medium text-[var(--sand)]">
              Total referencia (base)
            </span>
            <span className="font-[family-name:var(--font-mono)] tabular-nums text-[var(--gold)]">
              5000
            </span>
          </li>
        </ul>
        <p className="mt-4 text-sm text-[var(--mist)]">
          La participación comunitaria es requisito de facto para el Top 10.
          Sin evidencia verificable (enlace), la categoría vale 0.
        </p>
      </section>

      <section className="mt-14 space-y-4">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--sand)]">
          Exclusiones (0 puntos)
        </h2>
        <ul className="space-y-2 text-[var(--mist)]">
          <li className="border-l border-red-400/40 pl-4">
            Embajador o líder de comunidad con fines de lucro (promoción de
            marca/producto).
          </li>
          <li className="border-l border-red-400/40 pl-4">
            Seguidores o vistas sin respaldo técnico.
          </li>
          <li className="border-l border-red-400/40 pl-4">
            Certificaciones de nombre sin aplicación práctica.
          </li>
          <li className="border-l border-red-400/40 pl-4">
            Organizar un evento por sí solo, sin rol de mentor/speaker.
          </li>
        </ul>
      </section>

      <section className="mt-14 space-y-4">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--sand)]">
          Gobernanza
        </h2>
        <p className="text-[var(--mist)] leading-relaxed">
          Panel humano público, conflictos de interés declarados, apelación en
          15 días, sanciones progresivas por evidencia falsa, no discriminación
          y control de versiones con 7 días de aviso antes de cambios de
          criterio. El puntaje y el puesto son públicos; el desglose por
          categoría no.
        </p>
        <p className="text-sm text-[var(--mist)]">
          Resumen del reglamento v1.0. El texto completo vive también en el{" "}
          <Link
            href="https://github.com/Angelitotech23/Top-100-Hackers-Bolivia"
            className="text-[var(--gold)] hover:underline"
            target="_blank"
          >
            repositorio de documentación
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
