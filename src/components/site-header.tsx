"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/ranking", label: "Ranking" },
  { href: "/codigo", label: "Código" },
  { href: "/reglamento", label: "Reglamento" },
  { href: "/postular", label: "Postular" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-lg tracking-wide text-[var(--sand)] transition hover:text-white md:text-xl"
        >
          Bolivia 100 Hackers
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm text-[var(--mist)] transition hover:text-white",
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "text-white"
                  : ""
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-2">
            <Link href="/postular">Enviar ficha</Link>
          </Button>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-[var(--sand)] md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[var(--night)]/95 px-5 py-4 backdrop-blur md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-[var(--sand)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
