'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addPortfolioAction(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const imageUrl = formData.get('imageUrl') as string;
  
  if (title && description && imageUrl) {
    await prisma.portfolio.create({
      data: { title, description, imageUrl }
    });
    revalidatePath('/portfolio');
    revalidatePath('/');
  }
}

export async function deletePortfolioAction(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  
  if (id) {
    await prisma.portfolio.delete({ where: { id } });
    revalidatePath('/portfolio');
    revalidatePath('/');
  }
}
