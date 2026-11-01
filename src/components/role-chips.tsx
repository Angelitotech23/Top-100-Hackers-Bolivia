import { Badge } from "@/components/ui/badge"
import { roleLabels } from "@/lib/domain"

export function RoleChips({
  roles,
  limit,
  className,
}: {
  roles: readonly string[]
  limit?: number
  className?: string
}) {
  const labels = roleLabels(roles)
  if (labels.length === 0) return null
  const shown = limit ? labels.slice(0, limit) : labels
  const extra = limit ? Math.max(0, labels.length - shown.length) : 0

  return (
    <span className={`flex flex-wrap items-center gap-1 ${className ?? ""}`}>
      {shown.map((label) => (
        <Badge key={label} variant="secondary">
          {label}
        </Badge>
      ))}
      {extra > 0 ? <Badge variant="outline">+{extra}</Badge> : null}
    </span>
  )
}
