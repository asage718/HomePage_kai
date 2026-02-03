import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    const errors: Record<string, string> = {};
    if (!name?.trim()) errors.name = 'お名前を入力してください';
    if (!email?.trim()) {
      errors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = '正しいメールアドレスを入力してください';
    }
    if (!subject?.trim()) errors.subject = '依頼内容を入力してください';
    if (!message?.trim()) errors.message = 'メッセージを入力してください';

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const contact = await prisma.contact.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      },
    });

    return NextResponse.json({ id: contact.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: '送信に失敗しました' }, { status: 500 });
  }
}
