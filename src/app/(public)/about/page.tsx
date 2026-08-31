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
      image: settings.aboutValue1Image || null,
    },
    {
      number: '02',
      title: settings.aboutValue2Title || 'Kualitas',
      text:
        settings.aboutValue2Text ||
        'Mengutamakan kualitas hasil pekerjaan untuk memberikan kepuasan kepada pelanggan.',
      image: settings.aboutValue2Image || null,
    },
    {
      number: '03',
      title: settings.aboutValue3Title || 'Kepercayaan',
      text:
        settings.aboutValue3Text ||
        'Membangun hubungan jangka panjang dengan pelanggan berdasarkan kepercayaan.',
      image: settings.aboutValue3Image || null,
    },
    {
    number: '04',
    title: settings.aboutValue4Title || 'Teknologi',
    text:
      settings.aboutValue4Text ||
      'Memanfaatkan teknologi survey dan pemetaan untuk menghasilkan data yang akurat dan presisi.',
    image: settings.aboutValue4Image || null,
    },
    {
    number: '05',
    title: settings.aboutValue5Title || 'Inovasi',
    text:
      settings.aboutValue5Text ||
      'Mengembangkan inovasi untuk memberikan solusi terbaik.',
    image: settings.aboutValue5Image || null,
    },
    {
    number: '06',
    title: settings.aboutValue6Title || 'Kepuasan Pelanggan',
    text:
      settings.aboutValue6Text ||
      'Mengutamakan kepuasan pelanggan dalam setiap pelayanan dan proyek.',
    image: settings.aboutValue6Image || null,
    },
  ];

  const legalityImage = settings.aboutLegalityImage || null;
  const legality2Image = settings.aboutLegality2Image || null;
  const legality3Image = settings.aboutLegality3Image || null;
  const legalityText = settings.aboutLegalityText || null;
  const orgStructureImage = settings.aboutOrgStructureImage || null;
  
  const hasLegalityImages = legalityImage || legality2Image || legality3Image;

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
                
                {value.image && (
                  <div style={{ width: '100%', height: '180px', marginBottom: '1.5rem', borderRadius: '8px', overflow: 'hidden' }}>
                    <img src={value.image} alt={value.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}

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

      {/* =========================
          LEGALITAS PERUSAHAAN
      ========================= */}

      {(legalityText || hasLegalityImages) && (
        <section style={{ padding: '5rem 0', backgroundColor: '#f9fafb' }}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>LEGALITAS</span>
              <h2>Legalitas Perusahaan</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', alignItems: 'center', maxWidth: '1000px', margin: '0 auto' }}>
              {legalityText && (
                <p style={{ textAlign: 'center', fontSize: '1.1rem', color: 'var(--text-color)', lineHeight: 1.8, maxWidth: '800px' }}>
                  {legalityText}
                </p>
              )}
              
              {hasLegalityImages && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', width: '100%' }}>
                  {[legalityImage, legality2Image, legality3Image].map((url, idx) => {
                    if (!url) return null;
                    const isPdf = url.endsWith('.pdf');
                    return (
                      <div key={idx} style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow)', backgroundColor: '#fff', padding: '1rem', border: '1px solid var(--border-color)' }}>
                        {isPdf ? (
                          <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', position: 'relative', height: '250px', cursor: 'pointer', overflow: 'hidden', borderRadius: '8px' }}>
                            <iframe src={`${url}#toolbar=0&navpanes=0&scrollbar=0`} style={{ width: '100%', height: '350px', pointerEvents: 'none', border: 'none' }} title={`Dokumen Legalitas ${idx + 1}`} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.75rem', backgroundColor: 'rgba(0,0,0,0.75)', color: 'white', textAlign: 'center', fontWeight: 600, fontSize: '0.9rem' }}>Lihat Dokumen PDF</div>
                          </a>
                        ) : (
                          <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                            <img src={url} alt={`Legalitas ${idx + 1}`} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* =========================
          STRUKTUR ORGANISASI
      ========================= */}

      {orgStructureImage && (
        <section style={{ padding: '5rem 0' }}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>ORGANISASI</span>
              <h2>Struktur Organisasi</h2>
            </div>
            
            <div style={{ maxWidth: '1000px', margin: '0 auto', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow)', backgroundColor: '#fff', border: '1px solid var(--border-color)' }}>
              <img src={orgStructureImage} alt="Struktur Organisasi" style={{ width: '100%', height: 'auto', display: 'block', padding: '1rem' }} />
            </div>
          </div>
        </section>
      )}

    </main>
  );
}