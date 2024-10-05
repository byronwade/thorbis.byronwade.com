const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const blueprint = await prisma.blueprint.create({
    data: {
      name: 'Test Blueprint',
      config: '{}',
      isActive: true,
    },
  });
  console.log('Created blueprint:', blueprint);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });