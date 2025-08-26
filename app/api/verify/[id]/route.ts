import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const runtime = 'nodejs';

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const id = params.id;
  const row = await prisma.beaconUsage.findFirst({
    where: { cdtHash: id },
    orderBy: { timestamp: 'desc' },
  });

  if (!row) {
    return NextResponse.json({ valid: false, reason: 'not found' }, { status: 404 });
  }

  return NextResponse.json({
    valid: row.status === 'ALLOW',
    status: row.status,
    endpoint: row.endpoint,
    userId: row.userId,
    timestamp: row.timestamp,
  });
}
