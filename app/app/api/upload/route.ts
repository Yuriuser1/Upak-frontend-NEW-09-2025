
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { uploadFile } from '@/lib/s3';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Необходимо войти в систему' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { message: 'Файл не найден' },
        { status: 400 }
      );
    }

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { message: 'Разрешены только изображения' },
        { status: 400 }
      );
    }

    // Проверяем размер файла (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { message: 'Размер файла не должен превышать 10 МБ' },
        { status: 400 }
      );
    }

    // Конвертируем в Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Загружаем в S3
    const cloud_storage_path = await uploadFile(buffer, file.name);

    return NextResponse.json({
      message: 'Файл успешно загружен',
      cloud_storage_path,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: 'Ошибка при загрузке файла' },
      { status: 500 }
    );
  }
}
