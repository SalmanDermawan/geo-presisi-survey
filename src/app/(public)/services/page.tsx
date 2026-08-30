import prisma from '@/lib/prisma';
import styles from '../page.module.css';

export const metadata = {
  title: 'Layanan Kami',
};

export default async function Services() {
  const services = await prisma.service.findMany();

  return (
    <div
      className="container animate-fade-in"
      style={{
        padding: '4rem 1.5rem',
        minHeight: '60vh',
      }}
    >
      <h1 className="section-title">
        Layanan Kami
      </h1>

      {services.length === 0 ? (
        <p className="text-center text-light">
          Belum ada layanan yang ditambahkan.
        </p>
      ) : (
        <div className={styles.grid3}>

          {services.map((svc) => {

            // ==========================================
            // UBAH DESKRIPSI MENJADI LIST
            // ==========================================

            const descriptionItems = svc.description
              .split('•')
              .map((item) => item.trim())
              .filter(Boolean);

            return (
              <div
                key={svc.id}
                className="card"
              >

                {/* =========================
                    JUDUL LAYANAN
                ========================= */}

                <h3 className={styles.cardTitle}>
                  {svc.title}
                </h3>


                {/* =========================
                    DESKRIPSI / POINT
                ========================= */}

                {descriptionItems.length > 1 ? (

                  <div className={styles.serviceDescription}>

                    {descriptionItems.map((item, index) => (
                      <div
                        key={`${svc.id}-${index}`}
                        className={styles.serviceItem}
                      >

                        <span
                          className={styles.serviceBullet}
                          aria-hidden="true"
                        >
                          •
                        </span>

                        <p>
                          {item}
                        </p>

                      </div>
                    ))}

                  </div>

                ) : (

                  <p className="text-light">
                    {svc.description}
                  </p>

                )}

              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}