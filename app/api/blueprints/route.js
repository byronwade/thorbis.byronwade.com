import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    console.log('API route: Starting to fetch blueprints');
    
    try {
        const blueprints = await prisma.blueprint.findMany();
        
        if (blueprints.length === 0) {
            console.log('API route: No blueprints found in the database');
            return NextResponse.json({ message: 'No blueprints found' }, { status: 404 });
        }

        console.log('API route: Fetched blueprints:', blueprints);
        return NextResponse.json(blueprints);
    } catch (error) {
        console.error('Error fetching blueprints:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const { id } = await request.json();

        // Set all blueprints to inactive
        await prisma.blueprint.updateMany({
            data: { isActive: false },
        });

        // Set the selected blueprint to active
        const updatedBlueprint = await prisma.blueprint.update({
            where: { id },
            data: { isActive: true },
        });

        return NextResponse.json(updatedBlueprint);
    } catch (error) {
        console.error('Error updating blueprint:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}