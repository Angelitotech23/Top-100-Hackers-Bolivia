import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[var(--night-deep)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-[var(--mist)] md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          <span className="font-[family-name:var(--font-display)] text-[var(--sand)]">
            Bolivia 100 Hackers
          </span>{" "}
          · temporada 2026
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/ranking" className="hover:text-white">
            Ranking
          </Link>
          <Link href="/codigo" className="hover:text-white">
            Código
          </Link>
          <Link href="/reglamento" className="hover:text-white">
            Reglamento
          </Link>
          <a
            href="https://github.com/Angelitotech23/Top-100-Hackers-Bolivia"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
