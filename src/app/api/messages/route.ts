import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import DOMPurify from 'isomorphic-dompurify';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Nama, Email, dan Pesan wajib diisi' }, { status: 400 });
    }

    // Mencegah XSS Injection dengan menyaring input sebelum disimpan
    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedMessage = DOMPurify.sanitize(message);

    const newMessage = await prisma.contactMessage.create({
      data: {
        name: sanitizedName,
        email: sanitizedEmail,
        message: sanitizedMessage,
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat menyimpan pesan' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil pesan' }, { status: 500 });
  }
}
