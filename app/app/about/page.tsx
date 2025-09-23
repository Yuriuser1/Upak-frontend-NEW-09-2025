
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Users, 
  TrendingUp, 
  Award,
  Zap,
  Shield,
  BarChart3,
  CheckCircle,
  Sparkles,
  Package
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const stats = [
  { number: '2,500+', label: 'Карточек создано', icon: Package },
  { number: '850+', label: 'Довольных клиентов', icon: Users },
  { number: '40%', label: 'Рост продаж', icon: TrendingUp },
  { number: '24ч', label: 'Среднее время', icon: Zap }
];

const values = [
  {
    icon: Target,
    title: 'Фокус на результат',
    description: 'Мы создаем карточки, которые действительно продают. Каждый элемент направлен на увеличение конверсии.'
  },
  {
    icon: Shield,
    title: 'Качество превыше всего',
    description: '100% соответствие требованиям маркетплейсов. Мы гарантируем профессиональное исполнение каждого заказа.'
  },
  {
    icon: BarChart3,
    title: 'Данные и аналитика',
    description: 'Используем актуальные данные рынка и поведения покупателей для создания эффективных карточек.'
  },
  {
    icon: Users,
    title: 'Клиентоориентированность',
    description: 'Индивидуальный подход к каждому клиенту. Поддержка на всех этапах сотрудничества.'
  }
];

const team = [
  {
    name: 'Алексей Иванов',
    role: 'Основатель и CEO',
    description: 'Эксперт по e-commerce с 8-летним опытом работы на маркетплейсах',
    image: '/team/alexey.jpg'
  },
  {
    name: 'Мария Петрова',
    role: 'Главный дизайнер',
    description: 'Специалист по визуальному оформлению карточек товаров',
    image: '/team/maria.jpg'
  },
  {
    name: 'Дмитрий Сидоров',
    role: 'SEO специалист',
    description: 'Эксперт по оптимизации карточек для поисковых алгоритмов',
    image: '/team/dmitry.jpg'
  }
];

const milestones = [
  { year: '2022', title: 'Основание UPAK', description: 'Запуск проекта с фокусом на качество' },
  { year: '2023', title: '1000 карточек', description: 'Достигли первой тысячи созданных карточек' },
  { year: '2024', title: 'Расширение команды', description: 'Увеличили команду экспертов в 2 раза' },
  { year: '2024', title: 'Новые возможности', description: 'Запустили Pro-тариф с расширенной аналитикой' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="container mx-auto max-w-7xl px-4 space-y-20">
        {/* Hero Section */}
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="secondary" className="mx-auto px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            О компании UPAK
          </Badge>
          
          <h1 className="text-5xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Превращаем товары в бестселлеры
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            UPAK — это команда экспертов по e-commerce, которая помогает продавцам создавать 
            эффективные карточки товаров для маркетплейсов WB и OZON.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center space-y-3"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="inline-flex p-3 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full">
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-600">{stat.number}</h3>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission */}
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Наша миссия</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Мы верим, что каждый товар заслуживает профессиональной презентации. 
              Наша цель — помочь российским предпринимателям успешно продавать на маркетплейсах, 
              создавая карточки товаров, которые выделяются среди конкурентов и привлекают покупателей.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Наши ценности</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Принципы, которыми мы руководствуемся в работе
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-blue-100 rounded-full flex-shrink-0">
                        <value.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">{value.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">История развития</h2>
            <p className="text-lg text-muted-foreground">
              Ключевые моменты нашего пути
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    {milestone.year}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-semibold">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Почему выбирают UPAK?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Экспертность',
                description: 'Команда экспертов с многолетним опытом работы на маркетплейсах',
                icon: Award
              },
              {
                title: 'Результат',
                description: 'В среднем наши карточки показывают рост продаж на 40%',
                icon: TrendingUp
              },
              {
                title: 'Скорость',
                description: 'Создаем качественные карточки за 24-48 часов',
                icon: Zap
              }
            ].map((item, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="pt-8 pb-6">
                  <div className="inline-flex p-4 bg-purple-100 rounded-full mb-4">
                    <item.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center space-y-6 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12 rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 className="text-3xl font-bold">Готовы к сотрудничеству?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Присоединяйтесь к нашим клиентам и начните увеличивать продажи уже сегодня
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="px-8">
              <Link href="/">
                <Package className="w-4 h-4 mr-2" />
                Создать карточку
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-purple-700" asChild>
              <Link href="/contact">Связаться с нами</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
