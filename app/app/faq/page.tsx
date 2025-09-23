
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  ChevronDown, 
  ChevronUp,
  HelpCircle,
  MessageCircle,
  Clock,
  CreditCard,
  Package,
  Download,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const faqCategories = [
  { id: 'general', name: 'Общие вопросы', icon: HelpCircle, color: 'bg-blue-100 text-blue-800' },
  { id: 'orders', name: 'Заказы', icon: Package, color: 'bg-green-100 text-green-800' },
  { id: 'payment', name: 'Оплата', icon: CreditCard, color: 'bg-purple-100 text-purple-800' },
  { id: 'delivery', name: 'Сроки', icon: Clock, color: 'bg-orange-100 text-orange-800' },
];

const faqData = [
  {
    id: 1,
    category: 'general',
    question: 'Что такое UPAK и как это работает?',
    answer: 'UPAK — это платформа для создания профессиональных карточек товаров для маркетплейсов Wildberries и OZON. Вы загружаете информацию о товаре и изображения, выбираете тариф, а наши специалисты создают оптимизированную карточку, которая поможет увеличить продажи.',
    popular: true
  },
  {
    id: 2,
    category: 'orders',
    question: 'Как создать заказ на карточку товара?',
    answer: 'Для создания заказа: 1) Зарегистрируйтесь или войдите в аккаунт, 2) Заполните форму с информацией о товаре, 3) Загрузите изображения (до 3 для Start или 10 для Pro), 4) Выберите тариф и оплатите заказ. После оплаты мы начнем работу над вашей карточкой.',
    popular: true
  },
  {
    id: 3,
    category: 'delivery',
    question: 'Сколько времени занимает создание карточки?',
    answer: 'Стандартное время выполнения составляет 24 часа для тарифа Start и до 48 часов для тарифа Pro. В редких случаях при большой загрузке сроки могут увеличиться до 72 часов. Вы получите уведомление, как только карточка будет готова.',
    popular: true
  },
  {
    id: 4,
    category: 'payment',
    question: 'Какие способы оплаты вы принимаете?',
    answer: 'Мы принимаем все основные способы оплаты через систему YooKassa: банковские карты (Visa, MasterCard, МИР), электронные кошельки, банковские переводы. Оплата происходит безопасно и мгновенно.'
  },
  {
    id: 5,
    category: 'orders',
    question: 'Можно ли внести изменения в карточку после её создания?',
    answer: 'Да, мы предоставляем одну бесплатную доработку в течение 7 дней после получения готовой карточки. Дополнительные изменения могут потребовать доплаты в зависимости от объема правок.'
  },
  {
    id: 6,
    category: 'general',
    question: 'В каком формате я получу готовую карточку?',
    answer: 'Готовая карточка предоставляется в формате PDF высокого разрешения, оптимизированном для загрузки на маркетплейсы. Также при необходимости мы можем предоставить отдельные изображения в формате JPG или PNG.'
  },
  {
    id: 7,
    category: 'general',
    question: 'Какие требования к изображениям товара?',
    answer: 'Изображения должны быть в формате JPG, PNG или WEBP, размером не менее 1000x1000 пикселей и не более 10 МБ каждое. Рекомендуем использовать качественные фото товара с разных ракурсов, включая детали и применение.'
  },
  {
    id: 8,
    category: 'delivery',
    question: 'Можно ли ускорить выполнение заказа?',
    answer: 'Да, мы предлагаем срочное выполнение заказа за 12 часов с доплатой 50% от стоимости тарифа. Эта опция доступна при заказе и зависит от текущей загрузки наших специалистов.'
  },
  {
    id: 9,
    category: 'payment',
    question: 'Возможен ли возврат средств?',
    answer: 'Возврат средств возможен только в случае, если мы не смогли выполнить заказ по техническим причинам. После начала работы над карточкой возврат не осуществляется, но мы гарантируем выполнение заказа согласно выбранному тарифу.'
  },
  {
    id: 10,
    category: 'orders',
    question: 'Подходят ли ваши карточки для всех категорий товаров?',
    answer: 'Да, мы создаем карточки для любых категорий товаров, продающихся на маркетплейсах: одежда, электроника, товары для дома, красота и здоровье, детские товары и многое другое. Наши специалисты знают особенности каждой категории.'
  }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="container mx-auto max-w-5xl px-4 space-y-12">
        {/* Header */}
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="secondary" className="mx-auto px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Центр поддержки
          </Badge>
          
          <h1 className="text-5xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Часто задаваемые вопросы
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Найдите ответы на популярные вопросы о создании карточек товаров для маркетплейсов
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по вопросам..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            className="rounded-full"
          >
            Все вопросы
          </Button>
          {faqCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Popular Questions */}
        {selectedCategory === 'all' && !searchTerm && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Популярные вопросы</h2>
              <p className="text-muted-foreground">Самые частые вопросы наших клиентов</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqData.filter(faq => faq.popular).map((faq) => (
                <Card 
                  key={`popular-${faq.id}`}
                  className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => toggleExpanded(faq.id)}
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-sm pr-2">{faq.question}</h3>
                      <Badge variant="secondary" className="text-xs flex-shrink-0">
                        Популярный
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* FAQ List */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {filteredFAQs.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Вопросы не найдены</h3>
                <p className="text-muted-foreground mb-6">
                  Попробуйте изменить поисковый запрос или выберите другую категорию
                </p>
                <Button asChild>
                  <Link href="/contact">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Задать вопрос
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="border-0 shadow-md hover:shadow-lg transition-all">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleExpanded(faq.id)}
                        className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            {faq.popular && (
                              <Badge variant="secondary" className="mt-1 text-xs">
                                Популярный
                              </Badge>
                            )}
                            <h3 className="font-semibold text-left flex-1">
                              {faq.question}
                            </h3>
                          </div>
                          {expandedItems.includes(faq.id) ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          )}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {expandedItems.includes(faq.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6">
                              <div className="border-t pt-4">
                                <p className="text-muted-foreground leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="text-center space-y-6 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12 rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold">Не нашли ответ?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Наша команда поддержки готова помочь вам с любыми вопросами о создании карточек товаров
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="px-8">
              <Link href="/contact">
                <MessageCircle className="w-4 h-4 mr-2" />
                Связаться с поддержкой
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-purple-700" asChild>
              <Link href="/">
                <Package className="w-4 h-4 mr-2" />
                Создать карточку
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
