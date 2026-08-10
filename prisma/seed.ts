import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // =========================
  // ADMIN
  // =========================
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.admin.upsert({
    where: {
      username: 'admin',
    },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  })

  console.log('Admin:', admin.username)

  // =========================
  // SETTINGS
  // =========================
  const settings = [
    {
      key: 'heroTitle',
      value: 'Kontraktor Bangunan Terpercaya',
      description: 'Judul Hero Section',
    },
    {
      key: 'heroSubtitle',
      value:
        'Kami menyediakan jasa bangun dan renovasi rumah dengan kualitas terbaik dan harga terjangkau.',
      description: 'Subjudul Hero Section',
    },
    {
      key: 'logoUrl',
      value: '/Favicon.png',
      description: 'URL Logo Perusahaan',
    },
    {
      key: 'aboutText',
      value:
        'Berdiri sejak tahun 2000, Geo Presisi telah melayani ribuan pelanggan untuk mewujudkan rumah impian mereka. Kami berkomitmen pada kualitas dan ketepatan waktu.',
      description: 'Teks Tentang Kami',
    },
    {
      key: 'contactEmail',
      value: 'info@geo-presisi.co.id',
      description: 'Email Kontak',
    },
    {
      key: 'contactPhone',
      value: '+62 812 3456 7890',
      description: 'Nomor Telepon',
    },
    {
      key: 'contactAddress',
      value: 'Jl. Raya Bogor No. 123, Bogor, Jawa Barat',
      description: 'Alamat Perusahaan',
    },
  ]

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: {
        key: setting.key,
      },
      update: {
        value: setting.value,
        description: setting.description,
      },
      create: setting,
    })
  }

  console.log('Settings seeded')

  // =========================
  // SERVICES
  // =========================
  const services = [
    {
      title: 'Jasa Bangun Rumah',
      description:
        'Membangun rumah dari nol dengan desain custom sesuai keinginan Anda.',
    },
    {
      title: 'Renovasi',
      description:
        'Perbaikan dan renovasi sebagian atau seluruh bangunan Anda.',
    },
    {
      title: 'Desain Interior',
      description:
        'Layanan desain dan pengerjaan interior yang elegan.',
    },
  ]

  for (const service of services) {
    const existing = await prisma.service.findFirst({
      where: {
        title: service.title,
      },
    })

    if (!existing) {
      await prisma.service.create({
        data: service,
      })
    }
  }

  console.log('Services seeded')

  // =========================
  // PORTFOLIO
  // =========================
  const portfolios = [
    {
      title: 'Rumah Mewah Pondok Indah',
      description: 'Pembangunan rumah mewah 2 lantai.',
      imageUrl:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    },
    {
      title: 'Renovasi Villa Puncak',
      description:
        'Renovasi total villa dengan konsep modern minimalis.',
      imageUrl:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    },
  ]

  for (const portfolio of portfolios) {
    const existing = await prisma.portfolio.findFirst({
      where: {
        title: portfolio.title,
      },
    })

    if (!existing) {
      await prisma.portfolio.create({
        data: portfolio,
      })
    }
  }

  console.log('Portfolios seeded')
  console.log('Seed completed successfully!')
}

main()
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })