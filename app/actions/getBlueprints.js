'use server'

import fs from 'fs/promises'
import path from 'path'

export async function getBlueprint() {
  const blueprintsDir = path.join(process.cwd(), 'blueprints')
  
  try {
    const entries = await fs.readdir(blueprintsDir, { withFileTypes: true })
    const folders = entries
      .filter(entry => entry.isDirectory())
      .map(folder => folder.name)
    return folders
  } catch (error) {
    console.error('Error reading blueprints directory:', error)
    return []
  }
}