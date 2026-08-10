'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addServiceAction(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  
  if (title && description) {
    await prisma.service.create({
      data: { title, description }
    });
    revalidatePath('/services');
    revalidatePath('/');
  }
}

export async function deleteServiceAction(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  
  if (id) {
    await prisma.service.delete({ where: { id } });
    revalidatePath('/services');
    revalidatePath('/');
  }
}
