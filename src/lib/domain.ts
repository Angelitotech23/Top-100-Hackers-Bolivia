export const BOARD_SIZE = 100
export const BIO_MAX = 450
export const TITLE_MAX = 80

export const DEPARTMENTS = [
  "La Paz",
  "Santa Cruz",
  "Cochabamba",
  "Oruro",
  "Potosí",
  "Chuquisaca",
  "Tarija",
  "Beni",
  "Pando",
  "Exterior",
] as const

export const ROLES_MAX = 5

export const ROLES = [
  { id: "bug-bounty", label: "Bug bounty" },
  { id: "ctf", label: "CTF" },
  { id: "appsec", label: "Seguridad de aplicaciones" },
  { id: "red-team", label: "Red team ético" },
  { id: "blue-team", label: "Blue team y defensa" },
  { id: "reversing", label: "Ingeniería inversa" },
  { id: "crypto", label: "Criptografía" },
  { id: "privacy", label: "Privacidad" },
  { id: "hardware", label: "IoT / Hardware embebido" },
  { id: "educacion", label: "Educación" },
  { id: "software", label: "Ingeniería de Software" },
  { id: "blockchain", label: "Blockchain" },
  { id: "web3", label: "Criptomonedas / Web3" },
  { id: "smart-contracts", label: "Contratos inteligentes" },
  { id: "devops", label: "DevOps / Infraestructura" },
  { id: "data-ai", label: "Datos / Inteligencia Artificial" },
  { id: "networks", label: "Redes" },
  { id: "fintech", label: "Finanzas / Fintech" },
  { id: "marketing", label: "Marketing" },
  { id: "design", label: "Diseño / Producto" },
  { id: "research", label: "Investigación académica" },
  { id: "legal", label: "Legal / Compliance / Regulación" },
  { id: "entrepreneurship", label: "Emprendimiento" },
  { id: "ambassador", label: "Embajador de plataforma" },
] as const

export const SPECIALTIES = ROLES

export const SOCIAL_PLATFORMS = [
  { id: "github", label: "GitHub" },
  { id: "twitter", label: "X / Twitter" },
  { id: "instagram", label: "Instagram" },
  { id: "web", label: "Sitio web" },
] as const

export type RoleId = (typeof ROLES)[number]["id"]
export type SpecialtyId = RoleId
export type Department = (typeof DEPARTMENTS)[number]
export type SocialPlatformId = (typeof SOCIAL_PLATFORMS)[number]["id"]
export type ApplicationStatus = "en_revision" | "aprobada" | "observada"

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  en_revision: "En revisión",
  aprobada: "Aprobada",
  observada: "Observada",
}

export type SocialLink = {
  platform: SocialPlatformId
  url: string
}

export type ProfileRecord = {
  showRealName: boolean
  title: string
  bio: string
  linkedinUrl: string
  socialLinks: SocialLink[]
}

export type ApplicationRecord = {
  alias: string
  department: Department
  city: string
  roles: RoleId[]
  specialty: RoleId
  handles: string
  achievement: string
  pitch: string
  evidenceUrl: string
  years: number
  status: ApplicationStatus
  submittedAt: string
  rank: number | null
  reviewNote: string
}

export type SeatIdentity = {
  firstName?: string | null
  lastName?: string | null
  imageUrl?: string | null
  hasImage?: boolean
}

export type Seat = {
  rank: number
  open: boolean
  alias: string | null
  displayName: string | null
  imageUrl: string | null
  roles: RoleId[]
  roleLabels: string[]
  specialty: RoleId | null
  specialtyLabel: string | null
  city: string | null
  department: string | null
  achievement: string | null
  evidenceUrl: string | null
  handles: string | null
  years: number | null
  title: string | null
  bio: string | null
  linkedinUrl: string | null
  socialLinks: SocialLink[]
}

export function roleLabel(id: string | null | undefined) {
  return ROLES.find((item) => item.id === id)?.label ?? null
}

export function specialtyLabel(id: string | null | undefined) {
  return roleLabel(id)
}

export function roleLabels(ids: readonly string[] | null | undefined): string[] {
  const labels: string[] = []
  for (const id of ids ?? []) {
    const label = roleLabel(id)
    if (label) labels.push(label)
  }
  return labels
}

