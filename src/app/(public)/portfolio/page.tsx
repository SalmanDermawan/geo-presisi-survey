import prisma from '@/lib/prisma';
import styles from '../page.module.css';

export const metadata = {
  title: 'Portofolio Proyek',
};

export default async function Portfolio() {
  const portfolios = await prisma.portfolio.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}>
      <h1 className="section-title">Portofolio Kami</h1>
      
      {portfolios.length === 0 ? (
        <p className="text-center text-light">Belum ada portofolio yang ditambahkan.</p>
      ) : (
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
      )}
    </div>
  );
}
