import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');
  const logs = await prisma.beaconUsage.findMany({
    take: 10,
    orderBy: { timestamp: 'desc' },
    select: { id: true, userId: true, endpoint: true, status: true, cdtHash: true, timestamp: true },
  });
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Consent DNA Dashboard</h1>
      <p className="text-sm mb-4">Patent-Pending Compliance Platform</p>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Endpoint</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">CDT Hash</th>
            <th className="border p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="border p-2">{log.id}</td>
              <td className="border p-2">{log.userId}</td>
              <td className="border p-2">{log.endpoint}</td>
              <td className="border p-2">{log.status}</td>
              <td className="border p-2">{log.cdtHash}</td>
              <td className="border p-2">{log.timestamp.toISOString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
