
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  Star, 
  Zap,
  Package,
  TrendingUp,
  Shield,
  BarChart3,
  Image as ImageIcon,
  FileText,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const tariffPlans = [
  {
    id: 'start',
    name: 'Start',
    price: 299,
    description: 'Идеально для начинающих продавцов',
    features: [
      'Основная карточка товара',
      'До 3 изображений',
      'Базовое описание товара',
      'Поддержка WB и OZON',
      'Стандартное оформление',
      'Поддержка в чате'
    ],
    icon: Package,
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 599,
    description: 'Для профессиональных продавцов',
    popular: true,
    features: [
      'Премиум карточка товара',
      'До 10 изображений',
      'Детальное SEO описание',
      'A/B тестирование заголовков',
      'Анализ конкурентов',
      'Аналитика конверсий',
      'Персональный менеджер',
      'Приоритетная поддержка'
    ],
    icon: Star,
    gradient: 'from-purple-500 to-pink-600'
  }
];

const additionalFeatures = [
  {
    icon: TrendingUp,
    title: 'Увеличение продаж',
    description: 'В среднем рост конверсии на 40% за первый месяц'
  },
  {
    icon: Shield,
    title: 'Гарантия качества',
    description: '100% соответствие требованиям маркетплейсов'
  },
  {
    icon: BarChart3,
    title: 'Аналитика',
    description: 'Детальная статистика по эффективности карточек'
  },
  {
    icon: Users,
    title: 'Поддержка 24/7',
    description: 'Всегда готовы помочь с любыми вопросами'
  }
];

export default function PricingPage() {
  const { data: session } = useSession() || {};
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    if (!session?.user) {
      router.push('/auth/signup');
      return;
    }
    
    setSelectedPlan(planId);
    router.push(`/?tariff=${planId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="container mx-auto max-w-7xl px-4 space-y-20">
        {/* Header */}
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="secondary" className="mx-auto px-4 py-2 text-sm">
            <Zap className="w-4 h-4 mr-2" />
            Простые и понятные цены
          </Badge>
          
          <h1 className="text-5xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Выберите свой тариф
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Начните с базового тарифа или выберите Pro для максимального результата. 
            Все тарифы включают гарантию качества и поддержку.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {tariffPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative ${plan.popular ? 'lg:scale-105' : ''}`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
                    <Star className="w-3 h-3 mr-1" />
                    Популярный выбор
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full border-0 shadow-xl overflow-hidden ${
                plan.popular ? 'ring-2 ring-purple-200 ring-offset-2' : ''
              }`}>
                <div className={`h-2 bg-gradient-to-r ${plan.gradient}`} />
                
                <CardHeader className="pb-8 pt-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${plan.gradient} text-white`}>
                        <plan.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {plan.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      <span className="text-xl text-muted-foreground ml-2">₽</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      за одну карточку товара
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * featureIndex }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-6 pb-8">
                  <Button
                    size="lg"
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0' 
                        : ''
                    }`}
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={selectedPlan === plan.id}
                  >
                    {selectedPlan === plan.id ? (
                      'Выбран'
                    ) : session?.user ? (
                      'Создать карточку'
                    ) : (
                      'Начать работу'
                    )}
                    <Zap className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Что вы получаете с любым тарифом</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Независимо от выбранного тарифа, вы получаете высококачественный сервис
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="pt-6 text-center space-y-4">
                    <div className="inline-flex p-3 rounded-full bg-blue-100">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Часто задаваемые вопросы</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'Сколько времени занимает создание карточки?',
                a: 'Обычно мы создаем карточки товаров в течение 24 часов. Для тарифа Pro срок может быть увеличен до 48 часов из-за дополнительной проработки.'
              },
              {
                q: 'Можно ли внести изменения в готовую карточку?',
                a: 'Да, мы предоставляем одну бесплатную доработку в течение 7 дней после получения готовой карточки.'
              },
              {
                q: 'Какие форматы изображений вы принимаете?',
                a: 'Мы принимаем JPG, PNG, WEBP форматы. Рекомендуемое разрешение от 1000x1000 пикселей.'
              },
              {
                q: 'Гарантируете ли вы результат?',
                a: 'Мы гарантируем соответствие всем требованиям маркетплейсов и качественное выполнение работы. При необходимости предоставляем доработки.'
              }
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
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
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold">Готовы начать?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Присоединяйтесь к сотням продавцов, которые уже увеличили свои продажи с UPAK
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!session?.user ? (
              <>
                <Button size="lg" variant="secondary" asChild className="px-8">
                  <Link href="/auth/signup">
                    Создать аккаунт бесплатно
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-purple-700" asChild>
                  <Link href="/contact">Задать вопрос</Link>
                </Button>
              </>
            ) : (
              <Button size="lg" variant="secondary" asChild className="px-8">
                <Link href="/">
                  <Zap className="w-4 h-4 mr-2" />
                  Создать первую карточку
                </Link>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
