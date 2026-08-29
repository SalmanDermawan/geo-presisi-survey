'use server';

import prisma from '@/lib/prisma';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

const aboutKeys = [
  'aboutHeroTitle',
  'aboutHeroSubtitle',
  'aboutTitle',
  'aboutText',
  'aboutText2',
  'aboutVision',
  'aboutMission',
  'aboutValue1Title',
  'aboutValue1Text',
  'aboutValue2Title',
  'aboutValue2Text',
  'aboutValue3Title',
  'aboutValue3Text',
];

export async function updateAboutAction(formData: FormData) {

  // =========================
  // SIMPAN DATA TEXT
  // =========================

  for (const key of aboutKeys) {

    const value = formData.get(key);

    if (typeof value !== 'string') {
      continue;
    }

    await prisma.setting.upsert({
      where: {
        key,
      },

      update: {
        value,
      },

      create: {
        key,
        value,
        description: key,
      },
    });
  }


  // =========================
  // UPLOAD GAMBAR
  // =========================

  const image = formData.get('aboutImage');


  if (
    image &&
    image instanceof File &&
    image.size > 0
  ) {

    // Validasi tipe file

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (!allowedTypes.includes(image.type)) {
      throw new Error(
        'Format gambar tidak didukung. Gunakan JPG, PNG, atau WEBP.'
      );
    }


    // Batas ukuran 5 MB

    const maxSize = 5 * 1024 * 1024;

    if (image.size > maxSize) {
      throw new Error(
        'Ukuran gambar terlalu besar. Maksimal 5 MB.'
      );
    }


    // =========================
    // UPLOAD KE VERCEL BLOB
    // =========================

    const extension =
      image.name.split('.').pop() || 'jpg';

    const fileName =
      `about-company-${Date.now()}.${extension}`;


    const blob = await put(
      `about/${fileName}`,
      image,
      {
        access: 'public',
      }
    );


    // =========================
    // SIMPAN URL KE DATABASE
    // =========================

    await prisma.setting.upsert({

      where: {
        key: 'aboutImage',
      },

      update: {
        value: blob.url,
      },

      create: {
        key: 'aboutImage',
        value: blob.url,
        description: 'Gambar Tentang Perusahaan',
      },

    });

  }


  // =========================
  // REFRESH HALAMAN
  // =========================

  revalidatePath('/about');

  revalidatePath('/admin/about');
}