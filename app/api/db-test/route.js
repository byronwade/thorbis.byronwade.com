import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    console.log('DB Test API route called');
    try {
        const result = await prisma.$queryRaw`SELECT 1 as result`;
        console.log('DB Test result:', result);
        return NextResponse.json({ message: 'Database connection successful', result });
    } catch (error) {
        console.error('Error connecting to database:', error);
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}