"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROLES } from "@/data/hackers";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  handle: string;
  city: string;
  linkedin: string;
  company: string;
  roleTitle: string;
  achievement: string;
  evidenceUrl: string;
  roles: string[];
};

const empty: FormState = {
  name: "",
  handle: "",
  city: "",
  linkedin: "",
  company: "",
  roleTitle: "",
  achievement: "",
  evidenceUrl: "",
  roles: [],
};

export function ApplyForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function toggleRole(role: string) {
    setForm((prev) => {
      const has = prev.roles.includes(role);
      if (has) return { ...prev, roles: prev.roles.filter((r) => r !== role) };
      if (prev.roles.length >= 4) return prev;
      return { ...prev, roles: [...prev.roles, role] };
    });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.handle.trim() || !form.linkedin.trim()) {
      setError("Nombre, handle y LinkedIn son obligatorios.");
      return;
    }
    if (!form.achievement.trim() || !form.evidenceUrl.trim()) {
      setError("Necesitas un logro y un enlace verificable.");
      return;
    }
    if (form.roles.length === 0) {
      setError("Elige al menos un rol.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "No se pudo guardar la ficha.");
        return;
      }
      try {
        const key = "b100h-applications";
        const prev = JSON.parse(localStorage.getItem(key) ?? "[]") as unknown[];
        localStorage.setItem(key, JSON.stringify([data, ...prev].slice(0, 20)));
      } catch {
        /* ignore storage errors */
      }
      setDone(true);
      setForm(empty);
    } catch {
      setError("Error de red. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-6 py-10 text-center">
        <CheckCircle2 className="mx-auto size-10 text-[var(--gold)]" />
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl text-[var(--sand)]">
          Ficha recibida
        </h2>
        <p className="mt-3 text-[var(--mist)]">
          Quedó en cola de revisión local (modo demo). La mesa tiene hasta 5
          días hábiles para confirmar el puntaje. Postular no reserva un número.
        </p>
        <Button
          type="button"
          className="mt-6"
          onClick={() => setDone(false)}
        >
          Enviar otra ficha
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-[var(--mist)]">Nombre o alias público</span>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border-white/15 bg-white/5 text-[var(--sand)]"
            required
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="text-[var(--mist)]">Handle</span>
          <Input
            value={form.handle}
            onChange={(e) => setForm({ ...form, handle: e.target.value })}
            className="border-white/15 bg-white/5 text-[var(--sand)]"
            placeholder="ej. Angel_tech"
            required
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="text-[var(--mist)]">Ciudad</span>
          <Input
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="border-white/15 bg-white/5 text-[var(--sand)]"
            placeholder="Santa Cruz, La Paz…"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="text-[var(--mist)]">LinkedIn</span>
          <Input
            value={form.linkedin}
            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
            className="border-white/15 bg-white/5 text-[var(--sand)]"
            placeholder="https://linkedin.com/in/…"
            required
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="text-[var(--mist)]">Empresa / organización</span>
          <Input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="border-white/15 bg-white/5 text-[var(--sand)]"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="text-[var(--mist)]">Cargo</span>
          <Input
            value={form.roleTitle}
            onChange={(e) => setForm({ ...form, roleTitle: e.target.value })}
            className="border-white/15 bg-white/5 text-[var(--sand)]"
          />
        </label>
      </div>

      <div className="space-y-2 text-sm">
        <span className="text-[var(--mist)]">Roles (máx. 4)</span>
        <div className="flex flex-wrap gap-2">
          {ROLES.map((role) => {
            const active = form.roles.includes(role);
            return (
              <button
                key={role}
                type="button"
                onClick={() => toggleRole(role)}
                className={cn(
                  "rounded-md border px-2.5 py-1 text-xs transition",
                  active
                    ? "border-[var(--gold)]/50 bg-[var(--gold)]/15 text-[var(--gold)]"
                    : "border-white/15 text-[var(--mist)] hover:border-white/30"
                )}
              >
                {role}
              </button>
            );
          })}
        </div>
      </div>

      <label className="block space-y-2 text-sm">
        <span className="text-[var(--mist)]">Logro público</span>
        <textarea
          value={form.achievement}
          onChange={(e) => setForm({ ...form, achievement: e.target.value })}
          rows={4}
          className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-[var(--sand)] placeholder:text-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Describe un logro verificable: CTF, bug bounty autorizado, proyecto con tracción, mentoría, etc."
          required
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className="text-[var(--mist)]">Enlace de evidencia</span>
        <Input
          value={form.evidenceUrl}
          onChange={(e) => setForm({ ...form, evidenceUrl: e.target.value })}
          className="border-white/15 bg-white/5 text-[var(--sand)]"
          placeholder="https://…"
          required
        />
      </label>

      {error ? (
        <p className="rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Enviando…" : "Enviar ficha a revisión"}
      </Button>
      <p className="text-xs text-[var(--mist)]">
        Modo demo: la ficha se guarda en este entorno. Sin permiso no hay
        puntuación. Ver{" "}
        <a href="/codigo" className="text-[var(--gold)] hover:underline">
          código
        </a>
        .
      </p>
    </form>
  );
}
