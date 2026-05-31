import { Prisma } from "@prisma/client";
import type { VercelResponse } from "@vercel/node";
import { serializeError } from "./db";

export function handleDbError(res: VercelResponse, err: unknown, fallback: string) {
  console.error(fallback, err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2021") {
      return res.status(503).json({
        error:
          "Database chưa có bảng. Chạy: vercel env pull .env && npx prisma db push && npm run db:seed",
      });
    }
  }

  if (err instanceof Error) {
    if (err.message.includes("JWT_SECRET")) {
      return res.status(503).json({ error: "Thiếu JWT_SECRET trên Vercel Environment Variables." });
    }
    if (
      err.message.includes("Database URL") ||
      err.message.includes("Environment variable not found: POSTGRES")
    ) {
      return res.status(503).json({
        error: "Thiếu POSTGRES_URL. Gắn Vercel Postgres vào project tixnh.",
      });
    }
  }

  const info = serializeError(err);
  console.error(fallback, info);

  return res.status(500).json({ error: fallback, detail: info.message });
}
