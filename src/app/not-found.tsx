import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-5 pb-24 pt-28 text-center">
      <p className="font-[family-name:var(--font-display)] text-6xl text-[var(--gold)]">
        404
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-2xl text-[var(--sand)]">
        Esta plaza no existe
      </h1>
      <p className="mt-3 text-[var(--mist)]">
        El ranking solo tiene asientos del 01 al 100.
      </p>
      <Button asChild className="mt-8">
        <Link href="/ranking">Ir al ranking</Link>
      </Button>
    </div>
  );
}
