import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Código",
  description: "Qué entra y qué no entra en Bolivia 100 Hackers.",
};

export default function CodigoPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <p className="text-sm uppercase tracking-[0.22em] text-[var(--gold)]">
        Código · temporada 2026
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-[var(--sand)] md:text-5xl">
        Código del ranking
      </h1>
      <p className="mt-5 text-lg text-[var(--mist)]">
        Bolivia 100 Hackers es un tablero de competitividad. Reconoce a gente
        que investiga, defiende, compite, construye y enseña — con evidencia
        verificable.
      </p>

      <div className="gold-line my-10" />

      <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--sand)]">
        Sí entra
      </h2>
      <ul className="mt-4 space-y-3 text-[var(--mist)]">
        <li className="border-l border-[var(--gold)]/40 pl-4">
          CTF y competencias públicas.
        </li>
        <li className="border-l border-[var(--gold)]/40 pl-4">
          Bug bounty dentro de un programa que te autorizó a probar.
        </li>
        <li className="border-l border-[var(--gold)]/40 pl-4">
          Investigación, criptografía, privacidad, hardware y herramientas
          propias.
        </li>
        <li className="border-l border-[var(--gold)]/40 pl-4">
          Defensa, respuesta a incidentes y educación en seguridad.
        </li>
        <li className="border-l border-[var(--gold)]/40 pl-4">
          Software, datos/IA, blockchain, producto y comunidad sin fines de
          lucro con tracción real.
        </li>
      </ul>

      <h2 className="mt-12 font-[family-name:var(--font-display)] text-2xl text-[var(--sand)]">
        No entra
      </h2>
      <ul className="mt-4 space-y-3 text-[var(--mist)]">
        <li className="border-l border-red-400/40 pl-4">
          Accesos a sistemas, cuentas o datos sin permiso.
        </li>
        <li className="border-l border-red-400/40 pl-4">
          Presumir de interrupciones, fraude o robo.
        </li>
        <li className="border-l border-red-400/40 pl-4">
          Pedir un puesto sin evidencia pública.
        </li>
        <li className="border-l border-red-400/40 pl-4">
          Seguidores o “influencia” sin respaldo técnico verificable.
        </li>
      </ul>

      <p className="mt-10 text-[var(--mist)]">
        La ficha queda en revisión. El puesto lo asigna la mesa, del 1 al 100.
        Actualizar una ficha aprobada la devuelve a revisión.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/reglamento">Reglamento completo</Link>
        </Button>
        <Button asChild variant="outline" className="border-white/20 text-[var(--sand)]">
          <Link href="/postular">Postular</Link>
        </Button>
      </div>
    </div>
  );
}
