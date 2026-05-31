import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getPrisma, resolveDatabaseUrl, serializeError } from "./lib/db";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const steps: string[] = [];

  try {
    resolveDatabaseUrl();
    steps.push("env");

    const prisma = getPrisma();
    steps.push("client");

    await prisma.$queryRaw`SELECT 1`;
    steps.push("query");

    const adminCount = await prisma.adminUser.count();
    steps.push("count");

    return res.status(200).json({
      db: "ok",
      adminUsers: adminCount,
      hint: adminCount === 0 ? "Chạy npm run db:seed để tạo tài khoản admin" : undefined,
    });
  } catch (err) {
    console.error("db-health failed at steps:", steps, err);
    const info = serializeError(err);

    return res.status(503).json({
      db: "error",
      steps,
      ...info,
      hint:
        info.code === "P2021"
          ? "Chạy: vercel env pull .env && npx prisma db push && npm run db:seed"
          : info.message.includes("POSTGRES_URL")
            ? "Thêm POSTGRES_URL trong Vercel → Settings → Environment Variables"
            : undefined,
    });
  }
}
