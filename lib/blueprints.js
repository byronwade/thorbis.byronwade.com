import prisma from './prisma';

export async function getBlueprints() {
  return await prisma.blueprint.findMany();
}

export async function setActiveBlueprint(id) {
  await prisma.blueprint.updateMany({
    data: { isActive: false },
  });

  return await prisma.blueprint.update({
    where: { id },
    data: { isActive: true },
  });
}