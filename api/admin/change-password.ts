import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getBearerToken, verifyAdminToken } from "../../lib/auth";
import { applyAdminCors } from "../../lib/cors";

const MIN_PASSWORD_LENGTH = 8;

function unauthorized(res: VercelResponse) {
  return res.status(401).json({ error: "Unauthorized" });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyAdminCors(req, res)) return;

  const token = getBearerToken(req.headers.authorization);
  const payload = token ? verifyAdminToken(token) : null;
  if (!payload) return unauthorized(res);

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { currentPassword, newPassword } = req.body as {
    currentPassword?: string;
    newPassword?: string;
  };

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Vui lòng nhập đủ mật khẩu hiện tại và mật khẩu mới" });
  }

  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    return res
      .status(400)
      .json({ error: `Mật khẩu mới phải có ít nhất ${MIN_PASSWORD_LENGTH} ký tự` });
  }

  if (currentPassword === newPassword) {
    return res.status(400).json({ error: "Mật khẩu mới phải khác mật khẩu hiện tại" });
  }

  try {
    const bcrypt = (await import("bcryptjs")).default;
    const { getPrisma } = await import("../../lib/db");
    const { signAdminToken } = await import("../../lib/auth");
    const prisma = getPrisma();

    const user = await prisma.adminUser.findUnique({
      where: { id: payload.sub },
    });

    if (!user || !(await bcrypt.compare(currentPassword, user.passwordHash))) {
      return res.status(400).json({ error: "Mật khẩu hiện tại không đúng" });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await prisma.adminUser.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    const newToken = signAdminToken({ sub: user.id, username: user.username });

    return res.status(200).json({
      message: "Đổi mật khẩu thành công",
      token: newToken,
    });
  } catch (err) {
    console.error("change password error", err);
    return res.status(500).json({ error: "Không thể đổi mật khẩu" });
  }
}
