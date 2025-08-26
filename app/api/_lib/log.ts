import prisma from '../../../lib/db';

export async function logBeacon(d:{userId:string;endpoint:string;status:string;cdtHash?:string;meta?:any}) {
  try { 
    await prisma.beaconUsage.create({ 
      data: { 
        userId:d.userId||'anonymous', 
        endpoint:d.endpoint, 
        status:d.status, 
        cdtHash:d.cdtHash||null, 
        meta:d.meta??null 
      } 
    }); 
  } catch {}
}
