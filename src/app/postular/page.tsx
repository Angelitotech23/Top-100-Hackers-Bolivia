import type { Metadata } from "next";
import { ApplyForm } from "@/components/apply-form";

export const metadata: Metadata = {
  title: "Postular",
  description:
    "Envía tu ficha a Bolivia 100 Hackers con evidencia verificable.",
};

export default function PostularPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <p className="text-sm uppercase tracking-[0.22em] text-[var(--gold)]">
        Postulación
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-[var(--sand)] md:text-5xl">
        Envía tu ficha
      </h1>
      <p className="mt-4 text-[var(--mist)]">
        Completa el perfil y un logro con enlace verificable. La mesa asigna el
        puesto; postular no reserva un número del 1 al 100.
      </p>
      <div className="mt-10">
        <ApplyForm />
      </div>
    </div>
  );
}
