
'use client';

import { useSession } from 'next-auth/react';
import { OrderForm } from '@/components/order-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Zap, 
  Star, 
  TrendingUp, 
  Shield, 
  Clock,
  CheckCircle,
  BarChart3,
  Users,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const features = [
  {
    icon: Zap,
    title: 'Быстрое создание',
    description: 'Карточки товаров готовы за 24 часа'
  },
  {
    icon: TrendingUp,
    title: 'Увеличение продаж',
    description: 'Профессиональные карточки повышают конверсию на 40%'
  },
  {
    icon: Shield,
    title: 'Гарантия качества',
    description: 'Соответствие всем требованиям маркетплейсов'
  },
  {
    icon: BarChart3,
    title: 'SEO оптимизация',
    description: 'Оптимизированные описания для поисковой выдачи'
  }
];

const stats = [
  { number: '2,500+', label: 'Созданных карточек' },
  { number: '850+', label: 'Довольных клиентов' },
  { number: '40%', label: 'Рост продаж' },
  { number: '24ч', label: 'Время выполнения' }
];

export default function HomePage() {
  const { data: session } = useSession() || {};

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        <div className="relative container mx-auto max-w-7xl px-4">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mx-auto px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Профессиональные карточки товаров
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Создавайте продающие карточки для WB и OZON
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Увеличьте продажи с помощью профессионально оформленных карточек товаров. 
              SEO-оптимизированные описания и качественные изображения для максимальной конверсии.
            </p>

            {!session?.user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" asChild className="px-8">
                  <Link href="/auth/signup">
                    Начать бесплатно
                    <Zap className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/pricing">Посмотреть тарифы</Link>
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <motion.h3
                  className="text-4xl font-bold text-blue-600"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold">Почему выбирают UPAK?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Мы предоставляем все необходимые инструменты для создания успешных карточек товаров
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, shadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="pt-6 text-center space-y-4">
                    <div className="inline-flex p-3 rounded-full bg-blue-100">
                      <feature.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Order Form Section */}
      {session?.user && (
        <section className="py-20">
          <div className="container mx-auto max-w-7xl px-4">
            <OrderForm />
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!session?.user && (
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto max-w-7xl px-4 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-4">
                Готовы увеличить продажи?
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
                Присоединяйтесь к сотням продавцов, которые уже увеличили свою прибыль с помощью UPAK
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="px-8">
                  <Link href="/auth/signup">
                    Создать аккаунт
                    <Users className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-purple-700" asChild>
                  <Link href="/contact">Связаться с нами</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* How it works section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold">Как это работает</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Простой процесс создания карточки товара в три шага
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Заполните форму',
                description: 'Загрузите изображения и опишите ваш товар'
              },
              {
                step: '02', 
                title: 'Выберите тариф',
                description: 'Выберите подходящий план и оплатите заказ'
              },
              {
                step: '03',
                title: 'Получите результат',
                description: 'Получите готовую карточку товара за 24 часа'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative text-center space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
