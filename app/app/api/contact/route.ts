
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Валидация
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Обязательные поля: имя, email, сообщение' },
        { status: 400 }
      );
    }

    // Сохраняем обращение в базу данных
    const contactForm = await prisma.contactForm.create({
      data: {
        name,
        email,
        subject: subject || null,
        message,
        status: 'new',
      },
    });

    return NextResponse.json(
      {
        message: 'Сообщение успешно отправлено',
        id: contactForm.id,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Ошибка при отправке сообщения' },
      { status: 500 }
    );
  }
}
