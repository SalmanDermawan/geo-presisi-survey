'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { put } from '@vercel/blob';

export async function updateSettingsAction(formData: FormData) {
  const keys = Array.from(formData.keys());

  for (const key of keys) {
    // Abaikan field internal Next.js
    if (key.startsWith('$ACTION')) continue;

    // =========================
    // UPLOAD LOGO
    // =========================
    if (key === 'logoUrl') {
      const file = formData.get('logoUrl');

      if (file instanceof File && file.size > 0) {
        // Validasi tipe file
        if (!file.type.startsWith('image/')) {
          throw new Error('File logo harus berupa gambar.');
        }

        // Batas ukuran 5 MB
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('Ukuran logo maksimal 5 MB.');
        }

        // Bersihkan nama file
        const safeFilename = file.name.replace(
          /[^a-zA-Z0-9.-]/g,
          ''
        );

        const filename = `logos/${Date.now()}-${safeFilename}`;

        // Upload ke Vercel Blob
        const blob = await put(filename, file, {
          access: 'public',
        });

        // Simpan URL Blob ke database
        await prisma.setting.update({
          where: {
            key: 'logoUrl',
          },
          data: {
            value: blob.url,
          },
        });
      }

      continue;
    }

    // =========================
    // SETTING BIASA
    // =========================

    const value = formData.get(key);

    // Hanya proses value string
    if (typeof value !== 'string') continue;

    await prisma.setting.update({
      where: {
        key,
      },
      data: {
        value,
      },
    });
  }

  // Refresh halaman yang menggunakan settings
  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/contact');
  revalidatePath('/admin/settings');
}