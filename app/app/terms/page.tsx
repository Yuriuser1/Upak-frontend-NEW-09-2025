
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Shield, 
  Users, 
  CreditCard,
  Mail,
  AlertTriangle,
  Calendar,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const sections = [
  {
    id: 'general',
    title: 'Общие положения',
    icon: FileText,
    content: [
      'Настоящие условия использования (далее "Условия") регулируют взаимоотношения между UPAK и пользователями сервиса.',
      'Регистрируясь на сайте или используя наши услуги, вы соглашаетесь с данными условиями.',
      'Мы оставляем за собой право изменять данные условия в любое время с уведомлением пользователей.',
      'Продолжение использования сервиса после внесения изменений означает ваше согласие с новыми условиями.'
    ]
  },
  {
    id: 'services',
    title: 'Описание услуг',
    icon: Users,
    content: [
      'UPAK предоставляет услуги по созданию карточек товаров для маркетплейсов Wildberries и OZON.',
      'Мы создаем профессиональные описания, оптимизируем изображения и предоставляем готовые материалы.',
      'Услуги предоставляются на платной основе согласно выбранному тарифу.',
      'Сроки выполнения составляют от 24 до 48 часов в зависимости от тарифа.'
    ]
  },
  {
    id: 'payment',
    title: 'Условия оплаты',
    icon: CreditCard,
    content: [
      'Оплата производится через платежную систему YooKassa до начала выполнения работ.',
      'Цены указаны в российских рублях и включают НДС.',
      'Возврат средств возможен только в случае невозможности выполнения заказа по нашей вине.',
      'При отмене заказа по инициативе клиента после начала работ возврат не производится.'
    ]
  },
  {
    id: 'responsibility',
    title: 'Ответственность сторон',
    icon: Shield,
    content: [
      'UPAK гарантирует качественное выполнение заказов согласно выбранному тарифу.',
      'Мы не несем ответственности за результаты продаж на маркетплейсах.',
      'Клиент несет ответственность за предоставление достоверной информации о товаре.',
      'Клиент гарантирует наличие прав на использование предоставленных изображений и материалов.'
    ]
  },
  {
    id: 'privacy',
    title: 'Конфиденциальность',
    icon: AlertTriangle,
    content: [
      'Мы обязуемся не разглашать персональные данные и коммерческую информацию клиентов.',
      'Данные используются исключительно для выполнения заказов и улучшения качества услуг.',
      'Мы применяем современные методы защиты информации.',
      'При необходимости мы можем передавать данные третьим лицам только с вашего согласия.'
    ]
  },
  {
    id: 'contacts',
    title: 'Контактная информация',
    icon: Mail,
    content: [
      'По всем вопросам, связанным с данными условиями, обращайтесь к нам:',
      'Email: support@upak.space',
      'Телефон: +7 (999) 123-45-67',
      'Время работы: Пн-Пт, 9:00-18:00 МСК'
    ]
  }
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="container mx-auto max-w-4xl px-4 space-y-12">
        {/* Header */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                На главную
              </Link>
            </Button>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <FileText className="w-4 h-4 mr-2" />
              Правовые документы
            </Badge>
          </div>
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Условия использования
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Правила и условия использования сервиса UPAK для создания карточек товаров
            </p>
            
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              Действует с 1 января 2024 года
            </div>
          </div>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-l-4 border-l-orange-500 bg-orange-50/50 border-orange-200">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-orange-900 mb-2">Важное уведомление</h3>
                  <p className="text-sm text-orange-800 leading-relaxed">
                    Использование нашего сервиса означает полное согласие с данными условиями. 
                    Пожалуйста, внимательно ознакомьтесь с документом перед началом работы с UPAK.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Terms Content */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <section.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          className="text-center space-y-6 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12 rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold">Есть вопросы по условиям?</h2>
          <p className="text-lg opacity-90">
            Мы готовы предоставить дополнительные разъяснения
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="px-8">
              <Link href="/contact">
                <Mail className="w-4 h-4 mr-2" />
                Связаться с нами
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-purple-700" asChild>
              <Link href="/faq">
                Посмотреть FAQ
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center space-y-4">
          <Separator />
          <p className="text-sm text-muted-foreground">
            © 2024 UPAK. Все права защищены. 
            <br />
            Данный документ является юридически обязательным соглашением.
          </p>
        </div>
      </div>
    </div>
  );
}