export function isRole(value: string): value is RoleId {
  return ROLES.some((item) => item.id === value)
}

export function readRoles(value: unknown): RoleId[] {
  const items = Array.isArray(value) ? value : typeof value === "string" && value ? [value] : []
  const roles: RoleId[] = []
  for (const item of items) {
    const id = String(item)
    if (isRole(id) && !roles.includes(id)) roles.push(id)
  }
  return roles
}

export function socialLabel(id: string | null | undefined) {
  return SOCIAL_PLATFORMS.find((item) => item.id === id)?.label ?? id ?? null
}

export function isSpecialty(value: string): value is RoleId {
  return isRole(value)
}

export function isDepartment(value: string): value is Department {
  return DEPARTMENTS.some((item) => item === value)
}

export function isSocialPlatform(value: string): value is SocialPlatformId {
  return SOCIAL_PLATFORMS.some((item) => item.id === value)
}

export function normalizeAlias(alias: string) {
  return alias.trim().toLowerCase()
}

export function isAliasTaken(
  alias: string,
  applications: { userId: string; alias: string }[],
  currentUserId: string,
) {
  const needle = normalizeAlias(alias)
  return applications.some((item) => item.userId !== currentUserId && normalizeAlias(item.alias) === needle)
}

export function clerkDisplayName(firstName?: string | null, lastName?: string | null) {
  return [firstName, lastName].filter(Boolean).join(" ").trim()
}

export function publicDisplayName(alias: string, profile: ProfileRecord | null | undefined, identity: SeatIdentity) {
  const fullName = clerkDisplayName(identity.firstName, identity.lastName)
  if (profile?.showRealName && fullName) return `${fullName} · ${alias}`
  return alias
}

function clean(value: string, max: number) {
  return value.replace(/\s+/g, " ").trim().slice(0, max)
}

export function safeHttpsUrl(value: string | null | undefined) {
  if (!value) return null
  try {
    const url = new URL(value)
    if (url.protocol !== "https:") return null
    return url.toString()
  } catch {
    return null
  }
}

export function linkedinHttpsUrl(value: string | null | undefined) {
  const url = safeHttpsUrl(value)
  if (!url) return null
  try {
    const host = new URL(url).hostname.toLowerCase()
    if (host === "linkedin.com" || host.endsWith(".linkedin.com")) return url
  } catch {
    return null
  }
  return null
}

function asFiniteNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return null
}

export function parseApplication(formData: FormData):
  | { ok: true; value: Omit<ApplicationRecord, "status" | "submittedAt" | "rank" | "reviewNote"> }
  | { ok: false; error: string } {
  const alias = clean(String(formData.get("alias") ?? ""), 40)
  const department = String(formData.get("department") ?? "")
  const city = clean(String(formData.get("city") ?? ""), 40)
  const selected = [
    ...formData.getAll("roles").map(String),
    ...formData.getAll("specialty").map(String),
  ]
  const roles = readRoles(selected)
  const handles = clean(String(formData.get("handles") ?? ""), 160)
  const achievement = clean(String(formData.get("achievement") ?? ""), 400)
  const pitch = clean(String(formData.get("pitch") ?? ""), 800)
  const evidenceUrl = String(formData.get("evidenceUrl") ?? "").trim()
  const yearsRaw = String(formData.get("years") ?? "").trim()
  const conduct = formData.get("conduct")

  if (!/^[\p{L}\p{N} ._-]{2,40}$/u.test(alias)) {
    return { ok: false, error: "El alias necesita entre 2 y 40 caracteres, sin símbolos raros." }
  }
  if (!isDepartment(department)) {
    return { ok: false, error: "Elige un departamento." }
  }
  if (city.length < 2) {
    return { ok: false, error: "Indica tu ciudad." }
  }
  if (roles.length === 0) {
    return { ok: false, error: "Elige al menos un rol." }
  }
  if (roles.length > ROLES_MAX) {
    return { ok: false, error: `Puedes marcar como máximo ${ROLES_MAX} roles.` }
  }
  if (handles.length < 3) {
    return { ok: false, error: "Deja al menos un handle público: GitHub, CTFtime, HackerOne u otro." }
  }
  if (achievement.length < 20) {
    return { ok: false, error: "El logro público tiene que contar algo concreto, con al menos 20 caracteres." }
  }
  if (pitch.length < 40) {
    return { ok: false, error: "Explica por qué deberías estar en el tablero, con al menos 40 caracteres." }
  }

  let url: URL
  try {
    url = new URL(evidenceUrl)
  } catch {
    return { ok: false, error: "La evidencia tiene que ser un enlace https válido." }
  }
  if (url.protocol !== "https:") {
    return { ok: false, error: "La evidencia tiene que usar https." }
  }

  const years = Number(yearsRaw)
  if (!Number.isInteger(years) || years < 0 || years > 60) {
    return { ok: false, error: "Los años de trayectoria tienen que ser un número entre 0 y 60." }
  }
  if (conduct !== "on" && conduct !== "true") {
    return { ok: false, error: "Tienes que aceptar el código del ranking." }
  }

  return {
    ok: true,
    value: {
      alias,
      department,
      city,
      roles,
      specialty: roles[0],
      handles,
      achievement,
      pitch,
      evidenceUrl: url.toString(),
      years,
    },
  }
}

