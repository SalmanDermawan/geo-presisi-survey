'use server';

import prisma from '@/lib/prisma';
import { put, del } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

export async function addPortfolioAction(formData: FormData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const image = formData.get('image');

  // Validasi title
  if (typeof title !== 'string' || !title.trim()) {
    throw new Error('Nama proyek wajib diisi.');
  }

  // Validasi description
  if (typeof description !== 'string' || !description.trim()) {
    throw new Error('Deskripsi wajib diisi.');
  }

  // Validasi file
  if (!(image instanceof File) || image.size === 0) {
    throw new Error('Gambar portofolio wajib diupload.');
  }

  // Pastikan file adalah gambar
  if (!image.type.startsWith('image/')) {
    throw new Error('File yang diupload harus berupa gambar.');
  }

  // Maksimal 5 MB
  if (image.size > 5 * 1024 * 1024) {
    throw new Error('Ukuran gambar maksimal 5 MB.');
  }

  // Bersihkan nama file
  const safeFilename = image.name.replace(
    /[^a-zA-Z0-9.-]/g,
    ''
  );

  // Nama file di Vercel Blob
  const filename = `portfolio/${Date.now()}-${safeFilename}`;

  // Upload gambar ke Vercel Blob
  const blob = await put(filename, image, {
    access: 'public',
  });

  // Simpan data ke PostgreSQL
  await prisma.portfolio.create({
    data: {
      title: title.trim(),
      description: description.trim(),
      imageUrl: blob.url,
    },
  });

  // Refresh halaman
  revalidatePath('/portfolio');
  revalidatePath('/');
  revalidatePath('/admin/portfolio');
}


export async function deletePortfolioAction(formData: FormData) {
  const idValue = formData.get('id');

  if (typeof idValue !== 'string') {
    throw new Error('ID portofolio tidak valid.');
  }

  const id = parseInt(idValue, 10);

  if (isNaN(id)) {
    throw new Error('ID portofolio tidak valid.');
  }

  // Cari portfolio terlebih dahulu
  const portfolio = await prisma.portfolio.findUnique({
    where: { id },
  });

  if (!portfolio) {
    throw new Error('Portofolio tidak ditemukan.');
  }

  // Hapus gambar dari Vercel Blob
  if (portfolio.imageUrl) {
    try {
      await del(portfolio.imageUrl);
    } catch (error) {
      console.error('Gagal menghapus gambar dari Vercel Blob:', error);
    }
  }

  // Hapus data dari database
  await prisma.portfolio.delete({
    where: { id },
  });

  // Refresh halaman
  revalidatePath('/portfolio');
  revalidatePath('/');
  revalidatePath('/admin/portfolio');
}