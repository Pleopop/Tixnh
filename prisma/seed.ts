import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const teamMembers = [
    { username: "LeThiHa", password: "password123" },
    { username: "VuQuynhHuong", password: "password123" },
    { username: "KhanhHuyen", password: "password123" },
    { username: "HuongNguyen", password: "password123" },
    { username: "DucHung", password: "password123" },
    { username: "NguyenHung", password: "password123" },
  ];

  for (const member of teamMembers) {
    const passwordHash = await bcrypt.hash(member.password, 12);
    
    await prisma.adminUser.upsert({
      where: { username: member.username },
      update: { passwordHash },
      create: { username: member.username, passwordHash },
    });
    console.log(`Admin user ready: ${member.username}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
