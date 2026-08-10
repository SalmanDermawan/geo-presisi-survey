'use server';

import prisma from '@/lib/prisma';
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

  revalidatePath('/about');
  revalidatePath('/admin/about');
}