import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getBearerToken, verifyAdminToken } from "../../lib/auth";
import { applyAdminCors } from "../../lib/cors";

function unauthorized(res: VercelResponse) {
  return res.status(401).json({ error: "Unauthorized" });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyAdminCors(req, res)) return;

  const token = getBearerToken(req.headers.authorization);
  const payload = token ? verifyAdminToken(token) : null;
  if (!payload) return unauthorized(res);

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { getPrisma } = await import("../../lib/db");
    const prisma = getPrisma();

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });

    return res.status(200).json({ orders });
  } catch (err) {
    console.error("admin orders list error", err);
    return res.status(500).json({ error: "Không thể tải danh sách đơn hàng" });
  }
}
