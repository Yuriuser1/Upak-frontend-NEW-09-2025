
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Необходимо войти в систему' },
        { status: 401 }
      );
    }

    const { firstName, lastName, email, phone } = await request.json();

    // Проверяем, не занят ли email другим пользователем
    if (email && email !== session.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser && existingUser.id !== (session.user as any).id) {
        return NextResponse.json(
          { message: 'Пользователь с таким email уже существует' },
          { status: 400 }
        );
      }
    }

    // Обновляем профиль пользователя
    const updatedUser = await prisma.user.update({
      where: { id: (session.user as any).id },
      data: {
        firstName: firstName || null,
        lastName: lastName || null,
        name: firstName && lastName ? `${firstName} ${lastName}` : null,
        email: email || session.user.email,
        phone: phone || null,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        name: true,
        phone: true,
        updatedAt: true,
      }
    });

    return NextResponse.json({
      message: 'Профиль успешно обновлен',
      user: updatedUser
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { message: 'Ошибка при обновлении профиля' },
      { status: 500 }
    );
  }
}
