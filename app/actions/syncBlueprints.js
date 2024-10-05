'use server'

import fs from 'fs/promises';
import path from 'path';
import prisma from '@/lib/prisma';

const BLUEPRINTS_DIR = path.join(process.cwd(), 'blueprints');

export async function syncBlueprints() {
  console.log('Starting syncBlueprints');
  try {
    const blueprintFolders = await fs.readdir(BLUEPRINTS_DIR);
    console.log('Blueprint folders:', blueprintFolders);
    
    const validBlueprints = [];
    const invalidEntries = [];

    for (const folder of blueprintFolders) {
      const configPath = path.join(BLUEPRINTS_DIR, folder, 'blueprint-config.js');
      
      try {
        await fs.access(configPath);
        const configContent = await fs.readFile(configPath, 'utf-8');
        const configObject = Function(`return ${configContent.replace(/^module\.exports\s*=\s*/, '')}`)();
        validBlueprints.push({ name: folder, config: configObject });
      } catch (error) {
        console.error(`Error processing ${folder}:`, error);
        invalidEntries.push(folder);
      }
    }

    // Sync valid blueprints with the database
    for (const blueprint of validBlueprints) {
      await prisma.blueprint.upsert({
        where: { name: blueprint.name },
        update: {
          config: JSON.stringify(blueprint.config),
          isActive: blueprint.config.isActive || false,
        },
        create: {
          name: blueprint.name,
          config: JSON.stringify(blueprint.config),
          isActive: blueprint.config.isActive || false,
        },
      });
    }

    // Remove blueprints from database that no longer exist in the file system
    const existingBlueprints = await prisma.blueprint.findMany();
    const blueprintsToRemove = existingBlueprints.filter(
      bp => !validBlueprints.some(vbp => vbp.name === bp.name)
    );

    for (const blueprint of blueprintsToRemove) {
      await prisma.blueprint.delete({
        where: { id: blueprint.id }
      });
    }

    return { 
      success: true, 
      validBlueprints: validBlueprints.map(b => b.name),
      invalidEntries,
      removedBlueprints: blueprintsToRemove.map(b => b.name)
    };
  } catch (error) {
    console.error('Error syncing blueprints:', error);
    return { success: false, error: error.message };
  }
}