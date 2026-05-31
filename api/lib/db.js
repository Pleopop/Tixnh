import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis;
export function resolveDatabaseUrl() {
    const url = process.env.POSTGRES_PRISMA_URL ??
        process.env.POSTGRES_URL ??
        process.env.DATABASE_URL;
    if (!url) {
        throw new Error("Database URL is not configured (POSTGRES_URL)");
    }
    return url;
}
function shouldUseNeonAdapter(connectionString) {
    return (process.env.VERCEL === "1" ||
        connectionString.includes("neon.tech") ||
        connectionString.includes("-pooler"));
}
function createPrismaClient() {
    const connectionString = resolveDatabaseUrl();
    const log = process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"];
    if (shouldUseNeonAdapter(connectionString)) {
        const adapter = new PrismaNeon({ connectionString });
        return new PrismaClient({ adapter, log });
    }
    return new PrismaClient({ log });
}
export function getPrisma() {
    if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = createPrismaClient();
    }
    return globalForPrisma.prisma;
}
