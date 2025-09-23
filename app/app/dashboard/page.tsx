
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { DashboardClient } from './_components/dashboard-client';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  // Получаем статистику пользователя
  const [totalOrders, recentOrders] = await Promise.all([
    prisma.order.count({
      where: { userId: (session.user as any).id }
    }),
    prisma.order.findMany({
      where: { userId: (session.user as any).id },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ]);

  const completedOrders = await prisma.order.count({
    where: {
      userId: (session.user as any).id,
      status: 'completed'
    }
  });

  const pendingOrders = await prisma.order.count({
    where: {
      userId: (session.user as any).id,
      status: { in: ['pending', 'processing'] }
    }
  });

  const stats = {
    totalOrders,
    completedOrders,
    pendingOrders,
  };

  return (
    <DashboardClient
      user={session.user}
      stats={stats}
      recentOrders={recentOrders}
    />
  );
}
