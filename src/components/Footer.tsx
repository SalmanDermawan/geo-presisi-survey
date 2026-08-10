import Link from 'next/link';
import styles from './Footer.module.css';

interface FooterProps {
  companyName?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
}

export default function Footer({ 
  companyName = 'Company',
  contactEmail,
  contactPhone,
  contactAddress
}: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.col}>
          <h3 className={styles.title}>{companyName}</h3>
          <p className={styles.desc}>
            Solusi terbaik untuk kebutuhan bangun dan renovasi rumah Anda.
          </p>
        </div>
        
        <div className={styles.col}>
          <h4 className={styles.subtitle}>Tautan Cepat</h4>
          <ul className={styles.links}>
            <li><Link href="/">Beranda</Link></li>
            <li><Link href="/about">Tentang Kami</Link></li>
            <li><Link href="/services">Layanan</Link></li>
            <li><Link href="/portfolio">Proyek</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.subtitle}>Kontak</h4>
          <ul className={styles.links}>
            {contactAddress && <li>📍 {contactAddress}</li>}
            {contactPhone && <li>📞 {contactPhone}</li>}
            {contactEmail && <li>✉️ {contactEmail}</li>}
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
