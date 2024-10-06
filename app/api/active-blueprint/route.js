import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const activeBlueprints = await prisma.blueprint.findMany({
      where: { isActive: true },
      include: {
        components: true,
        templates: true,
      },
    });
    return NextResponse.json(activeBlueprints);
  } catch (error) {
    console.error('Error fetching active blueprints:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}