import { Prisma, PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export function resolveDatabaseUrl(): string {
  const url =
    process.env.POSTGRES_PRISMA_URL ??
    process.env.POSTGRES_URL ??
    process.env.DATABASE_URL;

  if (!url) {
    throw new Error("Database URL is not configured (POSTGRES_URL)");
  }
  return normalizeDatabaseUrl(url);
}

function normalizeDatabaseUrl(url: string): string {
  let next = url;

  if (!next.includes("sslmode=")) {
    next += next.includes("?") ? "&sslmode=require" : "?sslmode=require";
  }

  const isPooler =
    next.includes("-pooler.") ||
    next.includes(".pooler.") ||
    next.includes("pgbouncer=true");

  if (isPooler && !next.includes("pgbouncer=true")) {
    next += "&pgbouncer=true";
  }

  return next;
}

function createPrismaClient(): PrismaClient {
  const url = resolveDatabaseUrl();
  const log: Prisma.LogLevel[] =
    process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"];

  return new PrismaClient({
    datasources: { db: { url } },
    log,
  });
}

export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

export function serializeError(err: unknown): {
  message: string;
  code?: string;
  name?: string;
} {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return { message: err.message, code: err.code, name: err.name };
  }
  if (err instanceof Prisma.PrismaClientInitializationError) {
    return { message: err.message, code: err.errorCode, name: err.name };
  }
  if (err instanceof Prisma.PrismaClientRustPanicError) {
    return { message: err.message, name: err.name };
  }
  if (err instanceof Error) {
    return { message: err.message, name: err.name };
  }
  if (typeof err === "object" && err !== null) {
    const record = err as Record<string, unknown>;
    if (typeof record.message === "string") {
      return {
        message: record.message,
        name: typeof record.name === "string" ? record.name : "UnknownError",
        code: typeof record.code === "string" ? record.code : undefined,
      };
    }
    try {
      return { message: JSON.stringify(err), name: "SerializedError" };
    } catch {
      return { message: String(err), name: "UnknownError" };
    }
  }
  return { message: String(err), name: "UnknownError" };
}
