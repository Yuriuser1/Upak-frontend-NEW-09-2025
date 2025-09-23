
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  ShoppingCart, 
  CheckCircle, 
  Clock,
  Plus,
  Eye,
  Download,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Order } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface DashboardClientProps {
  user: any;
  stats: {
    totalOrders: number;
    completedOrders: number;
    pendingOrders: number;
  };
  recentOrders: Order[];
}

export function DashboardClient({ user, stats, recentOrders }: DashboardClientProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Ожидает', variant: 'secondary' as const },
      processing: { label: 'Обработка', variant: 'default' as const },
      completed: { label: 'Завершен', variant: 'default' as const },
      failed: { label: 'Ошибка', variant: 'destructive' as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getMarketplaceName = (marketplace: string) => {
    return marketplace === 'wb' ? 'Wildberries' : 'OZON';
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      {/* Header */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">
          Добро пожаловать, {user?.firstName || user?.name || 'Пользователь'}!
        </h1>
        <p className="text-muted-foreground">
          Управляйте своими заказами и отслеживайте прогресс создания карточек товаров
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Button asChild size="lg">
          <Link href="/">
            <Plus className="w-4 h-4 mr-2" />
            Новая карточка
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard/orders">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Все заказы
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard/settings">
            Настройки профиля
          </Link>
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Всего заказов
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.totalOrders}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Завершено
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.completedOrders}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  В работе
                </p>
                <p className="text-3xl font-bold text-orange-600">
                  {stats.pendingOrders}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Последние заказы
                </CardTitle>
                <CardDescription>
                  Ваши недавние заказы карточек товаров
                </CardDescription>
              </div>
              {recentOrders.length > 0 && (
                <Button variant="outline" asChild>
                  <Link href="/dashboard/orders">
                    Посмотреть все
                  </Link>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <Package className="w-12 h-12 text-muted-foreground mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Пока нет заказов</h3>
                  <p className="text-muted-foreground">
                    Создайте свою первую карточку товара, чтобы начать!
                  </p>
                </div>
                <Button asChild>
                  <Link href="/">
                    <Plus className="w-4 h-4 mr-2" />
                    Создать карточку
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{order.productName}</h4>
                        {getStatusBadge(order.status)}
                        <Badge variant="outline">
                          {getMarketplaceName(order.marketplace)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Тариф: {order.tariff}</span>
                        <span>Цена: {order.price} ₽</span>
                        <span>
                          {formatDistanceToNow(new Date(order.createdAt), {
                            addSuffix: true,
                            locale: ru,
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {order.status === 'completed' && order.generatedCardUrl && (
                        <Button size="sm" variant="outline" asChild>
                          <Link href={order.generatedCardUrl} target="_blank">
                            <Download className="w-4 h-4 mr-1" />
                            Скачать
                          </Link>
                        </Button>
                      )}
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/orders/${order.id}`}>
                          <Eye className="w-4 h-4 mr-1" />
                          Подробнее
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
