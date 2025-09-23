
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { apiClient } from '@/lib/api-client';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Необходимо войти в систему' },
        { status: 401 }
      );
    }

    const order = await prisma.order.findFirst({
      where: {
        id: params.id,
        userId: (session.user as any).id,
      },
    });

    if (!order) {
      return NextResponse.json(
        { message: 'Заказ не найден' },
        { status: 404 }
      );
    }

    // Если есть backendOrderId, проверим статус в backend API
    if (order.backendOrderId && order.status !== 'completed') {
      try {
        const backendResponse = await apiClient.getOrderStatus(order.backendOrderId);
        
        if (backendResponse.success && backendResponse.data) {
          const { status, card_url } = backendResponse.data;
          
          // Обновляем статус если изменился
          if (status !== order.status || (card_url && !order.generatedCardUrl)) {
            const updatedOrder = await prisma.order.update({
              where: { id: order.id },
              data: {
                status: status,
                generatedCardUrl: card_url || order.generatedCardUrl,
              },
            });
            
            return NextResponse.json({ order: updatedOrder });
          }
        }
      } catch (backendError) {
        console.error('Backend status check error:', backendError);
        // Возвращаем существующий статус если backend недоступен
      }
    }

    return NextResponse.json({ order });

  } catch (error) {
    console.error('Get order error:', error);
    return NextResponse.json(
      { message: 'Ошибка при получении заказа' },
      { status: 500 }
    );
  }
}
