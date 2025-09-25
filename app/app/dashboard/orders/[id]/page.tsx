
'use client';

import { OrderDetailClient } from './_components/order-detail-client';

// Динамическая страница без SSR - вся логика перенесена в клиентский компонент
export default function OrderDetailPage({ params }: { params: { id: string } }) {
  return <OrderDetailClient orderId={params.id} />;
}

// Отключаем статическую генерацию для этого динамического маршрута
export const dynamic = 'force-dynamic';
