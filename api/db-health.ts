import type { VercelRequest, VercelResponse } from "@vercel/node";

/** Kiểm tra kết nối DB — dùng một lần sau deploy, xóa sau khi ổn định. */
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const { getPrisma } = await import("../lib/db");
    const prisma = getPrisma();
    await prisma.$queryRaw`SELECT 1`;
    const adminCount = await prisma.adminUser.count();
    return res.status(200).json({
      db: "ok",
      adminUsers: adminCount,
      hint: adminCount === 0 ? "Chạy npm run db:seed để tạo tài khoản admin" : undefined,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    return res.status(503).json({ db: "error", message });
  }
}
