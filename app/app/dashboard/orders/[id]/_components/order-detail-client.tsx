
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Download,
  RefreshCw,
  Package,
  Calendar,
  CreditCard,
  Eye,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Order } from '@/lib/types';
import { format, formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import toast from 'react-hot-toast';

interface OrderDetailClientProps {
  order: Order;
}

export function OrderDetailClient({ order: initialOrder }: OrderDetailClientProps) {
  const [order, setOrder] = useState(initialOrder);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshOrderStatus = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch(`/api/orders/${order.id}`);
      if (response.ok) {
        const { order: updatedOrder } = await response.json();
        setOrder(updatedOrder);
        toast.success('Статус заказа обновлен');
      }
    } catch (error) {
      toast.error('Ошибка при обновлении статуса');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Автоматическое обновление статуса каждые 30 секунд для незавершенных заказов
  useEffect(() => {
    if (order.status !== 'completed' && order.status !== 'failed') {
      const interval = setInterval(refreshOrderStatus, 30000);
      return () => clearInterval(interval);
    }
  }, [order.status, order.id]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Ожидает обработки', color: 'bg-yellow-100 text-yellow-800' },
      processing: { label: 'В работе', color: 'bg-blue-100 text-blue-800' },
      completed: { label: 'Завершен', color: 'bg-green-100 text-green-800' },
      failed: { label: 'Ошибка', color: 'bg-red-100 text-red-800' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Заказ принят и ожидает начала обработки';
      case 'processing':
        return 'Наши специалисты работают над созданием вашей карточки товара';
      case 'completed':
        return 'Карточка товара готова! Вы можете скачать результат';
      case 'failed':
        return 'При обработке заказа произошла ошибка. Свяжитесь с поддержкой';
      default:
        return 'Неизвестный статус заказа';
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 space-y-8">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard/orders">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к заказам
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Заказ #{order.id.slice(-8)}</h1>
            <p className="text-muted-foreground">
              Создан {format(new Date(order.createdAt), 'dd MMMM yyyy, HH:mm', { locale: ru })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={refreshOrderStatus}
            disabled={isRefreshing}
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Обновить
          </Button>
          {order.status === 'completed' && order.generatedCardUrl && (
            <Button asChild>
              <Link href={order.generatedCardUrl} target="_blank">
                <Download className="w-4 h-4 mr-2" />
                Скачать карточку
              </Link>
            </Button>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Order Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    {getStatusIcon(order.status)}
                    Статус заказа
                  </CardTitle>
                  {getStatusBadge(order.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {getStatusDescription(order.status)}
                </p>
                {order.status !== 'completed' && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Последнее обновление: {formatDistanceToNow(new Date(order.updatedAt), {
                      addSuffix: true,
                      locale: ru,
                    })}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Информация о товаре
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                        НАЗВАНИЕ ТОВАРА
                      </h3>
                      <p className="text-lg font-medium">{order.productName}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                        ЦЕНА
                      </h3>
                      <p className="text-lg">{order.price} ₽</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                          МАРКЕТПЛЕЙС
                        </h3>
                        <Badge variant="outline">
                          {order.marketplace === 'wb' ? 'Wildberries' : 'OZON'}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                          ТАРИФ
                        </h3>
                        <Badge variant="outline">
                          {order.tariff.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-2">
                      ОПИСАНИЕ
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {order.productDescription}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Images */}
          {order.productImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Изображения товара ({order.productImages.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {order.productImages.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-muted rounded-lg overflow-hidden relative group cursor-pointer"
                        onClick={() => window.open(imageUrl, '_blank')}
                      >
                        <Image
                          src={imageUrl}
                          alt={`Изображение товара ${index + 1}`}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Generated Card */}
          {order.status === 'completed' && order.generatedCardUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-0 shadow-lg border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      Карточка готова!
                    </CardTitle>
                    <Button asChild>
                      <Link href={order.generatedCardUrl} target="_blank">
                        <Download className="w-4 h-4 mr-2" />
                        Скачать
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ваша карточка товара создана и готова к использованию. 
                    Нажмите кнопку "Скачать" для получения файла.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="w-5 h-5" />
                  Сводка заказа
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Тариф {order.tariff}:</span>
                    <span>{order.totalAmount} ₽</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Итого:</span>
                    <span>{order.totalAmount} ₽</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      order.paymentStatus === 'paid' ? 'bg-green-500' :
                      order.paymentStatus === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                    <span className="font-medium text-sm">
                      {order.paymentStatus === 'paid' ? 'Оплачено' :
                       order.paymentStatus === 'failed' ? 'Ошибка оплаты' : 'Ожидает оплаты'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5" />
                  Временная шкала
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Заказ создан</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(order.createdAt), 'dd.MM.yyyy HH:mm')}
                      </p>
                    </div>
                  </div>

                  {order.status !== 'pending' && (
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Обработка начата</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(order.updatedAt), 'dd.MM.yyyy HH:mm')}
                        </p>
                      </div>
                    </div>
                  )}

                  {order.status === 'completed' && (
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Заказ завершен</p>
                        <p className="text-xs text-muted-foreground">
                          Карточка готова к скачиванию
                        </p>
                      </div>
                    </div>
                  )}

                  {order.status === 'failed' && (
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Ошибка обработки</p>
                        <p className="text-xs text-muted-foreground">
                          Обратитесь в поддержку
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Help */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6 text-center space-y-4">
                <h3 className="font-semibold">Нужна помощь?</h3>
                <p className="text-sm text-muted-foreground">
                  Если у вас есть вопросы по заказу, свяжитесь с нашей поддержкой
                </p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="/contact">
                    Связаться с поддержкой
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
