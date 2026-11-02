import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Reglamento",
  description:
    "Reglamento de postulación y puntaje v1.0 — Bolivia 100 Hackers.",
};

const REGLAMENTO_DOC =
  "https://docs.google.com/document/d/1or7-7jpmDDzhE5ygkkFpj2MdT9iB2W9xYNOvNFnkyiw/edit?usp=sharing";

const categories = [
  { name: "Dominio demostrado de su disciplina", max: 1500 },
  { name: "Proyectos o startups con tracción real", max: 1500 },
  { name: "Participación activa en comunidad boliviana", max: 1200 },
  { name: "Trayectoria profesional (cargo / seniority)", max: 500 },
  { name: "Formación académica", max: 300 },
];

export default function ReglamentoPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12">
      <p className="font-mono text-xs tracking-[0.22em] text-gold uppercase">
        Reglamento · versión 1.0 · octubre 2026
      </p>
      <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight">
        Reglamento de postulación
      </h1>
      <p className="mt-5 text-base leading-7 text-muted-foreground">
        Resumen público del ranking. El texto completo, con todas las secciones
        y criterios, está en el documento oficial.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={REGLAMENTO_DOC}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ className: "h-10 px-4" })}
        >
          Ver reglamento completo
        </a>
      </div>

      <div className="mt-10 space-y-8 text-base leading-7 text-muted-foreground">
        <p className="text-foreground">
          Bolivia 100 Hackers es un ranking de 100 plazas para referentes del
          ecosistema tecnológico boliviano: seguridad ofensiva y defensiva,
          desarrollo, datos/IA, blockchain y roles de apoyo al ecosistema. No es
          exclusivamente un ranking de seguridad informática. Todas las plazas
          compiten en una sola tabla.
        </p>

        <section>
          <h2 className="font-heading text-2xl text-foreground">Sí entra</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>CTF y competencias públicas.</li>
            <li>Bug bounty dentro de un programa que te autorizó a probar.</li>
            <li>Investigación, criptografía, privacidad, hardware y herramientas propias.</li>
            <li>Defensa, respuesta a incidentes y educación en seguridad.</li>
            <li>Software, datos/IA, blockchain, producto y comunidad sin fines de lucro con tracción real.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-foreground">No entra</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Accesos a sistemas, cuentas o datos sin permiso.</li>
            <li>Presumir de interrupciones, fraude o robo.</li>
            <li>Pedir un puesto sin evidencia pública.</li>
            <li>Seguidores o “influencia” sin respaldo técnico verificable.</li>
            <li>Embajador o líder de comunidad con fines de lucro (promoción de marca/producto).</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-foreground">Cómo se calcula</h2>
          <p className="mt-3">
            <span className="text-foreground font-medium">Puntaje base</span>{" "}
            (hasta 5000): postulación inicial con CV y evidencia.
          </p>
          <p className="mt-2">
            <span className="text-foreground font-medium">Puntaje acumulado</span>
            : cada semana puedes sumar logros nuevos verificables, sin techo. No
            hay decaimiento por antigüedad. El panel tiene hasta 5 días hábiles
            para confirmar el preliminar.
          </p>
          <p className="mt-2">
            Máximo 3 solicitudes por mes (postulación + actualizaciones +
            apelaciones). Todo logro anterior a la postulación va en la ficha
            inicial; presentarlo después no suma como logro nuevo.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-foreground">Categorías</h2>
          <ul className="mt-3 space-y-2">
            {categories.map((c) => (
              <li key={c.name} className="flex justify-between gap-4 border-b border-border/60 py-2">
                <span>{c.name}</span>
                <span className="font-mono text-foreground">{c.max}</span>
              </li>
            ))}
            <li className="flex justify-between gap-4 py-2 font-medium text-foreground">
              <span>Total referencia (base)</span>
              <span className="font-mono">5000</span>
            </li>
          </ul>
          <p className="mt-3">
            La participación comunitaria es requisito de facto para el Top 10.
            Sin evidencia verificable (enlace), la categoría vale 0.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-foreground">Exclusiones (0 puntos)</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Seguidores o vistas sin respaldo técnico.</li>
            <li>Certificaciones de nombre sin aplicación práctica.</li>
            <li>Organizar un evento por sí solo, sin rol de mentor/speaker.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-foreground">Gobernanza</h2>
          <p className="mt-3">
            La ficha queda en revisión. El puesto lo asigna la mesa, del 1 al
            100. Actualizar una ficha aprobada la devuelve a revisión y libera
            la plaza hasta que vuelva a pasar. Panel humano público, apelación
            en 15 días, sanciones progresivas por evidencia falsa y 7 días de
            aviso antes de cambios de criterio. El puntaje y el puesto son
            públicos; el desglose por categoría no.
          </p>
        </section>
      </div>

      <p className="mt-12 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
        Bolivia 100 Hackers · temporada 2026
      </p>
      <div className="mt-6">
        <Link href="/postular" className={buttonVariants({ className: "h-10 px-4" })}>
          Enviar postulación
        </Link>
      </div>
    </article>
  );
}
