import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const activeBlueprint = await prisma.blueprint.findFirst({
      where: { isActive: true },
    });

    return NextResponse.json({ activeBlueprint });
  } catch (error) {
    console.error('Error fetching active blueprint:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}