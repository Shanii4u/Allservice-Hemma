import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash('Admin123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@allservicejarfalla.se' },
    update: {},
    create: {
      email: 'admin@allservicejarfalla.se',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log({ admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 