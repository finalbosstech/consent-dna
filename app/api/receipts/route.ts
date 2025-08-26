import { NextRequest, NextResponse } from 'next/server';
import { cdtHash } from '../_lib/hash';
import { logBeacon } from '../_lib/log';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const endpoint='/api/receipts';
  try {
    const b = await req.json().catch(()=>({}));
    const requester = String(b?.requester ?? 'anonymous');
    const payload = b?.payload ?? {};
    const rid = cdtHash({ requester, payload });
    await logBeacon({ userId: requester, endpoint, status: 'ALLOW', cdtHash: rid, meta: { size: JSON.stringify(payload).length } });
    return NextResponse.json({ ok: true, receiptId: rid, ts: new Date().toISOString() }, { status: 200 });
  } catch {
    await logBeacon({ userId: 'anonymous', endpoint, status: 'ERROR' });
    return NextResponse.json({ error: 'receipt error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: '/api/receipts' });
}
