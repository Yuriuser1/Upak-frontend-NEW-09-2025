
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { OrderDetailClient } from './_components/order-detail-client';
import { notFound } from 'next/navigation';

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  const order = await prisma.order.findFirst({
    where: {
      id: params.id,
      userId: (session.user as any).id,
    },
  });

  if (!order) {
    notFound();
  }

  return <OrderDetailClient order={order} />;
}
