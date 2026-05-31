import type { VercelRequest, VercelResponse } from "@vercel/node";

function allowedOrigins(): string[] {
  const origins = [
    process.env.ADMIN_ORIGIN,
    "https://tinhx-admin.vercel.app", 
    "http://localhost:5174",
    "http://127.0.0.1:5174",
  ].filter((o): o is string => Boolean(o));
  return origins;
}

export function applyAdminCors(req: VercelRequest, res: VercelResponse): boolean {
  const origin = req.headers.origin;
  const allowed = allowedOrigins();

  // Nếu trình duyệt gọi từ link Admin thật, nó sẽ lọt qua khe này
  if (origin && allowed.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).send("OK");
    return true;
  }

  return false;
}