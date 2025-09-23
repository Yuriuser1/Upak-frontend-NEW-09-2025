
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageSquare,
  Users,
  Headphones
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Напишите нам на почту',
    value: 'support@upak.space',
    action: 'mailto:support@upak.space'
  },
  {
    icon: Phone,
    title: 'Телефон',
    description: 'Позвоните нам прямо сейчас',
    value: '+7 (999) 123-45-67',
    action: 'tel:+79991234567'
  },
  {
    icon: Clock,
    title: 'Время работы',
    description: 'Поддержка работает',
    value: 'Пн-Пт: 9:00-18:00 МСК',
    action: null
  },
  {
    icon: MessageSquare,
    title: 'Онлайн чат',
    description: 'Быстрый ответ в чате',
    value: 'Доступен 24/7',
    action: null
  }
];

const features = [
  {
    icon: Users,
    title: 'Персональный подход',
    description: 'Индивидуальная работа с каждым клиентом'
  },
  {
    icon: Headphones,
    title: 'Быстрая поддержка',
    description: 'Отвечаем в течение 2 часов в рабочее время'
  },
  {
    icon: MessageSquare,
    title: 'Экспертные консультации',
    description: 'Помощь в оптимизации товаров для маркетплейсов'
  }
];

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки сообщения');
      }

      toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Ошибка при отправке сообщения. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
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
          <h1 className="text-5xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Свяжитесь с нами
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Есть вопросы о создании карточек товаров? Нужна консультация? 
            Мы всегда готовы помочь вам увеличить продажи на маркетплейсах.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="border-0 shadow-xl">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Send className="w-6 h-6 text-blue-600" />
                  Отправить сообщение
                </CardTitle>
                <CardDescription>
                  Заполните форму ниже, и мы свяжемся с вами в ближайшее время
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя *</Label>
                      <Input
                        id="name"
                        placeholder="Ваше имя"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Тема</Label>
                    <Input
                      id="subject"
                      placeholder="Вопрос по тарифам, техническая поддержка..."
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение *</Label>
                    <Textarea
                      id="message"
                      placeholder="Расскажите подробнее о вашем вопросе или задаче..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      'Отправка...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Отправить сообщение
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Контактная информация</CardTitle>
                <CardDescription>
                  Выберите удобный способ связи
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                      <method.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{method.title}</h3>
                      <p className="text-xs text-muted-foreground mb-1">
                        {method.description}
                      </p>
                      {method.action ? (
                        <a
                          href={method.action}
                          className="text-sm font-medium text-blue-600 hover:text-blue-500 break-all"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium">{method.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Почему выбирают нас</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                      <feature.icon className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Quick Links */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Быстрые ответы</h2>
            <p className="text-muted-foreground">
              Часто задаваемые вопросы и полезная информация
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Как создать заказ?',
                description: 'Пошаговая инструкция по созданию карточки товара',
                link: '/faq#create-order'
              },
              {
                title: 'Сроки выполнения',
                description: 'Информация о времени создания карточек',
                link: '/faq#delivery-time'
              },
              {
                title: 'Способы оплаты',
                description: 'Доступные методы оплаты услуг',
                link: '/faq#payment-methods'
              }
            ].map((item, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