export function parseSocialLink(platform: string, url: string): { ok: true; value: SocialLink } | { ok: false; error: string } {
  if (!isSocialPlatform(platform)) {
    return { ok: false, error: "Esa red no está permitida." }
  }
  const safe = safeHttpsUrl(url.trim())
  if (!safe) {
    return { ok: false, error: "Cada enlace social tiene que usar https." }
  }
  return { ok: true, value: { platform, url: safe } }
}

export function parseProfile(formData: FormData): { ok: true; value: ProfileRecord } | { ok: false; error: string } {
  const title = clean(String(formData.get("title") ?? ""), TITLE_MAX)
  const bioRaw = String(formData.get("bio") ?? "").trim()
  if (bioRaw.length > BIO_MAX) {
    return { ok: false, error: `La bio tiene un máximo de ${BIO_MAX} caracteres.` }
  }
  const bio = clean(bioRaw, BIO_MAX)
  if (bio.length === 0) {
    return { ok: false, error: "La bio no puede quedar vacía." }
  }

  const linkedinRaw = String(formData.get("linkedinUrl") ?? "").trim()
  const linkedinUrl = linkedinHttpsUrl(linkedinRaw)
  if (!linkedinUrl) {
    return { ok: false, error: "El LinkedIn tiene que ser un enlace https de linkedin.com." }
  }

  const socialLinks: SocialLink[] = []
  for (const item of SOCIAL_PLATFORMS) {
    const raw = String(formData.get(`social_${item.id}`) ?? "").trim()
    if (!raw) continue
    const parsed = parseSocialLink(item.id, raw)
    if (!parsed.ok) return parsed
    socialLinks.push(parsed.value)
  }

  const showRaw = formData.get("showRealName")
  const showRealName = showRaw === "on" || showRaw === "true"

  return {
    ok: true,
    value: {
      showRealName,
      title,
      bio,
      linkedinUrl,
      socialLinks,
    },
  }
}

function metadataBucket(metadata: unknown, key: "application" | "profile") {
  if (!metadata || typeof metadata !== "object") return null
  const raw = (metadata as Record<string, unknown>)[key]
  return raw && typeof raw === "object" ? raw : null
}

export function readSocialLinks(value: unknown): SocialLink[] {
  if (!Array.isArray(value)) return []
  const links: SocialLink[] = []
  for (const item of value) {
    if (!item || typeof item !== "object") continue
    const platform = String((item as { platform?: unknown }).platform ?? "")
    const url = linkedinHttpsUrl(String((item as { url?: unknown }).url ?? "")) || safeHttpsUrl(String((item as { url?: unknown }).url ?? ""))
    if (!isSocialPlatform(platform) || !url) continue
    links.push({ platform, url })
  }
  return links
}

