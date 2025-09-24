
'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Settings, 
  User, 
  Mail, 
  Phone,
  Save,
  LogOut,
  Shield,
  Bell
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface SettingsClientProps {
  user: any;
}

export function SettingsClient({ user }: SettingsClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: (user as any)?.firstName || '',
    lastName: (user as any)?.lastName || '',
    email: user?.email || '',
    phone: (user as any)?.phone || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/user/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Ошибка обновления профиля');
      }

      toast.success('Профиль успешно обновлен');
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Ошибка при обновлении профиля');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const handleChangePassword = () => {
    toast('Функция смены пароля будет доступна в будущих обновлениях', { 
      icon: 'ℹ️',
      duration: 3000 
    });
  };

  const handleConfigureNotifications = () => {
    toast('Настройки уведомлений будут доступны в будущих обновлениях', { 
      icon: 'ℹ️',
      duration: 3000 
    });
  };

  const handleChangePhoto = () => {
    toast('Загрузка фотографии будет доступна в будущих обновлениях', { 
      icon: 'ℹ️',
      duration: 3000 
    });
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
      {/* Header */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Settings className="w-8 h-8 text-blue-600" />
          Настройки профиля
        </h1>
        <p className="text-muted-foreground">
          Управляйте настройками своего аккаунта и персональной информацией
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <motion.div
          className="lg:col-span-2 space-y-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Личная информация
              </CardTitle>
              <CardDescription>
                Обновите свою личную информацию и контактные данные
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Имя</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        className="pl-10"
                        placeholder="Ваше имя"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Фамилия</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        className="pl-10"
                        placeholder="Ваша фамилия"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="pl-10"
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                  {isLoading ? (
                    'Сохранение...'
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Сохранить изменения
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Безопасность аккаунта
              </CardTitle>
              <CardDescription>
                Настройки безопасности и управление аккаунтом
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Смена пароля</h3>
                    <p className="text-sm text-muted-foreground">
                      Обновите пароль для повышения безопасности
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleChangePassword}>
                    Изменить пароль
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Уведомления по email</h3>
                    <p className="text-sm text-muted-foreground">
                      Получать уведомления о статусе заказов
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleConfigureNotifications}>
                    <Bell className="w-4 h-4 mr-2" />
                    Настроить
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium text-destructive">Опасная зона</h3>
                <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                  <div>
                    <h4 className="font-medium text-destructive">Выйти из аккаунта</h4>
                    <p className="text-sm text-muted-foreground">
                      Завершить текущую сессию на этом устройстве
                    </p>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Выйти
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6 text-center space-y-4">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src={user?.image || ''} alt={user?.name || ''} />
                <AvatarFallback className="text-2xl">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">
                  {user?.name || `${(user as any)?.firstName || ''} ${(user as any)?.lastName || ''}`.trim() || 'Пользователь'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {user?.email}
                </p>
                {(user as any)?.phone && (
                  <p className="text-sm text-muted-foreground">
                    {(user as any).phone}
                  </p>
                )}
              </div>

              <Button variant="outline" size="sm" className="w-full" onClick={handleChangePhoto}>
                Изменить фото
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6 space-y-4">
              <h3 className="font-semibold text-center">Статистика аккаунта</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Заказов создано:</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Заказов завершено:</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Дата регистрации:</span>
                  <span className="font-medium text-xs">
                    {new Date().toLocaleDateString('ru')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
