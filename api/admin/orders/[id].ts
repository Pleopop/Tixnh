import type { VercelRequest, VercelResponse } from "@vercel/node";
import { OrderStatus } from "@prisma/client";
import { prisma } from "../../../lib/db";
import { getBearerToken, verifyAdminToken } from "../../../lib/auth";
import { applyAdminCors } from "../../../lib/cors";

const VALID_STATUSES = new Set<string>(Object.values(OrderStatus));

function unauthorized(res: VercelResponse) {
  return res.status(401).json({ error: "Unauthorized" });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyAdminCors(req, res)) return;

  const token = getBearerToken(req.headers.authorization);
  const payload = token ? verifyAdminToken(token) : null;
  if (!payload) return unauthorized(res);

  const { id } = req.query;
  if (typeof id !== "string" || !id) {
    return res.status(400).json({ error: "Thiếu mã đơn hàng" });
  }

  if (req.method !== "PATCH") {
    res.setHeader("Allow", "PATCH");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { status } = req.body as { status?: string };
  if (!status || !VALID_STATUSES.has(status)) {
    return res.status(400).json({ error: "Trạng thái không hợp lệ" });
  }

  try {
    const order = await prisma.order.update({
      where: { id },
      data: { status: status as OrderStatus },
      include: { items: true },
    });

    return res.status(200).json({ order });
  } catch {
    return res.status(404).json({ error: "Không tìm thấy đơn hàng" });
  }
}
