import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient, type Prisma } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export function resolveDatabaseUrl(): string {
  const url =
    process.env.POSTGRES_PRISMA_URL ??
    process.env.POSTGRES_URL ??
    process.env.DATABASE_URL;

  if (!url) {
    throw new Error("Database URL is not configured (POSTGRES_URL)");
  }
  return url;
}

function shouldUseNeonAdapter(connectionString: string): boolean {
  return (
    process.env.VERCEL === "1" ||
    connectionString.includes("neon.tech") ||
    connectionString.includes("-pooler")
  );
}

function createPrismaClient(): PrismaClient {
  const connectionString = resolveDatabaseUrl();
  const log: Prisma.LogLevel[] =
    process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"];

  if (shouldUseNeonAdapter(connectionString)) {
    const adapter = new PrismaNeon({ connectionString });
    return new PrismaClient({ adapter, log });
  }

  return new PrismaClient({ log });
}

export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}
