import assert from "node:assert/strict"
import { test } from "node:test"
import {
  BIO_MAX,
  TITLE_MAX,
  isAliasTaken,
  isProfileComplete,
  parseApplication,
  parseProfile,
  parseSocialLink,
  readApplication,
  readProfile,
  safeHttpsUrl,
} from "./domain.ts"

function form(entries: Record<string, string>) {
  const data = new FormData()
  for (const [key, value] of Object.entries(entries)) data.set(key, value)
  return data
}

const validApplication = {
  alias: "ande.null",
  department: "La Paz",
  city: "El Alto",
  specialty: "ctf",
  handles: "github.com/ande",
  achievement: "Puesto nacional en un CTF público de 2026.",
  pitch: "Quiero demostrar que la escena boliviana compite con evidencia pública.",
  evidenceUrl: "https://ctftime.org/team/1",
  years: "4",
  conduct: "on",
}

const validProfile = {
  bio: "Investigo y compito desde El Alto.",
  linkedinUrl: "https://www.linkedin.com/in/ande-null",
}

test("parseApplication acepta una ficha válida", () => {
  const parsed = parseApplication(form(validApplication))
  assert.equal(parsed.ok, true)
  if (parsed.ok) assert.equal(parsed.value.alias, "ande.null")
})

test("parseApplication rechaza evidencia que no sea https", () => {
  const parsed = parseApplication(form({ ...validApplication, evidenceUrl: "http://example.com" }))
  assert.equal(parsed.ok, false)
})

test("parseProfile acepta una bio de 450 caracteres", () => {
  const parsed = parseProfile(form({ ...validProfile, bio: "á".repeat(BIO_MAX) }))
  assert.equal(parsed.ok, true)
  if (parsed.ok) assert.equal(parsed.value.bio.length, BIO_MAX)
})

test("parseProfile rechaza una bio de más de 450 caracteres", () => {
  const parsed = parseProfile(form({ ...validProfile, bio: "a".repeat(BIO_MAX + 1) }))
  assert.equal(parsed.ok, false)
  if (!parsed.ok) assert.match(parsed.error, /450/)
})

test("parseProfile acepta un título público corto", () => {
  const parsed = parseProfile(form({ ...validProfile, title: "Founder, Team Zephy" }))
  assert.equal(parsed.ok, true)
  if (parsed.ok) assert.equal(parsed.value.title, "Founder, Team Zephy")
})

test("parseProfile recorta un título demasiado largo", () => {
  const parsed = parseProfile(form({ ...validProfile, title: "x".repeat(TITLE_MAX + 20) }))
  assert.equal(parsed.ok, true)
  if (parsed.ok) assert.equal(parsed.value.title.length, TITLE_MAX)
})

test("parseProfile acepta un LinkedIn https", () => {
  const parsed = parseProfile(form(validProfile))
  assert.equal(parsed.ok, true)
  if (parsed.ok) assert.match(parsed.value.linkedinUrl, /linkedin\.com/)
})

test("parseProfile rechaza LinkedIn con http", () => {
  const parsed = parseProfile(form({ ...validProfile, linkedinUrl: "http://www.linkedin.com/in/ande" }))
  assert.equal(parsed.ok, false)
})

test("parseProfile rechaza un LinkedIn de otro dominio", () => {
  const parsed = parseProfile(form({ ...validProfile, linkedinUrl: "https://example.com/in/ande" }))
  assert.equal(parsed.ok, false)
})

test("parseSocialLink rechaza una plataforma que no está en la lista", () => {
  const parsed = parseSocialLink("tiktok", "https://tiktok.com/@ande")
  assert.equal(parsed.ok, false)
  if (!parsed.ok) assert.match(parsed.error, /permitida/)
})

test("parseSocialLink rechaza una url que no es https", () => {
  const parsed = parseSocialLink("github", "http://github.com/ande")
  assert.equal(parsed.ok, false)
  if (!parsed.ok) assert.match(parsed.error, /https/)
})

test("isAliasTaken detecta conflicto y excluye al propio usuario", () => {
  const others = [
    { userId: "user_a", alias: "Ande.Null" },
    { userId: "user_b", alias: "otra" },
  ]
  assert.equal(isAliasTaken("ande.null", others, "user_c"), true)
  assert.equal(isAliasTaken("ande.null", others, "user_a"), false)
  assert.equal(isAliasTaken("nuevo", others, "user_c"), false)
})

