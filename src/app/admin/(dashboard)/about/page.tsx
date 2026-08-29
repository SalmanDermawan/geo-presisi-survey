import prisma from '@/lib/prisma';
import { updateAboutAction } from './actions';

export const metadata = {
  title: 'Tentang Kami | Admin',
};

export default async function AboutSettingsPage() {
  const settings = await prisma.setting.findMany({
    where: {
      key: {
        startsWith: 'about',
      },
    },
    orderBy: {
      id: 'asc',
    },
  });

  const getValue = (key: string): string => {
    return settings.find((s) => s.key === key)?.value || '';
  };

  const aboutImage = getValue('aboutImage');

  return (
    <div>

      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
          color: 'var(--primary-dark)',
        }}
      >
        Tentang Kami
      </h1>

      <p
        style={{
          color: 'var(--text-light)',
          marginBottom: '2rem',
        }}
      >
        Kelola isi halaman Tentang Kami dari halaman ini.
      </p>


      <div
        style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border-color)',
          maxWidth: '900px',
        }}
      >

        <form
          action={updateAboutAction}
          encType="multipart/form-data"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >

          {/* =========================
              HERO
          ========================= */}

          <div>

            <h2 style={sectionTitle}>
              Hero Section
            </h2>

            <div style={field}>

              <label style={label}>
                Judul Hero
              </label>

              <input
                type="text"
                name="aboutHeroTitle"
                defaultValue={getValue('aboutHeroTitle')}
                style={input}
              />

            </div>


            <div style={field}>

              <label style={label}>
                Deskripsi Hero
              </label>

              <textarea
                name="aboutHeroSubtitle"
                defaultValue={getValue('aboutHeroSubtitle')}
                rows={4}
                style={input}
              />

            </div>

          </div>


          {/* =========================
              ABOUT
          ========================= */}

          <div>

            <h2 style={sectionTitle}>
              Tentang Perusahaan
            </h2>


            {/* =========================
                GAMBAR
            ========================= */}

            <div style={field}>

              <label style={label}>
                Gambar Tentang Perusahaan
              </label>

              <input
                type="file"
                name="aboutImage"
                accept="image/jpeg,image/png,image/webp"
                style={{
                  ...input,
                  padding: '0.6rem',
                }}
              />

              <small
                style={{
                  color: 'var(--text-light)',
                  fontSize: '0.85rem',
                }}
              >
                Format JPG, PNG, atau WEBP. Maksimal 5 MB.
              </small>

            </div>


            {/* =========================
                PREVIEW GAMBAR
            ========================= */}

            {aboutImage && (
              <div
                style={{
                  marginBottom: '1.5rem',
                }}
              >

                <label
                  style={{
                    ...label,
                    marginBottom: '0.75rem',
                  }}
                >
                  Gambar Saat Ini
                </label>

                <div
                  style={{
                    width: '100%',
                    maxWidth: '500px',
                    height: '280px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    background: '#f9fafb',
                  }}
                >

                  <img
                    src={aboutImage}
                    alt="Gambar Tentang Perusahaan"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />

                </div>

              </div>
            )}


            {/* =========================
                JUDUL
            ========================= */}

            <div style={field}>

              <label style={label}>
                Judul
              </label>

              <input
                type="text"
                name="aboutTitle"
                defaultValue={getValue('aboutTitle')}
                style={input}
              />

            </div>


            {/* =========================
                DESKRIPSI
            ========================= */}

            <div style={field}>

              <label style={label}>
                Deskripsi
              </label>

              <textarea
                name="aboutText"
                defaultValue={getValue('aboutText')}
                rows={7}
                style={input}
              />

            </div>


            {/* =========================
                DESKRIPSI TAMBAHAN
            ========================= */}

            <div style={field}>

              <label style={label}>
                Deskripsi Tambahan
              </label>

              <textarea
                name="aboutText2"
                defaultValue={getValue('aboutText2')}
                rows={5}
                style={input}
              />

            </div>

          </div>


          {/* =========================
              VISI MISI
          ========================= */}

          <div>

            <h2 style={sectionTitle}>
              Visi & Misi
            </h2>


            <div style={field}>

              <label style={label}>
                Visi
              </label>

              <textarea
                name="aboutVision"
                defaultValue={getValue('aboutVision')}
                rows={5}
                style={input}
              />

            </div>


            <div style={field}>

              <label style={label}>
                Misi
              </label>

              <textarea
                name="aboutMission"
                defaultValue={getValue('aboutMission')}
                rows={7}
                style={input}
                placeholder={`Satu misi per baris.

Contoh:
Memberikan pelayanan terbaik kepada pelanggan.
Mengutamakan kualitas dalam setiap pekerjaan.
Mengembangkan inovasi dan teknologi.
Menjaga profesionalitas dan integritas.
Membangun hubungan jangka panjang.`}
              />

              <small
                style={{
                  color: 'var(--text-light)',
                  fontSize: '0.85rem',
                }}
              >
                Tulis satu misi dalam satu baris.
                Huruf PRESISI akan otomatis digunakan
                sebagai penanda setiap misi.
              </small>

            </div>

          </div>


          {/* =========================
              NILAI PERUSAHAAN
          ========================= */}

          <div>

            <h2 style={sectionTitle}>
              Peralatan & Teknologi
            </h2>


            {/* Nilai 1 */}

            <div style={field}>

              <label style={label}>
                Nilai 1 - Judul
              </label>

              <input
                type="text"
                name="aboutValue1Title"
                defaultValue={getValue('aboutValue1Title')}
                style={input}
              />

              <label style={label}>
                Nilai 1 - Deskripsi
              </label>

              <textarea
                name="aboutValue1Text"
                defaultValue={getValue('aboutValue1Text')}
                rows={3}
                style={input}
              />

            </div>


            {/* Nilai 2 */}

            <div style={field}>

              <label style={label}>
                Nilai 2 - Judul
              </label>

              <input
                type="text"
                name="aboutValue2Title"
                defaultValue={getValue('aboutValue2Title')}
                style={input}
              />

              <label style={label}>
                Nilai 2 - Deskripsi
              </label>

              <textarea
                name="aboutValue2Text"
                defaultValue={getValue('aboutValue2Text')}
                rows={3}
                style={input}
              />

            </div>


            {/* Nilai 3 */}

            <div style={field}>

              <label style={label}>
                Nilai 3 - Judul
              </label>

              <input
                type="text"
                name="aboutValue3Title"
                defaultValue={getValue('aboutValue3Title')}
                style={input}
              />

              <label style={label}>
                Nilai 3 - Deskripsi
              </label>

              <textarea
                name="aboutValue3Text"
                defaultValue={getValue('aboutValue3Text')}
                rows={3}
                style={input}
              />

            </div>

          </div>


          {/* =========================
              SAVE
          ========================= */}

          <button
            type="submit"
            className="btn"
            style={{
              alignSelf: 'flex-start',
              marginTop: '0.5rem',
            }}
          >
            Simpan Perubahan
          </button>

        </form>

      </div>

    </div>
  );
}


/* =========================
   STYLES
========================= */

const sectionTitle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 700,
  color: 'var(--primary-dark)',
  borderBottom: '1px solid var(--border-color)',
  paddingBottom: '0.75rem',
  marginBottom: '1.5rem',
};


const field: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  marginBottom: '1.25rem',
};


const label: React.CSSProperties = {
  display: 'block',
  fontWeight: 600,
  color: 'var(--primary-dark)',
};


const input: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '6px',
  border: '1px solid var(--border-color)',
  outline: 'none',
  fontFamily: 'inherit',
  backgroundColor: '#f9fafb',
};