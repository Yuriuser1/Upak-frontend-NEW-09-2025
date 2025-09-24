
'use client';

import { useSession } from 'next-auth/react';
import { OrderForm } from '@/components/order-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
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
  Sparkles,
  Target,
  Award,
  FileText,
  Image as ImageIcon,
  Download,
  Headphones,
  User2,
  Quote
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const heroStats = [
  { number: '10,000+', label: 'селлеров конкурируют' },
  { number: '80%', label: 'лучших карточек' }, 
  { number: '95%', label: 'позиций товаров' }
];

const services = [
  {
    icon: FileText,
    title: 'AI-генерация контента',
    description: 'Автоматическое создание заголовков, SEO-оптимизированных описаний и списка преимуществ товара',
    features: ['Заголовки товаров', 'SEO-описания', 'Характеристики', 'Техническое задание']
  },
  {
    icon: ImageIcon,
    title: 'Обработка изображений',
    description: 'AI-обработка фотографий, удаление фона, оптимизация под требования маркетплейсов',
    features: ['Улучшение качества фото', 'Удаление фона', 'Добавление брендинга', 'Генерация через DALL-E']
  },
  {
    icon: Download,
    title: 'Готовые файлы для загрузки',
    description: 'Создание PDF-карточек и Excel-файлов, готовых для прямой загрузки на маркетплейсы',
    features: ['PDF-карточки', 'Excel для массовой загрузки', 'Адаптация под WB/Ozon', 'Файлы для Яндекс.Маркет']
  }
];

const processes = [
  {
    icon: Zap,
    title: 'Быстрое создание',
    description: 'От 5 минут до готовой карточки'
  },
  {
    icon: Target,
    title: 'Автоматизация',
    description: 'Минимум ручной работы'
  },
  {
    icon: Shield,
    title: 'Точность',
    description: 'Соответствие требованиям площадок'
  }
];

const examples = [
  {
    name: 'Умные часы Apple Watch Series 9',
    image: 'https://www.apple.com/newsroom/images/2023/09/apple-introduces-the-advanced-new-apple-watch-series-9/article/Apple-Watch-S9-graphite-stainless-steel-FineWoven-Magenetic-Link-green-230912_inline.jpg.large_2x.jpg',
    features: ['Датчик кислорода', 'GPS + Cellular', 'Защита от воды']
  },
  {
    name: 'Кроссовки Nike Air Max 270',
    image: 'https://d2ob0iztsaxy5v.cloudfront.net/product/340919/3409193160m7_zm.jpg',
    features: ['Технология Air Max', 'Дышащий материал', 'Легкая подошва']
  },
  {
    name: 'Смартфон Samsung Galaxy S24',
    image: 'https://placehold.co/1200x600/e2e8f0/1e293b?text=Image_of_the_Samsung_Galaxy_S24_smartphone',
    features: ['AI-камера 200MP', '120Hz дисплей', '5000mAh батарея']
  },
  {
    name: 'Кофемашина Delonghi Dinamica',
    image: 'https://cdn.www.kitchenshop.eu/images/thumbs/0187273_espressor-automat-1450w-dinamica-plus-titanium-black-delonghi.jpeg',
    features: ['Автоматический капучинатор', '15 бар', 'Керамические жернова']
  },
  {
    name: 'Планшет iPad Pro 12.9',
    image: 'https://netpc.uy/wp-content/uploads/2021/12/2-127.png',
    features: ['M2 чип', 'Liquid Retina XDR', '5G поддержка']
  },
  {
    name: 'Беспроводные наушники AirPods Pro',
    image: 'https://i.pinimg.com/736x/9b/35/3c/9b353c84f8f55ab6dd5d9d6fe4437a8c.jpg',
    features: ['Активное шумоподавление', 'Spatial Audio', 'MagSafe зарядка']
  }
];

const testimonials = [
  {
    name: 'Анна Козлова',
    role: 'Основатель магазина детской одежды',
    image: 'https://i.pinimg.com/originals/f9/f4/a9/f9f4a9ab04a9e13aaac330a0e4d2c438.jpg',
    quote: 'UPAK полностью изменил мой подход к маркетплейсам. Продажи выросли на 300% за первые два месяца! Теперь мои карточки всегда в топе поиска.'
  },
  {
    name: 'Максим Петров',
    role: 'Селлер электроники',
    image: 'https://i.pinimg.com/originals/21/76/78/217678f7eb0ebcae251430dda3529ff0.jpg',
    quote: 'Раньше на создание одной карточки уходило 2-3 дня. Теперь получаю готовый результат за 5 минут. Качество на высоте, поддержка отличная.'
  },
  {
    name: 'Елена Смирнова',
    role: 'Владелица бренда косметики',
    image: 'https://i.pinimg.com/originals/9e/c4/a7/9ec4a7d81442d0183cf332ce959dc310.jpg',
    quote: 'Премиум-тариф окупился за первую неделю. Персональный менеджер помог настроить всю линейку товаров. Результат превзошел ожидания!'
  },
  {
    name: 'Дмитрий Волков',
    role: 'Директор по маркетингу',
    image: 'https://static.vecteezy.com/system/resources/previews/052/249/512/non_2x/professional-headshot-of-a-businessman-in-suit-for-corporate-use-on-transparent-background-png.png',
    quote: 'Использую UPAK для всех наших брендов. AI-генерация контента просто фантастическая - тексты получаются лучше, чем у копирайтеров.'
  },
  {
    name: 'Ольга Фёдорова',
    role: 'Селлер товаров для дома',
    image: 'https://i.pinimg.com/736x/16/68/ee/1668eed8bf54340959857db749565108.jpg?nii=t',
    quote: 'Благодаря UPAK мои товары попали в рекомендации Wildberries. Это был прорыв! Теперь рекомендую всем коллегам.'
  },
  {
    name: 'Александр Новиков',
    role: 'Основатель спортивного магазина',
    image: 'https://i.pinimg.com/originals/a1/e0/ef/a1e0ef437819696fdf265f7109ad553b.jpg',
    quote: 'Пробовал много сервисов, но UPAK - это другой уровень. Особенно впечатляет обработка изображений. Фото стали выглядеть профессионально.'
  }
];

