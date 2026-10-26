import { NextResponse } from "next/server";

type Body = {
  name?: string;
  handle?: string;
  city?: string;
  linkedin?: string;
  company?: string;
  roleTitle?: string;
  achievement?: string;
  evidenceUrl?: string;
  roles?: string[];
};

const store: Array<Body & { id: string; receivedAt: string }> = [];

export async function GET() {
  return NextResponse.json({
    count: store.length,
    applications: store.slice(0, 50),
  });
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "JSON inválido." },
      { status: 400 }
    );
  }

  const name = body.name?.trim() ?? "";
  const handle = body.handle?.trim() ?? "";
  const linkedin = body.linkedin?.trim() ?? "";
  const achievement = body.achievement?.trim() ?? "";
  const evidenceUrl = body.evidenceUrl?.trim() ?? "";
  const roles = Array.isArray(body.roles) ? body.roles.slice(0, 4) : [];

  if (!name || !handle || !linkedin || !achievement || !evidenceUrl) {
    return NextResponse.json(
      { ok: false, error: "Faltan campos obligatorios." },
      { status: 400 }
    );
  }

  if (roles.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Elige al menos un rol." },
      { status: 400 }
    );
  }

  // Reject obvious unauthorized-access claims in free text (ethical guardrail).
  const banned =
    /\b(sin permiso|sin autorizaci[oó]n|hacke[eé]|robo de datos|ddos|ransomware)\b/i;
  if (banned.test(achievement)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Solo se aceptan logros autorizados y evidencia pública. Revisa el código del ranking.",
      },
      { status: 400 }
    );
  }

  const entry = {
    id: `app_${Date.now().toString(36)}`,
    receivedAt: new Date().toISOString(),
    name,
    handle,
    city: body.city?.trim() ?? "",
    linkedin,
    company: body.company?.trim() ?? "",
    roleTitle: body.roleTitle?.trim() ?? "",
    achievement,
    evidenceUrl,
    roles,
  };

  store.unshift(entry);

  return NextResponse.json({ ok: true, id: entry.id, receivedAt: entry.receivedAt });
}
