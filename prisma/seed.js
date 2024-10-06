const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const blueprint1 = await prisma.blueprint.upsert({
    where: { name: 'Test Blueprint 1' },
    update: {},
    create: {
      name: 'Test Blueprint 1',
      config: JSON.stringify({ test: 'config' }),
      isActive: true,
    },
  });

  const blueprint2 = await prisma.blueprint.upsert({
    where: { name: 'Test Blueprint 2' },
    update: {},
    create: {
      name: 'Test Blueprint 2',
      config: JSON.stringify({ test: 'config2' }),
      isActive: false,
    },
  });

  console.log({ blueprint1, blueprint2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });