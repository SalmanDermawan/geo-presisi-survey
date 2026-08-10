import Link from 'next/link';
import styles from './Navbar.module.css';

interface NavbarProps {
  logoUrl?: string;
  companyName?: string;
}

export default function Navbar({ logoUrl, companyName = 'Company' }: NavbarProps) {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logoArea}>
          {logoUrl && logoUrl !== '' ? (
            <img src={logoUrl} alt={companyName} className={styles.logoImg} />
          ) : (
            <span className={styles.logoText}>{companyName}</span>
          )}
        </Link>

        <div className={styles.navLinks}>
          <Link href="/" className={styles.link}>Beranda</Link>
          <Link href="/about" className={styles.link}>Tentang Kami</Link>
          <Link href="/services" className={styles.link}>Layanan</Link>
          <Link href="/portfolio" className={styles.link}>Proyek</Link>
          <Link href="/contact" className={styles.btnNav}>Hubungi Kami</Link>
        </div>
      </div>
    </nav>
  );
}
