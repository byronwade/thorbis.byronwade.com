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

    for (const folder of blueprintFolders) {
      const configPath = path.join(BLUEPRINTS_DIR, folder, 'blueprint-config.js');
      console.log('Checking config path:', configPath);

      try {
        await fs.access(configPath);
        const configContent = await fs.readFile(configPath, 'utf-8');
        const configObject = JSON.parse(configContent.replace(/^module\.exports\s*=\s*/, '').replace(/;$/, ''));
        console.log('Parsed config object:', configObject);

        const componentsDir = path.join(BLUEPRINTS_DIR, folder, 'components');
        const templatesDir = path.join(BLUEPRINTS_DIR, folder, 'templates');

        const components = await readDirRecursive(componentsDir);
        const templates = await readDirRecursive(templatesDir);

        validBlueprints.push({ 
          name: folder, 
          config: configObject, 
          components, 
          templates 
        });
      } catch (error) {
        console.error(`Error processing ${folder}:`, error);
      }
    }

    console.log('Valid blueprints:', validBlueprints);

    // Sync valid blueprints with the database
    for (const blueprint of validBlueprints) {
      const createdBlueprint = await prisma.blueprint.upsert({
        where: { name: blueprint.name },
        update: {
          config: blueprint.config,
          isActive: blueprint.config.isActive || false,
        },
        create: {
          name: blueprint.name,
          config: blueprint.config,
          isActive: blueprint.config.isActive || false,
        },
      });

      // Sync components
      await syncComponents(createdBlueprint.id, blueprint.components);

      // Sync templates
      await syncTemplates(createdBlueprint.id, blueprint.templates);
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

    console.log('Sync completed');
    return { 
      success: true, 
      validBlueprints: validBlueprints.map(b => b.name),
      removedBlueprints: blueprintsToRemove.map(b => b.name)
    };
  } catch (error) {
    console.error('Error syncing blueprints:', error);
    return { success: false, error: error.message };
  }
}

async function readDirRecursive(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const res = path.resolve(dir, entry.name);
    return entry.isDirectory() ? readDirRecursive(res) : res;
  }));
  return files.flat();
}

async function syncComponents(blueprintId, components) {
  // Remove existing components
  await prisma.component.deleteMany({
    where: { blueprintId },
  });

  // Add new components
  for (const component of components) {
    await prisma.component.create({
      data: {
        name: path.basename(component),
        path: component,
        blueprintId,
      },
    });
  }
}

async function syncTemplates(blueprintId, templates) {
  // Remove existing templates
  await prisma.template.deleteMany({
    where: { blueprintId },
  });

  // Add new templates
  for (const template of templates) {
    await prisma.template.create({
      data: {
        name: path.basename(template),
        path: template,
        blueprintId,
      },
    });
  }
}