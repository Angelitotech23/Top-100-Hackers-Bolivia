"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import {
  APPLICATION_CACHE_TAG,
  applicationFields,
  isAdminUser,
  listApplications,
  requireUser,
  saveApplication,
  saveProfile,
} from "@/lib/applications"
import {
  BOARD_SIZE,
  isAliasTaken,
  isProfileComplete,
  parseApplication,
  parseProfile,
  readProfile,
  type ApplicationRecord,
} from "@/lib/domain"

export type FormState = {
  error: string
  done: boolean
}

function refresh(ranks: Array<number | null | undefined> = []) {
  revalidateTag(APPLICATION_CACHE_TAG, "max")
  revalidatePath("/")
  revalidatePath("/ranking")
  revalidatePath("/perfil")
  revalidatePath("/postular")
  revalidatePath("/mi-postulacion")
  revalidatePath("/revision")
  for (const rank of ranks) {
    if (typeof rank === "number" && rank >= 1 && rank <= BOARD_SIZE) {
      revalidatePath(`/ranking/${rank}`)
    }
  }
}

export async function submitProfile(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireUser()
  if (!user) {
    return { error: "Entra con tu cuenta antes de editar el perfil.", done: false }
  }

  const parsed = parseProfile(formData)
  if (!parsed.ok) return { error: parsed.error, done: false }

  await saveProfile(user.id, parsed.value)
  refresh()
  if (isProfileComplete(parsed.value, user.hasImage)) {
    redirect("/postular")
  }
  return { error: "Guarda una foto de perfil desde el menú de tu cuenta para completar el perfil.", done: false }
}

export async function submitApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireUser()
  if (!user) {
    return { error: "Entra con tu cuenta antes de postular.", done: false }
  }

  const profile = readProfile(user.publicMetadata)
  if (!isProfileComplete(profile, user.hasImage)) {
    redirect("/perfil?aviso=perfil")
  }

  const parsed = parseApplication(formData)
  if (!parsed.ok) return { error: parsed.error, done: false }

  const applications = await listApplications()
  if (isAliasTaken(parsed.value.alias, applications, user.id)) {
    return { error: "Ese alias ya está en uso. Elige otro.", done: false }
  }

  const application: ApplicationRecord = {
    ...parsed.value,
    status: "en_revision",
    submittedAt: new Date().toISOString(),
    rank: null,
    reviewNote: "",
  }

  await saveApplication(user.id, application)
  refresh()
  redirect("/mi-postulacion")
}

export async function reviewApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireUser()
  if (!user || !isAdminUser(user)) {
    return { error: "No puedes revisar postulaciones.", done: false }
  }

  const userId = String(formData.get("userId") ?? "")
  const decision = String(formData.get("decision") ?? "")
  const note = String(formData.get("reviewNote") ?? "").replace(/\s+/g, " ").trim().slice(0, 300)
  const rankRaw = String(formData.get("rank") ?? "").trim()

  const applications = await listApplications()
  const target = applications.find((item) => item.userId === userId)
  if (!target) {
    return { error: "No encontramos esa postulación.", done: false }
  }

  const record = applicationFields(target)
  const previousRank = target.rank

  if (decision === "observada") {
    await saveApplication(userId, {
      ...record,
      status: "observada",
      rank: null,
      reviewNote: note,
    })
    refresh([previousRank])
    redirect("/revision")
  }

  if (decision !== "aprobada") {
    return { error: "Decisión no válida.", done: false }
  }

  let rank = rankRaw ? Number(rankRaw) : 0
  if (!rankRaw) {
    const taken = new Set(
      applications
        .filter((item) => item.status === "aprobada" && item.userId !== userId && item.rank)
        .map((item) => item.rank),
    )
    rank = Array.from({ length: BOARD_SIZE }, (_, index) => index + 1).find((seat) => !taken.has(seat)) ?? 0
  }

  if (!rankRaw && rank === 0) {
    return { error: "El tablero está lleno. Libera un puesto o indica uno concreto.", done: false }
  }

  if (!Number.isInteger(rank) || rank < 1 || rank > BOARD_SIZE) {
    return { error: "El puesto tiene que estar entre 1 y 100.", done: false }
  }

  const occupied = applications.some(
    (item) => item.status === "aprobada" && item.userId !== userId && item.rank === rank,
  )
  if (occupied) {
    return { error: `El puesto ${rank} ya está ocupado.`, done: false }
  }

  await saveApplication(userId, {
    ...record,
    status: "aprobada",
    rank,
    reviewNote: note,
  })
  refresh([previousRank, rank])
  redirect("/revision")
}
