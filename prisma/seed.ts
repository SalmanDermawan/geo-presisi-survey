import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  })
  console.log({ admin })

  // Setup basic settings
  const settings = [
    // { key: 'companyName', value: 'MM Pusaka Karya', description: 'Nama Perusahaan' },
    { key: 'heroTitle', value: 'Kontraktor Bangunan Terpercaya', description: 'Judul Hero Section' },
    { key: 'heroSubtitle', value: 'Kami menyediakan jasa bangun dan renovasi rumah dengan kualitas terbaik dan harga terjangkau.', description: 'Subjudul Hero Section' },
    { key: 'logoUrl', value: '/Favicon.png', description: 'URL Logo Perusahaan' },
    { key: 'aboutText', value: 'Berdiri sejak tahun 2000, MM Pusaka Karya telah melayani ribuan pelanggan untuk mewujudkan rumah impian mereka. Kami berkomitmen pada kualitas dan ketepatan waktu.', description: 'Teks Tentang Kami' },
    { key: 'contactEmail', value: 'info@mmpusakakarya.co.id', description: 'Email Kontak' },
    { key: 'contactPhone', value: '+62 812 3456 7890', description: 'Nomor Telepon' },
    { key: 'contactAddress', value: 'Jl. Raya Bogor No. 123, Bogor, Jawa Barat', description: 'Alamat Perusahaan' },
  ]

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    })
  }

  // Dummy Services
  const services = [
    { title: 'Jasa Bangun Rumah', description: 'Membangun rumah dari nol dengan desain custom sesuai keinginan Anda.' },
    { title: 'Renovasi', description: 'Perbaikan dan renovasi sebagian atau seluruh bangunan Anda.' },
    { title: 'Desain Interior', description: 'Layanan desain dan pengerjaan interior yang elegan.' },
  ]

  for (const svc of services) {
    // just using create because we don't have unique constraint on title to upsert easily, 
    // or we can just clean DB before seed. Let's assume DB is clean on seed.
    await prisma.service.create({
      data: svc
    })
  }

  // Dummy Portfolio
  const portfolios = [
    { title: 'Rumah Mewah Pondok Indah', description: 'Pembangunan rumah mewah 2 lantai.', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
    { title: 'Renovasi Villa Puncak', description: 'Renovasi total villa dengan konsep modern minimalis.', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
  ]

  for (const port of portfolios) {
    await prisma.portfolio.create({
      data: port
    })
  }

  console.log('Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
