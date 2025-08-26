import { createHash } from 'crypto';
export const cdtHash = (x: unknown) =>
  createHash('sha256').update(typeof x === 'string' ? x : JSON.stringify(x||{})).digest('hex');
