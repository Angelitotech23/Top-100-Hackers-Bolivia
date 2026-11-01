import { readFile } from "node:fs/promises"
import { join } from "node:path"

const FILENAME = "Bolivia-100-Hackers.pptx"
const CONTENT_TYPE =
  "application/vnd.openxmlformats-officedocument.presentationml.presentation"

export async function GET() {
  const file = await readFile(join(process.cwd(), "public", FILENAME))
  return new Response(file, {
    headers: {
      "Content-Type": CONTENT_TYPE,
      "Content-Disposition": `attachment; filename="${FILENAME}"`,
      "Cache-Control": "public, max-age=3600",
    },
  })
}
