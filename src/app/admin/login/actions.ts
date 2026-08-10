'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(state: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Username dan password wajib diisi.' };
  }

  const admin = await prisma.admin.findUnique({
    where: { username }
  });

  if (!admin) {
    return { error: 'Username atau password salah.' };
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  
  if (!isMatch) {
    return { error: 'Username atau password salah.' };
  }

  const token = await signToken({ id: admin.id, username: admin.username });
  
  const cookieStore = await cookies();
  cookieStore.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 // 1 day
  });

  redirect('/admin');
}
