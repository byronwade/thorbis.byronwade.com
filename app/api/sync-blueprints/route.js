import { syncBlueprints } from '@/app/actions/syncBlueprints';
import { NextResponse } from 'next/server';

export async function GET() {
  const result = await syncBlueprints();
  return NextResponse.json(result);
}