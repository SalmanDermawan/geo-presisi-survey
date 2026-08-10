'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.css';

interface NavbarProps {
  logoUrl?: string;
  companyName?: string;
}

export default function Navbar({
  logoUrl,
  companyName = 'Company',
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          {logoUrl ? (
            <img src={logoUrl} alt={companyName} />
          ) : (
            <span>{companyName}</span>
          )}
        </Link>

        {/* Hamburger */}
        <button
          className={`${styles.menuButton} ${
            isOpen ? styles.active : ''
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <div
          className={`${styles.navLinks} ${
            isOpen ? styles.navOpen : ''
          }`}
        >
          <Link
            href="/"
            className={styles.link}
            onClick={closeMenu}
          >
            Beranda
          </Link>

          <Link
            href="/about"
            className={styles.link}
            onClick={closeMenu}
          >
            Tentang Kami
          </Link>

          <Link
            href="/services"
            className={styles.link}
            onClick={closeMenu}
          >
            Layanan
          </Link>

          <Link
            href="/portfolio"
            className={styles.link}
            onClick={closeMenu}
          >
            Proyek
          </Link>

          <Link
            href="/contact"
            className={styles.btnNav}
            onClick={closeMenu}
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </nav>
  );
}