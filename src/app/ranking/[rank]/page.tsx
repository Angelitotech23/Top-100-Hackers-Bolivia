import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TOTAL_SEATS,
  getOccupiedByRank,
} from "@/data/hackers";

type Props = { params: Promise<{ rank: string }> };

export async function generateStaticParams() {
  return Array.from({ length: TOTAL_SEATS }, (_, i) => ({
    rank: String(i + 1),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { rank: raw } = await params;
  const rank = Number(raw);
  const profile = getOccupiedByRank(rank);
  if (!profile) {
    return { title: `Plaza ${String(rank).padStart(2, "0")}` };
  }
  return {
    title: `${profile.name} · #${String(rank).padStart(2, "0")}`,
    description: profile.highlight,
  };
}

export default async function RankDetailPage({ params }: Props) {
  const { rank: raw } = await params;
  const rank = Number(raw);
  if (!Number.isInteger(rank) || rank < 1 || rank > TOTAL_SEATS) notFound();

  const profile = getOccupiedByRank(rank);

  if (!profile) {
    return (
      <div className="mx-auto max-w-3xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
        <Link
          href="/ranking"
          className="inline-flex items-center gap-2 text-sm text-[var(--mist)] hover:text-white"
        >
          <ArrowLeft className="size-4" /> Volver al ranking
        </Link>
        <p className="mt-10 font-[family-name:var(--font-display)] text-6xl text-[var(--gold)]">
          {String(rank).padStart(2, "0")}
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-[var(--sand)]">
          Plaza disponible
        </h1>
        <p className="mt-4 text-[var(--mist)]">
          Nadie ocupa este puesto todavía. Postular no lo reserva: la mesa
          asigna el número según la evidencia de tu ficha.
        </p>
        <Button asChild className="mt-8">
          <Link href="/postular">Enviar mi ficha</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <Link
        href="/ranking"
        className="inline-flex items-center gap-2 text-sm text-[var(--mist)] hover:text-white"
      >
        <ArrowLeft className="size-4" /> Volver al ranking
      </Link>

      <p className="mt-10 font-[family-name:var(--font-display)] text-6xl tabular-nums text-[var(--gold)] md:text-7xl">
        {String(rank).padStart(2, "0")}
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight tracking-tight text-[var(--sand)] md:text-5xl">
        {profile.name}{" "}
        <span className="text-[var(--mist)]">· {profile.handle}</span>
      </h1>
      {profile.title ? (
        <p className="mt-3 text-lg text-[var(--gold-bright)]">{profile.title}</p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        {profile.roles.map((role) => (
          <Badge key={role} variant="gold">
            {role}
          </Badge>
        ))}
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-white/10 py-6 text-sm md:grid-cols-3">
        <div>
          <dt className="text-[var(--mist)]">Ciudad</dt>
          <dd className="mt-1 text-[var(--sand)]">{profile.city}</dd>
        </div>
        <div>
          <dt className="text-[var(--mist)]">Experiencia</dt>
          <dd className="mt-1 text-[var(--sand)]">{profile.years} años</dd>
        </div>
        {profile.score != null ? (
          <div>
            <dt className="text-[var(--mist)]">Puntaje</dt>
            <dd className="mt-1 font-[family-name:var(--font-mono)] text-[var(--gold)]">
              {profile.score.toLocaleString("es-BO")}
            </dd>
          </div>
        ) : null}
      </dl>

      <p className="mt-8 text-lg leading-relaxed text-[var(--sand)]">
        {profile.bio}
      </p>
      <p className="mt-4 leading-relaxed text-[var(--mist)]">
        {profile.highlight}
      </p>

      {profile.evidence?.length ? (
        <div className="mt-8">
          <h2 className="text-sm uppercase tracking-[0.18em] text-[var(--mist)]">
            Evidencia destacada
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {profile.evidence.map((item) => (
              <li key={item}>
                <Badge variant="outline">{item}</Badge>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {profile.links?.length ? (
        <div className="mt-8 flex flex-col gap-2">
          {profile.links.map((url) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--gold)] hover:underline"
            >
              {url.replace(/^https?:\/\//, "")}
              <ExternalLink className="size-3.5" />
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
