# Переменные окружения для Netlify

После создания сайта в Netlify, необходимо добавить следующие переменные окружения в настройках сайта:

## Путь: Site settings → Environment variables

### Обязательные переменные:

```bash
# База данных (замените на ваши данные)
DATABASE_URL="postgresql://username:password@host:port/database_name"

# NextAuth настройки  
NEXTAUTH_URL="https://www.upak.space"
NEXTAUTH_SECRET="your-production-secret-key-here"

# API бэкенда UPAK
NEXT_PUBLIC_API_URL="https://upak.tech:8001"

# Окружение
NODE_ENV="production"
```

### Как добавить переменные в Netlify:

1. Откройте ваш сайт в панели Netlify
2. Перейдите в **Site settings** (настройки сайта)  
3. Найдите раздел **Environment variables** (переменные окружения)
4. Нажмите **Add variable** для каждой переменной
5. Введите **Key** (имя) и **Value** (значение)
6. Сохраните изменения
7. Сделайте **Redeploy** сайта

### ⚠️ Важно:
- Замените значения переменных на реальные данные вашего проекта
- NEXTAUTH_SECRET должен быть уникальной строкой (можно сгенерировать на openssl.org)
- DATABASE_URL должен указывать на вашу реальную PostgreSQL базу данных