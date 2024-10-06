import { syncBlueprints } from '@/app/actions/syncBlueprints';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('Sync blueprints API route called');
  const result = await syncBlueprints();
  console.log('Sync result:', result);
  return NextResponse.json(result);
}