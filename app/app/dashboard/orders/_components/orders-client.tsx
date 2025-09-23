
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ShoppingCart, 
  Search, 
  Filter,
  Eye,
  Download,
  Calendar,
  Package,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Order } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface OrdersClientProps {
  orders: Order[];
}

export function OrdersClient({ orders: initialOrders }: OrdersClientProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [marketplaceFilter, setMarketplaceFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Ожидает', variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800' },
      processing: { label: 'В работе', variant: 'default' as const, color: 'bg-blue-100 text-blue-800' },
      completed: { label: 'Завершен', variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      failed: { label: 'Ошибка', variant: 'destructive' as const, color: 'bg-red-100 text-red-800' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge variant={config.variant} className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  const getPaymentBadge = (paymentStatus: string) => {
    const config = {
      unpaid: { label: 'Не оплачен', color: 'bg-red-100 text-red-800' },
      paid: { label: 'Оплачен', color: 'bg-green-100 text-green-800' },
      failed: { label: 'Ошибка оплаты', color: 'bg-red-100 text-red-800' },
    };

    const statusConfig = config[paymentStatus as keyof typeof config] || config.unpaid;
    return (
      <Badge variant="outline" className={`${statusConfig.color} border-0`}>
        {statusConfig.label}
      </Badge>
    );
  };

  const getMarketplaceName = (marketplace: string) => {
    return marketplace === 'wb' ? 'Wildberries' : 'OZON';
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesMarketplace = marketplaceFilter === 'all' || order.marketplace === marketplaceFilter;
    
    return matchesSearch && matchesStatus && matchesMarketplace;
  });

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
            Мои заказы
          </h1>
          <p className="text-muted-foreground mt-1">
            Всего заказов: {orders.length}
          </p>
        </div>
        
        <Button asChild>
          <Link href="/">
            <Plus className="w-4 h-4 mr-2" />
            Новая карточка
          </Link>
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск по названию товара..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="pending">Ожидает</SelectItem>
            <SelectItem value="processing">В работе</SelectItem>
            <SelectItem value="completed">Завершен</SelectItem>
            <SelectItem value="failed">Ошибка</SelectItem>
          </SelectContent>
        </Select>

        <Select value={marketplaceFilter} onValueChange={setMarketplaceFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Маркетплейс" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все маркетплейсы</SelectItem>
            <SelectItem value="wb">Wildberries</SelectItem>
            <SelectItem value="ozon">OZON</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Orders List */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {filteredOrders.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="text-center py-12">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {searchTerm || statusFilter !== 'all' || marketplaceFilter !== 'all' 
                  ? 'Заказы не найдены' 
                  : 'Пока нет заказов'
                }
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || statusFilter !== 'all' || marketplaceFilter !== 'all'
                  ? 'Попробуйте изменить параметры поиска'
                  : 'Создайте свой первый заказ карточки товара'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && marketplaceFilter === 'all' && (
                <Button asChild>
                  <Link href="/">
                    <Plus className="w-4 h-4 mr-2" />
                    Создать карточку
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      {/* Order Info */}
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-semibold">{order.productName}</h3>
                          {getStatusBadge(order.status)}
                          {getPaymentBadge(order.paymentStatus)}
                          <Badge variant="outline">
                            {getMarketplaceName(order.marketplace)}
                          </Badge>
                          <Badge variant="outline">
                            {order.tariff.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDistanceToNow(new Date(order.createdAt), {
                              addSuffix: true,
                              locale: ru,
                            })}
                          </div>
                          <div>
                            Цена товара: {order.price} ₽
                          </div>
                          <div>
                            Стоимость: {order.totalAmount} ₽
                          </div>
                          <div>
                            Изображений: {order.productImages.length}
                          </div>
                        </div>

                        {order.productDescription && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {order.productDescription}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-2">
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
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