export function readProfile(publicMetadata: unknown): ProfileRecord | null {
  const raw = metadataBucket(publicMetadata, "profile")
  if (!raw) return null
  const value = raw as Partial<ProfileRecord>
  const linkedinUrl = linkedinHttpsUrl(typeof value.linkedinUrl === "string" ? value.linkedinUrl : "") ?? ""
  const bio = typeof value.bio === "string" ? clean(value.bio, BIO_MAX) : ""
  return {
    showRealName: value.showRealName === true,
    title: typeof value.title === "string" ? clean(value.title, TITLE_MAX) : "",
    bio,
    linkedinUrl,
    socialLinks: readSocialLinks(value.socialLinks),
  }
}

export function isProfileComplete(profile: ProfileRecord | null | undefined, hasImage: boolean) {
  if (!profile || !hasImage) return false
  if (profile.bio.trim().length === 0) return false
  return Boolean(linkedinHttpsUrl(profile.linkedinUrl))
}

export function readApplication(publicMetadata: unknown, privateMetadata?: unknown): ApplicationRecord | null {
  const raw = metadataBucket(publicMetadata, "application")
  if (!raw) return null
  const value = raw as Partial<ApplicationRecord> & { roles?: unknown; specialty?: unknown }
  const roles = readRoles(value.roles ?? value.specialty)
  const department = String(value.department)
  if (typeof value.alias !== "string" || roles.length === 0) return null
  if (!isDepartment(department)) return null
  if (value.status !== "en_revision" && value.status !== "aprobada" && value.status !== "observada") {
    return null
  }

  const privateRaw = metadataBucket(privateMetadata, "application") as { pitch?: unknown } | null
  const privatePitch = typeof privateRaw?.pitch === "string" ? privateRaw.pitch : ""
  const publicPitch = typeof value.pitch === "string" ? value.pitch : ""
  const years = asFiniteNumber(value.years)
  const rank = asFiniteNumber(value.rank)

  return {
    alias: value.alias,
    department,
    city: typeof value.city === "string" ? value.city : "",
    roles,
    specialty: roles[0],
    handles: typeof value.handles === "string" ? value.handles : "",
    achievement: typeof value.achievement === "string" ? value.achievement : "",
    pitch: privatePitch || publicPitch,
    evidenceUrl: safeHttpsUrl(typeof value.evidenceUrl === "string" ? value.evidenceUrl : "") ?? "",
    years: years != null && Number.isInteger(years) ? years : 0,
    status: value.status,
    submittedAt: typeof value.submittedAt === "string" ? value.submittedAt : "",
    rank: rank != null && Number.isInteger(rank) && rank >= 1 && rank <= BOARD_SIZE ? rank : null,
    reviewNote: typeof value.reviewNote === "string" ? value.reviewNote : "",
  }
}

const emptySeat = (rank: number): Seat => ({
  rank,
  open: true,
  alias: null,
  displayName: null,
  imageUrl: null,
  roles: [],
  roleLabels: [],
  specialty: null,
  specialtyLabel: null,
  city: null,
  department: null,
  achievement: null,
  evidenceUrl: null,
  handles: null,
  years: null,
  title: null,
  bio: null,
  linkedinUrl: null,
  socialLinks: [],
})

export function toSeat(
  rank: number,
  application: ApplicationRecord | undefined,
  extras?: { profile?: ProfileRecord | null } & SeatIdentity,
): Seat {
  if (!application || application.status !== "aprobada" || application.rank !== rank) {
    return emptySeat(rank)
  }
  const profile = extras?.profile ?? null
  return {
    rank,
    open: false,
    alias: application.alias,
    displayName: publicDisplayName(application.alias, profile, extras ?? {}),
    imageUrl: extras?.hasImage && extras.imageUrl ? extras.imageUrl : null,
    roles: application.roles,
    roleLabels: roleLabels(application.roles),
    specialty: application.roles[0] ?? null,
    specialtyLabel: roleLabel(application.roles[0]),
    city: application.city,
    department: application.department,
    achievement: application.achievement,
    evidenceUrl: safeHttpsUrl(application.evidenceUrl),
    handles: application.handles,
    years: application.years,
    title: profile?.title ? profile.title : null,
    bio: profile?.bio ? profile.bio : null,
    linkedinUrl: profile ? linkedinHttpsUrl(profile.linkedinUrl) : null,
    socialLinks: profile?.socialLinks ?? [],
  }
}

export function rankLabel(rank: number) {
  return String(rank).padStart(2, "0")
}