test("isProfileComplete exige bio, LinkedIn y hasImage", () => {
  const profile = {
    showRealName: false,
    title: "",
    bio: "Investigo y compito desde El Alto.",
    linkedinUrl: "https://www.linkedin.com/in/ande-null",
    socialLinks: [],
  }
  assert.equal(isProfileComplete(profile, true), true)
  assert.equal(isProfileComplete(profile, false), false)
  assert.equal(isProfileComplete({ ...profile, bio: "" }, true), false)
  assert.equal(isProfileComplete({ ...profile, linkedinUrl: "https://example.com" }, true), false)
  assert.equal(isProfileComplete(null, true), false)
})

test("readApplication junta el pitch privado y descarta un rank inválido", () => {
  const application = readApplication(
    {
      application: {
        alias: "ande.null",
        department: "La Paz",
        city: "El Alto",
        specialty: "ctf",
        handles: "github.com/ande",
        achievement: "Puesto nacional",
        evidenceUrl: "https://ctftime.org/team/1",
        years: "4",
        status: "aprobada",
        submittedAt: "2026-01-01T00:00:00.000Z",
        rank: 250,
        reviewNote: "",
      },
    },
    { application: { pitch: "Motivación privada" } },
  )
  assert.ok(application)
  assert.equal(application?.pitch, "Motivación privada")
  assert.equal(application?.rank, null)
  assert.equal(application?.years, 4)
})

test("readProfile ignora una ficha vieja sin clave profile", () => {
  assert.equal(readProfile({ application: { alias: "ande.null" } }), null)
})

test("readProfile conserva el título público", () => {
  const profile = readProfile({
    profile: {
      showRealName: true,
      title: "Co-founder, YAIS Lab",
      bio: "Investiga problemas de Bolivia con una comunidad de IA.",
      linkedinUrl: "https://www.linkedin.com/in/yeisa",
      socialLinks: [],
    },
  })
  assert.ok(profile)
  assert.equal(profile?.title, "Co-founder, YAIS Lab")
})

test("parseApplication acepta varios roles", () => {
  const data = form({ ...validApplication })
  data.delete("specialty")
  data.append("roles", "software")
  data.append("roles", "blockchain")
  data.append("roles", "web3")
  const parsed = parseApplication(data)
  assert.equal(parsed.ok, true)
  if (parsed.ok) {
    assert.deepEqual(parsed.value.roles, ["software", "blockchain", "web3"])
    assert.equal(parsed.value.specialty, "software")
  }
})

test("parseApplication rechaza cero roles", () => {
  const data = form({ ...validApplication })
  data.delete("specialty")
  const parsed = parseApplication(data)
  assert.equal(parsed.ok, false)
  if (!parsed.ok) assert.match(parsed.error, /al menos un rol/)
})

test("parseApplication rechaza más de cinco roles", () => {
  const data = form({ ...validApplication })
  data.delete("specialty")
  for (const role of ["software", "blockchain", "web3", "fintech", "educacion", "ambassador"]) {
    data.append("roles", role)
  }
  const parsed = parseApplication(data)
  assert.equal(parsed.ok, false)
  if (!parsed.ok) assert.match(parsed.error, /máximo 5/)
})

test("readApplication migra specialty string al array roles", () => {
  const application = readApplication({
    application: {
      alias: "ande.null",
      department: "La Paz",
      city: "El Alto",
      specialty: "ctf",
      handles: "github.com/ande",
      achievement: "Puesto nacional",
      evidenceUrl: "https://ctftime.org/team/1",
      years: 4,
      status: "en_revision",
      submittedAt: "2026-01-01T00:00:00.000Z",
      rank: null,
      reviewNote: "",
    },
  })
  assert.ok(application)
  assert.deepEqual(application?.roles, ["ctf"])
  assert.equal(application?.specialty, "ctf")
})

test("safeHttpsUrl ignora protocolos peligrosos", () => {
  assert.equal(safeHttpsUrl("javascript:alert(1)"), null)
  assert.equal(safeHttpsUrl("https://ctftime.org/team/1"), "https://ctftime.org/team/1")
})
