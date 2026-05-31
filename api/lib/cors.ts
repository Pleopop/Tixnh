import type { VercelRequest, VercelResponse } from "@vercel/node";

const LOCAL_ORIGINS = [
  "http://localhost:5174",
  "http://127.0.0.1:5174",
];

const DEFAULT_ADMIN_ORIGINS = [
  "https://tinhx-admin.vercel.app",
  "https://admin-tinhx.vercel.app",
];

const ADMIN_ORIGIN_PATTERN =
  /^https:\/\/tinhx-admin[a-z0-9-]*\.vercel\.app$/i;

function parseEnvOrigins(): string[] {
  const fromList = process.env.ADMIN_ORIGINS?.split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  const single = process.env.ADMIN_ORIGIN?.trim();
  return [...(fromList ?? []), ...(single ? [single] : [])];
}

function isAllowedOrigin(origin: string): boolean {
  const allowed = [...parseEnvOrigins(), ...DEFAULT_ADMIN_ORIGINS, ...LOCAL_ORIGINS];
  if (allowed.includes(origin)) return true;
  return ADMIN_ORIGIN_PATTERN.test(origin);
}

export function applyAdminCors(req: VercelRequest, res: VercelResponse): boolean {
  const origin = req.headers.origin;

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type, X-Requested-With"
  );
  res.setHeader("Access-Control-Max-Age", "86400");

  if (origin && isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }

  if (req.method === "OPTIONS") {
    if (!origin || !isAllowedOrigin(origin)) {
      res.status(403).json({ error: "CORS origin not allowed" });
      return true;
    }
    res.status(204).end();
    return true;
  }

  return false;
}
