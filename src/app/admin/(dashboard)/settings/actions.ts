'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

export async function updateSettingsAction(formData: FormData) {
  const keys = Array.from(formData.keys());
  
  for (const key of keys) {
    if (key.startsWith('$ACTION')) continue;
    
    if (key === 'logoUrl') {
      const file = formData.get('logoUrl') as File;
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        
        try {
          await fs.mkdir(uploadDir, { recursive: true });
        } catch (e) {
          // ignore error if directory exists
        }
        
        await fs.writeFile(path.join(uploadDir, filename), buffer);
        const value = `/uploads/${filename}`;
        
        await prisma.setting.update({
          where: { key },
          data: { value }
        });
      }
      continue;
    }
    
    const value = formData.get(key) as string;
    await prisma.setting.update({
      where: { key },
      data: { value }
    });
  }

  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/contact');
}