const advantages = [
  {
    icon: Clock,
    title: 'Скорость создания',
    description: 'Получите готовую карточку за 5 минут вместо нескольких дней'
  },
  {
    icon: Shield,
    title: 'Гарантия качества',
    description: 'Соответствие всем требованиям маркетплейсов и SEO-стандартам'
  },
  {
    icon: Headphones,
    title: 'Поддержка 24/7',
    description: 'Круглосуточная помощь экспертов и быстрое решение любых вопросов'
  },
  {
    icon: User2,
    title: 'Персонализация',
    description: 'Адаптация под специфику вашего бренда и целевую аудиторию'
  },
  {
    icon: TrendingUp,
    title: 'Результативность',
    description: 'Карточки созданы для максимальной конверсии и роста продаж'
  },
  {
    icon: Award,
    title: 'Экспертность',
    description: 'Опыт работы с топовыми брендами и знание лучших практик'
  }
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
              Один клик и твоя карточка готова!
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Продающие карточки для маркетплейсов с помощью AI
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Создавайте профессиональные карточки товаров для Wildberries, Ozon и других маркетплейсов за минуты.
            </p>

            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12">
              {heroStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <h3 className="text-3xl font-bold text-blue-600">{stat.number}</h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {!session?.user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                <Button size="lg" asChild className="px-8">
                  <Link href="/auth/signup">
                    Начать бесплатно
                    <Zap className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#services">Узнать больше</Link>
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Key message */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ключ к успешным продажам</h2>
          <p className="text-lg max-w-4xl mx-auto opacity-90 leading-relaxed">
            Высокое качество карточки товара на маркетплейсе – необходимое условие для успешных продаж 
            на крупных площадках к концу 2024 года. Выделиться можно только грамотной подачей товара.
          </p>
          <p className="text-lg max-w-4xl mx-auto opacity-90 mt-4 leading-relaxed">
            <strong>80%</strong> генерируют продаж в своей нише. Попадание в лидеры — результат профессионального подхода. 
            Покупатели выбирают именно те, чьи страницы оформлены наиболее привлекательно и информативно.
          </p>
          <p className="text-base max-w-3xl mx-auto opacity-75 mt-6">
            В условиях жесткой конкуренции исследования показывают, что лишь качественный подход к созданию карточек 
            позволяет выделиться среди сотен тысяч продавцов и получить желаемый результат.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold">Наши услуги</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Полный спектр услуг для создания продающих карточек товаров
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="inline-flex p-3 rounded-full bg-blue-100 mx-auto mb-4">
                      <service.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Гибкие условия для любых потребностей вашего бизнеса</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processes.map((process, index) => (
              <motion.div
                key={index}
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="inline-flex p-4 rounded-full bg-blue-500 text-white">
                  <process.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Примеры наших работ</h2>
            <p className="text-xl text-muted-foreground">
              Посмотрите на результаты наших клиентов и убедитесь в эффективности наших карточек
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-square bg-gray-100">
                    <Image
                      src={example.image}
                      alt={example.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">{example.name}</h3>
                    <ul className="space-y-1">
                      {example.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-xl font-medium mb-6">Готовы получить такие же результаты для своих товаров?</p>
            {!session?.user && (
              <Button size="lg" asChild>
                <Link href="/auth/signup">
                  Начать сейчас
                  <Sparkles className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      {session?.user && (
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto max-w-7xl px-4">
            <OrderForm />
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Отзывы наших клиентов</h2>
            <p className="text-xl text-muted-foreground">
              Узнайте, как UPAK помог тысячам селлеров увеличить продажи и выйти в топ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="relative w-12 h-12 mr-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 text-blue-500 mb-2" />
                    <p className="text-sm leading-relaxed">{testimonial.quote}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Наши преимущества</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Почему более 10,000 селлеров выбирают UPAK для создания карточек товаров
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="inline-flex p-3 rounded-full bg-blue-100">
                  <advantage.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">{advantage.title}</h3>
                <p className="text-muted-foreground">{advantage.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-xl font-medium mb-8">
              Присоединяйтесь к успешным селлерам, которые уже выбрали UPAK
            </p>
            {!session?.user && (
              <Button size="lg" asChild>
                <Link href="/auth/signup">
                  Начать сейчас
                  <TrendingUp className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
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
                Присоединяйтесь к успешным селлерам, которые уже используют UPAK для создания продающих карточек
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="px-8">
                  <Link href="/auth/signup">
                    Создать аккаунт
                    <Users className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-700" asChild>
                  <Link href="/contact">Связаться с нами</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
