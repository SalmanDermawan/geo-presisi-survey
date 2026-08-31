import Link from 'next/link';
import { getSettings } from '@/lib/settings';
import prisma from '@/lib/prisma';
import styles from './page.module.css';

export default async function Home() {
  const settings = await getSettings();
  
  // Fetch latest 3 services and 2 portfolios for homepage
  const services = await prisma.service.findMany({ take: 3 });
  const portfolios = await prisma.portfolio.findMany({ take: 2 });

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={`${styles.heroContent} animate-fade-in`}>
            <h1 className={styles.title}>{settings.heroTitle || 'Selamat Datang'}</h1>
            <p className={styles.subtitle}>
              {settings.heroSubtitle || 'Kami menyediakan layanan terbaik untuk Anda.'}
            </p>
            <div className={styles.heroActions}>
              <Link href="/contact" className="btn">Mulai Proyek Anda</Link>
              <Link href="/portfolio" className="btn btn-outline">Lihat Portofolio</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-accent">
        <div className="container">
          <h2 className="section-title">Layanan Kami</h2>
          <div className={styles.grid3}>
            {services.map((svc) => (
              <div key={svc.id} className="card">
                <h3 className={styles.cardTitle}>{svc.title}</h3>
                <p className="text-light">{svc.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/services" className="btn btn-outline">Lihat Semua Layanan</Link>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Riwayat Proyek</h2>
          <div className={styles.grid2}>
            {portfolios.map((port) => (
              <div key={port.id} className={styles.portfolioCard}>
                <div className={styles.imageWrapper}>
                  <img src={port.imageUrl} alt={port.title} className={styles.portImage} />
                </div>
                <div className={styles.portContent}>
                  <h3 className={styles.portTitle}>{port.title}</h3>
                  <p className="text-light">{port.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4" style={{ marginTop: '3rem' }}>
            <Link href="/portfolio" className="btn btn-outline">Lihat Semua Proyek</Link>
          </div>
        </div>
      </section>

      {/* Location / Maps Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Lokasi Kami</h2>

          <div
            style={{
              width: '100%',
              height: '450px',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow)',
              border: '1px solid var(--border-color)',
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.846358620496!2d106.9108009!3d-6.908383099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e683700263f5983%3A0x899e5f3cf999289d!2sCV%20Geo%20Presisi%20Survey!5e1!3m2!1sid!2sid!4v1786390380397!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Kami"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container text-center">
          <h2 className={styles.ctaTitle}>Siap Mengembangkan Proyek Anda dengan Data yang Presisi?</h2>
          <p className={styles.ctaDesc}>Percayakan kebutuhan survey, pemetaan, dan pengembangan lahan Anda kepada tim profesional kami.</p>
          <Link href="/contact" className={styles.ctaBtn}>Hubungi Kami Sekarang</Link>
        </div>
      </section>
    </div>
  );
}
