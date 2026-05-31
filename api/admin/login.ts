import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/db";
import { signAdminToken } from "../../lib/auth";
import { applyAdminCors } from "../../lib/cors";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyAdminCors(req, res)) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body as {
    username?: string;
    password?: string;
  };

  if (!username?.trim() || !password) {
    return res.status(400).json({ error: "Thiếu tài khoản hoặc mật khẩu" });
  }

  try {
    const user = await prisma.adminUser.findUnique({
      where: { username: username.trim() },
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "Tài khoản hoặc mật khẩu không đúng" });
    }

    const token = signAdminToken({ sub: user.id, username: user.username });

    return res.status(200).json({
      token,
      username: user.username,
      expiresIn: "7d",
    });
  } catch (err) {
    console.error("admin login error", err);
    return res.status(500).json({ error: "Đăng nhập thất bại" });
  }
}
