import { NextRequest, NextResponse } from 'next/server';
import { cdtHash } from '../_lib/hash'; import { logBeacon } from '../_lib/log';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const endpoint = '/api/permits.issue';
  try {
    const b = await req.json().catch(()=>({}));
    const requester = String(b?.requester ?? 'anonymous');
    const tags = Array.isArray(b?.tags)? b.tags : [];
    const decision:'ALLOW'|'DENY' = 'ALLOW';
    const cdt = cdtHash({ requester, tags, policy: process.env.POLICY_VERSION ?? 'v0' });
    const receipt = { requester, tags, decision, cdtHash: cdt, ts: new Date().toISOString() };
    await logBeacon({ userId: requester, endpoint, status: decision, cdtHash: cdt, meta: { tags } });
    return NextResponse.json({ decision, receipt }, { status: 200 });
  } catch {
    await logBeacon({ userId:'anonymous', endpoint, status:'ERROR' });
    return NextResponse.json({ error: 'permits.issue failed' }, { status: 500 });
  }
}
