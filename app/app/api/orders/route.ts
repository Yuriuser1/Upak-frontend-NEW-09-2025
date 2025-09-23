
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { apiClient } from '@/lib/api-client';
import { CreateOrderRequest } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Необходимо войти в систему' },
        { status: 401 }
      );
    }

    const orderData: CreateOrderRequest = await request.json();

    // Валидация
    if (!orderData.productName || !orderData.productDescription || 
        !orderData.marketplace || !orderData.price || !orderData.tariff) {
      return NextResponse.json(
        { message: 'Заполните все обязательные поля' },
        { status: 400 }
      );
    }

    if (orderData.productImages.length === 0) {
      return NextResponse.json(
        { message: 'Загрузите хотя бы одно изображение' },
        { status: 400 }
      );
    }

    // Определяем цену тарифа
    const tariffPrices = { start: 299, pro: 599 };
    const totalAmount = tariffPrices[orderData.tariff as keyof typeof tariffPrices];

    // Создаем заказ в нашей БД
    const order = await prisma.order.create({
      data: {
        userId: (session.user as any).id,
        productName: orderData.productName,
        productDescription: orderData.productDescription,
        marketplace: orderData.marketplace,
        price: orderData.price,
        tariff: orderData.tariff,
        productImages: orderData.productImages,
        totalAmount,
        status: 'pending',
        paymentStatus: 'unpaid',
      },
    });

    try {
      // Отправляем заказ в backend API
      const backendResponse = await apiClient.createOrder({
        product_name: orderData.productName,
        product_description: orderData.productDescription,
        marketplace: orderData.marketplace,
        price: orderData.price,
        tariff: orderData.tariff,
        images: orderData.productImages,
      });

      if (backendResponse.success && backendResponse.data?.order_id) {
        // Обновляем заказ с ID из backend
        await prisma.order.update({
          where: { id: order.id },
          data: {
            backendOrderId: backendResponse.data.order_id,
            status: 'processing',
          },
        });
      }
    } catch (backendError) {
      console.error('Backend API error:', backendError);
      // Не прерываем процесс, заказ остается pending
    }

    return NextResponse.json({
      message: 'Заказ успешно создан',
      order: {
        id: order.id,
        status: order.status,
        totalAmount: order.totalAmount,
      },
    });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { message: 'Ошибка при создании заказа' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Необходимо войти в систему' },
        { status: 401 }
      );
    }

    const orders = await prisma.order.findMany({
      where: { userId: (session.user as any).id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ orders });

  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { message: 'Ошибка при получении заказов' },
      { status: 500 }
    );
  }
}
