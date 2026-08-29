import { getSettings } from '@/lib/settings';
import styles from './page.module.css';

export const metadata = {
  title: 'Tentang Kami',
};

export default async function About() {
  const settings = await getSettings();

  // =========================
  // DATA DEFAULT
  // =========================

  const companyName = settings.companyName || 'Perusahaan';

  const heroTitle =
    settings.aboutHeroTitle || `Tentang ${companyName}`;

  const heroSubtitle =
    settings.aboutHeroSubtitle ||
    'Mengenal lebih dekat perusahaan kami dan komitmen dalam memberikan solusi terbaik untuk kebutuhan Anda.';

  const aboutTitle =
    settings.aboutTitle ||
    'Solusi Terbaik untuk Kebutuhan Anda';

  const aboutText =
    settings.aboutText ||
    'Belum ada informasi tentang kami.';

  const aboutVision =
    settings.aboutVision ||
    'Menjadi perusahaan terpercaya dan profesional yang memberikan solusi terbaik serta menciptakan hasil berkualitas bagi setiap pelanggan.';

  // =========================
  // GAMBAR PERUSAHAAN
  // =========================

  const aboutImage = settings.aboutImage || '';

  // =========================
  // DEFAULT MISI
  // =========================

  const defaultMissions = [
    'Memberikan pelayanan berkualitas kepada setiap pelanggan.',
    'Mengutamakan kepuasan pelanggan dalam setiap pelayanan dan proyek.',
    'Mengembangkan inovasi untuk memberikan solusi terbaik.',
    'Menjaga profesionalitas dan integritas dalam setiap pekerjaan.',
    'Membangun hubungan jangka panjang yang baik dengan pelanggan.',
  ];

  // Ambil misi dari database jika tersedia
  const missions = settings.aboutMission
    ? settings.aboutMission
        .split('\n')
        .map((mission) => mission.trim())
        .filter(Boolean)
    : defaultMissions;

  // =========================
  // DATA NILAI PERUSAHAAN
  // =========================

  const values = [
    {
      number: '01',
      title: settings.aboutValue1Title || 'Profesional',
      text:
        settings.aboutValue1Text ||
        'Bekerja dengan standar profesional dan bertanggung jawab dalam setiap pekerjaan.',
    },
    {
      number: '02',
      title: settings.aboutValue2Title || 'Kualitas',
      text:
        settings.aboutValue2Text ||
        'Mengutamakan kualitas hasil pekerjaan untuk memberikan kepuasan kepada pelanggan.',
    },
    {
      number: '03',
      title: settings.aboutValue3Title || 'Kepercayaan',
      text:
        settings.aboutValue3Text ||
        'Membangun hubungan jangka panjang dengan pelanggan berdasarkan kepercayaan.',
    },
  ];

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

            <h1>{heroTitle}</h1>

            <p>{heroSubtitle}</p>

          </div>
        </div>
      </section>


      {/* =========================
          TENTANG PERUSAHAAN
      ========================= */}

      <section className={styles.aboutSection}>
        <div className="container">

          <div className={styles.aboutGrid}>

            {/* =========================
                IMAGE
            ========================= */}

            <div className={styles.imageWrapper}>

              {aboutImage ? (
                <div className={styles.imageBox}>
                  <img
                    src={aboutImage}
                    alt={`Tentang ${companyName}`}
                    className={styles.aboutImage}
                  />
                </div>
              ) : (
                <div className={styles.imageBox}>

                  <div
                    className={styles.imageOverlay}
                    aria-hidden="true"
                  />

                  <span className={styles.imageText}>
                    {companyName}
                  </span>

                </div>
              )}

            </div>


            {/* =========================
                CONTENT
            ========================= */}

            <div className={styles.aboutContent}>

              <span className={styles.sectionLabel}>
                TENTANG PERUSAHAAN
              </span>

              <h2>{aboutTitle}</h2>

              <p>{aboutText}</p>

              {settings.aboutText2?.trim() && (
                <p>{settings.aboutText2}</p>
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

            {/* =====================
                VISI
            ===================== */}

            <div className={styles.visionCard}>

              <div
                className={styles.icon}
                aria-hidden="true"
              >
                V
              </div>

              <h3>Visi</h3>

              <p>{aboutVision}</p>

            </div>


            {/* =====================
                MISI
            ===================== */}

            <div className={styles.visionCard}>

              <div
                className={styles.icon}
                aria-hidden="true"
              >
                M
              </div>

              <h3>Misi</h3>

              <div className={styles.missionList}>

                {missions.map((mission, index) => (
                  <div
                    className={styles.missionItem}
                    key={`${index}-${mission}`}
                  >

                    <span className={styles.missionNumber}>
                      {'PRESISI'[index] || String(index + 1)}
                    </span>

                    <p>{mission}</p>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          PERALATAN & TEKNOLOGI
      ========================= */}

      <section className={styles.valuesSection}>
        <div className="container">

          <div className={styles.sectionHeader}>

            <span className={styles.sectionLabel}>
              PERALATAN & TEKNOLOGI
            </span>

            <h2>
              Peralatan & Teknologi yang Kami Gunakan
            </h2>

          </div>


          <div className={styles.valuesGrid}>

            {values.map((value) => (
              <div
                className={styles.valueCard}
                key={value.number}
              >

                <div className={styles.valueNumber}>
                  {value.number}
                </div>

                <h3>{value.title}</h3>

                <p>{value.text}</p>

              </div>
            ))}

          </div>

        </div>
      </section>

    </main>
  );
}