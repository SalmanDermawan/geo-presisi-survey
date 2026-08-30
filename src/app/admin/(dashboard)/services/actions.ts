'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addServiceAction(formData: FormData) {
  const title = formData.get('title');
  const description = formData.get('description');

  if (!title || !description) {
    return;
  }

  await prisma.service.create({
    data: {
      title: title.toString().trim(),
      description: description.toString().trim(),
    },
  });

  revalidatePath('/admin/services');
  revalidatePath('/services');
}

export async function updateServiceAction(formData: FormData) {
  const id = formData.get('id');
  const title = formData.get('title');
  const description = formData.get('description');

  if (!id || !title || !description) {
    return;
  }

  await prisma.service.update({
    where: {
      id: Number(id),
    },
    data: {
      title: title.toString().trim(),
      description: description.toString().trim(),
    },
  });

  revalidatePath('/admin/services');
  revalidatePath('/services');
}

export async function deleteServiceAction(formData: FormData) {
  const id = formData.get('id');

  if (!id) {
    return;
  }

  await prisma.service.delete({
    where: {
      id: Number(id),
    },
  });

  revalidatePath('/admin/services');
  revalidatePath('/services');
}

