import { getSettings } from '@/lib/settings';
import styles from './page.module.css';

export const metadata = {
  title: 'Tentang Kami',
};

export default async function About() {
  const settings = await getSettings();

  return (
    <main>

      {/* =========================
          HERO
      ========================= */}

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>

            <span className={styles.heroLabel}>
              TENTANG KAMI
            </span>

            <h1>
              {settings.aboutHeroTitle ||
                `Tentang ${settings.companyName || 'Perusahaan'}`}
            </h1>

            <p>
              {settings.aboutHeroSubtitle ||
                'Mengenal lebih dekat perusahaan kami dan komitmen dalam memberikan solusi terbaik untuk kebutuhan Anda.'}
            </p>

          </div>
        </div>
      </section>


      {/* =========================
          TENTANG PERUSAHAAN
      ========================= */}

      <section className={styles.aboutSection}>
        <div className="container">

          <div className={styles.aboutGrid}>

            {/* Image / Placeholder */}

            <div className={styles.imageWrapper}>
              <div className={styles.imageBox}>

                <div className={styles.imageOverlay}></div>

                <span className={styles.imageText}>
                  {settings.companyName || 'Company'}
                </span>

              </div>
            </div>


            {/* Content */}

            <div className={styles.aboutContent}>

              <span className={styles.sectionLabel}>
                TENTANG PERUSAHAAN
              </span>

              <h2>
                {settings.aboutTitle ||
                  'Solusi Terbaik untuk Kebutuhan Anda'}
              </h2>

              <p>
                {settings.aboutText ||
                  'Belum ada informasi tentang kami.'}
              </p>

              {settings.aboutText2 && (
                <p>
                  {settings.aboutText2}
                </p>
              )}

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          VISI & MISI
      ========================= */}

      <section className={styles.visionSection}>
        <div className="container">

          <div className={styles.sectionHeader}>

            <span className={styles.sectionLabel}>
              VISI & MISI
            </span>

            <h2>
              Membangun Masa Depan Bersama
            </h2>

          </div>


          <div className={styles.visionGrid}>

            {/* Visi */}

            <div className={styles.visionCard}>

              <div className={styles.icon}>
                V
              </div>

              <h3>
                Visi
              </h3>

              <p>
                {settings.aboutVision ||
                  'Menjadi perusahaan terpercaya dan profesional yang memberikan solusi terbaik serta menciptakan hasil berkualitas bagi setiap pelanggan.'}
              </p>

            </div>


            {/* Misi */}

            <div className={styles.visionCard}>

              <div className={styles.icon}>
                M
              </div>

              <h3>
                Misi
              </h3>

              <p>
                {settings.aboutMission ||
                  'Memberikan pelayanan berkualitas, mengutamakan kepuasan pelanggan, serta terus meningkatkan inovasi dan profesionalitas dalam setiap proyek.'}
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          NILAI PERUSAHAAN
      ========================= */}

      <section className={styles.valuesSection}>
        <div className="container">

          <div className={styles.sectionHeader}>

            <span className={styles.sectionLabel}>
              NILAI KAMI
            </span>

            <h2>
              Prinsip yang Kami Pegang
            </h2>

          </div>


          <div className={styles.valuesGrid}>

            {/* Value 1 */}

            <div className={styles.valueCard}>

              <div className={styles.valueNumber}>
                01
              </div>

              <h3>
                {settings.aboutValue1Title ||
                  'Profesional'}
              </h3>

              <p>
                {settings.aboutValue1Text ||
                  'Bekerja dengan standar profesional dan bertanggung jawab dalam setiap pekerjaan.'}
              </p>

            </div>


            {/* Value 2 */}

            <div className={styles.valueCard}>

              <div className={styles.valueNumber}>
                02
              </div>

              <h3>
                {settings.aboutValue2Title ||
                  'Kualitas'}
              </h3>

              <p>
                {settings.aboutValue2Text ||
                  'Mengutamakan kualitas hasil pekerjaan untuk memberikan kepuasan kepada pelanggan.'}
              </p>

            </div>


            {/* Value 3 */}

            <div className={styles.valueCard}>

              <div className={styles.valueNumber}>
                03
              </div>

              <h3>
                {settings.aboutValue3Title ||
                  'Kepercayaan'}
              </h3>

              <p>
                {settings.aboutValue3Text ||
                  'Membangun hubungan jangka panjang dengan pelanggan berdasarkan kepercayaan.'}
              </p>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}