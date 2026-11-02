import { clerkClient, currentUser } from "@clerk/nextjs/server"
import { unstable_cache } from "next/cache"
import { connection } from "next/server"
import {
  BOARD_SIZE,
  type ApplicationRecord,
  type ApplicationStatus,
  type ProfileRecord,
  readApplication,
  readProfile,
  toSeat,
  type Seat,
} from "@/lib/domain"

export type StoredApplication = ApplicationRecord & {
  userId: string
  email: string
  profile: ProfileRecord | null
  firstName: string
  lastName: string
  imageUrl: string | null
  hasImage: boolean
}

const APPLICATION_CACHE_TAG = "ranking-applications"
const USER_PAGE_SIZE = 100
const MAX_USER_PAGES = 50

const STATUS_ORDER: Record<ApplicationStatus, number> = {
  en_revision: 0,
  observada: 1,
  aprobada: 2,
}

type ClerkUserLike = {
  id: string
  firstName: string | null
  lastName: string | null
  imageUrl: string
  hasImage: boolean
  primaryEmailAddressId: string | null
  emailAddresses: { id: string; emailAddress: string }[]
  publicMetadata: unknown
  privateMetadata: unknown
}

export function primaryEmail(user: Pick<ClerkUserLike, "primaryEmailAddressId" | "emailAddresses">) {
  return (
    user.emailAddresses.find((item) => item.id === user.primaryEmailAddressId)?.emailAddress ??
    user.emailAddresses[0]?.emailAddress ??
    ""
  )
}

export function userEmails(user: Pick<ClerkUserLike, "emailAddresses"> | null | undefined) {
  return user?.emailAddresses.map((item) => item.emailAddress) ?? []
}

export function isAdminEmail(email: string | null | undefined) {
  const allowed = (process.env.RANKING_ADMIN_EMAILS ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
  return Boolean(email && allowed.includes(email.toLowerCase()))
}

export function isAdminUser(user: Pick<ClerkUserLike, "emailAddresses"> | null | undefined) {
  return userEmails(user).some((email) => isAdminEmail(email))
}

export function applicationFields(item: ApplicationRecord): ApplicationRecord {
  return {
    alias: item.alias,
    department: item.department,
    city: item.city,
    roles: item.roles,
    specialty: item.roles[0],
    handles: item.handles,
    achievement: item.achievement,
    pitch: item.pitch,
    evidenceUrl: item.evidenceUrl,
    years: item.years,
    status: item.status,
    submittedAt: item.submittedAt,
    rank: item.rank,
    reviewNote: item.reviewNote,
  }
}

export async function requireUser() {
  await connection()
  const user = await currentUser()
  if (!user) return null
  return user
}

async function fetchApplications(): Promise<StoredApplication[]> {
  const client = await clerkClient()
  const stored: StoredApplication[] = []

  for (let page = 0, offset = 0; page < MAX_USER_PAGES; page += 1) {
    const response = await client.users.getUserList({ limit: USER_PAGE_SIZE, offset })
    for (const user of response.data) {
      const application = readApplication(user.publicMetadata, user.privateMetadata)
      if (!application) continue
      stored.push({
        ...application,
        userId: user.id,
        email: primaryEmail(user),
        profile: readProfile(user.publicMetadata),
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        imageUrl: user.hasImage ? user.imageUrl : null,
        hasImage: user.hasImage,
      })
    }
    offset += response.data.length
    if (response.data.length < USER_PAGE_SIZE || offset >= response.totalCount) break
  }

  return stored.sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1))
}

const loadApplications = unstable_cache(fetchApplications, [APPLICATION_CACHE_TAG], {
  tags: [APPLICATION_CACHE_TAG],
  revalidate: 60,
})

export async function listApplications(): Promise<StoredApplication[]> {
  await connection()
  return loadApplications()
}

export async function getBoard(): Promise<Seat[]> {
  return buildBoard(await listApplications())
}

export function sortForReview(applications: StoredApplication[]) {
  return [...applications].sort((a, b) => {
    const byStatus = STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
    if (byStatus !== 0) return byStatus
    return a.submittedAt < b.submittedAt ? 1 : -1
  })
}

export function buildBoard(applications: StoredApplication[]): Seat[] {
  const approved = new Map<number, StoredApplication>()
  for (const application of applications) {
    if (application.status !== "aprobada" || application.rank == null) continue
    if (application.rank < 1 || application.rank > BOARD_SIZE) continue
    if (!approved.has(application.rank)) approved.set(application.rank, application)
  }
  return Array.from({ length: BOARD_SIZE }, (_, index) => {
    const item = approved.get(index + 1)
    return toSeat(index + 1, item, item)
  })
}

export async function saveProfile(userId: string, profile: ProfileRecord) {
  const client = await clerkClient()
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { profile },
  })
}

export async function saveApplication(userId: string, application: ApplicationRecord) {
  const client = await clerkClient()
  const { pitch, ...visible } = application
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { application: { ...visible, pitch: null } },
    privateMetadata: { application: { pitch } },
  })
}

export { APPLICATION_CACHE_TAG }
